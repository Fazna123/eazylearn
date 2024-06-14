import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import CoursePlayer from "../utils/CoursePlayer";
import { useEffect, useState } from "react";
//import { toast } from "react-toastify";
import {
  addAnswer,
  addQuestion,
  addReview,
  getCourseInfo,
} from "../utils/endPoint";
import swal from "sweetalert";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "../utils/Ratings";
import socketIO from "socket.io-client";

const ENDPOINT = import.meta.env.VITE_PUBLIC_BASE_API;
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  fetchData: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  fetchData,
}: Props) => {
  console.log(data);
  console.log(id);
  const courseData = data;

  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [isQuestionLoading, setIsQuestionLoading] = useState(false);
  const [isReviewLoading, setIsReviewLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [course, setCourse] = useState({});

  useEffect(() => {
    const fetchCourse = async (id: string) => {
      const { success, error, data } = await getCourseInfo(id);
      if (success && data.course) {
        setCourse(data?.course);
      } else {
        console.log(error.message);
      }
    };
    fetchCourse(id);
  }, []);

  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id == user._id
  );
  console.log("is review exists", isReviewExists);

  const handleQuestion = async () => {
    if (question.length === 0) {
      swal("Question can't be empty");
    } else {
      setIsQuestionLoading(true);
      const { success, error, data } = await addQuestion(
        question,
        id,
        courseData[activeVideo]._id
      );
      if (success) {
        setIsQuestionLoading(false);

        // setQuestions((prev) => [...prev, question]);
        setQuestion("");
        fetchData(id);
        swal(data?.message, { icon: "success" });
      } else {
        setIsQuestionLoading(false);
        swal(error?.message, { icon: "error" });
      }
    }
  };

  const handleAnswerSubmit = async () => {
    const { success, data, error } = await addAnswer(
      answer,
      id,
      courseData[activeVideo]._id,
      questionId
    );
    if (success) {
      setAnswer("");
      fetchData(id);
      swal(data?.message, { icon: "success" });
    } else {
      setAnswer("");
      swal(error?.message, { icon: "error" });
    }
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      swal("Review can't be empty");
    } else {
      setIsReviewLoading(true);
      const { success, error, data } = await addReview(review, rating, id);
      if (success) {
        setIsReviewLoading(false);
        setReview("");
        fetchData(id);
        swal(data?.message, { icon: "success" });
        socketId.emit("notification", {
          title: "A new Review",
          message: `A new review has been added on course ${course?.name}`,
          userId: user._id,
        });
      } else {
        setIsReviewLoading(false);
        swal(error?.message, { icon: "error" });
      }
    }
  };
  console.log(questionId, "ggg");
  console.log(answer, "answer");
  return (
    <div className="w-[95%] sm:w-[86%] py-4 m-auto flex flex-col">
      <CoursePlayer videoUrl={data[activeVideo]?.videoUrl} />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`flex !w-[unset] text-white text-center rounded-full px-3 my-3 cursor-pointer bg-blue-600 border border-white font-[600] hover:bg-blue-500 !min-h-[40px] !py-3 ${
            activeVideo === 0 && "!cursor-no-drop opacity-[0.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className=" mr-2 mt-1" />
          Prev Lesson
        </div>

        <div
          className={`flex !w-[unset] text-white text-center rounded-full px-3 my-3 ml-0 cursor-pointer bg-blue-600 border border-white font-[600] hover:bg-blue-500 !min-h-[40px] !py-3 ${
            activeVideo === 0 && "!cursor-no-drop opacity-[0.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2 mt-1" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] text-blue-800">
        {data[activeVideo]?.videoSection}
      </h1>
      <br />
      <h3 className="pt-2 text-[20px] font-[600]">
        {data[activeVideo]?.title}
      </h3>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-600 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`sm:text-[20px] cursor-pointer ${
              activeBar === index && "text-red-500"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5">
              <h2 className="sm:text-[20px] sm:inline-block">
                {item.title && item.title + " :"}
              </h2>
              <a
                className="inline-block text-[#4395c4] sm:text-[20px] sm:pl-2"
                href={item.url}
              >
                {item?.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <img
              src={
                user.avatar
                  ? user.avatar
                  : "https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png"
              }
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="Write your question..."
              className="outline-none bg-transparent ml-3 border border-blue-200 shadow sm:w-full p-2 rounded w-[90%] sm:text-[18px]"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`!w-[110px] !h-[40px] text-[18px] mt-5 bg-blue-500 rounded-full border text-center py-2 text-white font-[600] hover:bg-white hover:text-blue-800 hover:border-blue-800 ${
                isQuestionLoading && "cursor-not-allowed"
              } `}
              onClick={isQuestionLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          {/* <div>Question Replies</div> */}
          <CommentReply
            data={data}
            activeVideo={activeVideo}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            user={user}
            questions={questions}
          />
        </>
      )}
      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isReviewExists && (
              <>
                <div className="w-full flex">
                  <img
                    src={
                      user.avatar
                        ? user.avatar
                        : "https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png"
                    }
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500]">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            size={25}
                            color="rgb(246,186,0)"
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      id=""
                      cols={40}
                      rows={5}
                      placeholder="Write your comment..."
                      className="outline-none bg-transparent ml-3 border border-blue-200 shadow sm:w-full p-2 rounded w-[90%] sm:text-[18px]"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`!w-[110px] !h-[40px] text-[18px] mt-5 bg-blue-500 rounded-full border text-center py-2 text-white font-[600] hover:bg-white hover:text-blue-800 hover:border-blue-800 ${
                      isReviewLoading && "cursor-no-drop"
                    } `}
                    onClick={isReviewLoading ? () => {} : handleReviewSubmit}
                  >
                    Submit
                  </div>
                </div>
              </>
            )}
            <br />
            <div className="w-full bg-[#ffffff3b]">
              <div className="w-full mb-5 h-full">
                {(course.reviews && [...course.reviews].reverse()).map(
                  (item: any, index: number) => (
                    <div className="w-full my-5">
                      <div className="w-full flex">
                        <div>
                          <img
                            src={
                              item.user.avatar
                                ? item.user.avatar
                                : "https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png"
                            }
                            width={50}
                            height={50}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        </div>
                        <div className="ml-2">
                          <h1 className="text-[18px]">{item.user.name}</h1>
                          <Ratings rating={item.rating} />
                          <p>{item.comment}</p>
                          <small className="text-black">
                            {format(item.createdAt)}
                          </small>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  setQuestionId,
  handleAnswerSubmit,
  user,
  questions,
}: any) => {
  return (
    <>
      <div>
        {data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  activeVideo,
  item,
  index,
  setQuestionId,
  answer,
  setAnswer,
  handleAnswerSubmit,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);

  return (
    <>
      <hr
        style={{
          height: "1px",
          backgroundColor: "#ccc",
          marginTop: "20px",
          marginBottom: "20px",
          border: "none",
        }}
      />
      <div className="my-4">
        <div className="flex mb-2">
          {/* <div className="w-[50px] h-[50px]">
            <div className="flex items-center justify-center cursor-pointer rounded-[50px] bg-slate-600 h-[50px] w-[50px]">
              <h1 className="uppercase text-[18px]">
                {item?.user.name.slice(0, 2)}
              </h1>
            </div>
          </div> */}
          <div>
            <img
              src={
                item.user.avatar
                  ? item.user.avatar
                  : "https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png"
              }
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </div>
          <div className="pl-3">
            <h5 className="text-[20px]">{item?.user.name}</h5>
            <p>{item?.question}</p>
            <small className="text-slate-600">{format(item?.createdAt)}</small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="sm:pl-16 text-slate-700 cursor-pointer mr-2"
            onClick={() => {
              setReplyActive(!replyActive), setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <BiMessage size={20} className="cursor-pointer" fill="#fffff88" />
          <span className="pl-1 mt-[-4px] cursor-pointer text-slate-700">
            {item.questionReplies.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item.questionReplies.map((item: any) => (
              <div className="w-full flex sm:ml-16 my-5 text-black">
                <img
                  src={
                    item.user.avatar
                      ? item.user.avatar
                      : "https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png"
                  }
                  width={50}
                  height={50}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{item?.user.name}</h5>

                    {item.user.role === "instructor" && (
                      <VscVerifiedFilled className="text-[#58c750] ml-2 text-[20px]" />
                    )}
                  </div>

                  <p>{item?.answer}</p>
                  <small className="text-slate-600">
                    {format(item?.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative text-black">
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className="block sm:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] p-[15px] w-[95%]"
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-1 text-blue-800"
                  onClick={handleAnswerSubmit}
                  disabled={answer === ""}
                >
                  Submit
                </button>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;

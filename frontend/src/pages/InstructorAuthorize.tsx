//import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { BASE_URL } from "../utils/api";
const qa = [
  {
    title: "Share Your Knowledge",
    desc: "Our Courses are video-based experience that give students the chance to learn actionable skills. Whether you have experience teaching, or its your first time, we'll help you package your knowledge into an online course that improves student lives.",
    question: "What kind of teaching have you done before?",
    options: [
      "In person, informally",
      "In person, professionally",
      "Online",
      "Other",
    ],
  },
  {
    title: "Create a Course",
    desc: " Over the years we have helped thousands of instructors learn how to record at home. No matter your experience level, you can become a video pro too. We'll equip you with the latest resources, tips, and support to help you succeed.",
    question: "How much of video “pro” are you?",
    options: [
      "I'm a beginner.",
      "i have some knowledge.",
      "I'm experienced.",
      "i have video ready to upload.",
    ],
  },
  {
    title: "Expand your reach. ",
    desc: "Once you publish your course, you can grow your student audience and make an impact with support of our marketplace promotions and also through you own marketing efforts. Together, we'll help the right students discover your course.",
    question: "Do you have an audience to share your course with?",
    options: [
      "Not at the moment.",
      "I have a small following",
      "I have a sizeable following",
      "I don't need in my potential.",
    ],
  },
];
function InstructorAuthorize() {
  const [step, setStep] = useState(0);
  const { currentUser } = useSelector((state: any) => state.user);
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Authorization, setAuthorization] = useState<{ [key: string]: string }>(
    {
      "0": "",
      "1": "",
      "2": "",
    }
  );
  const id = currentUser.user._id;
  const handleRequest = async () => {
    if (!Authorization["0"] || !Authorization["1"] || !Authorization["2"]) {
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/api/user/instructor/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "instructor", updates: Authorization }),
      });
      if (res.ok) {
        swal("Request is sent to Admin!", { icon: "success" });
        console.log("Request sent!");
        navigate("/instructor");
      } else {
        const err = await res.json();
        swal(err.data.message || "Request failed to sent", { icon: "error" });
      }
    } catch (error: any) {
      //   if (axios.isAxiosError(error)) {
      toast(error.data?.message);
      //   } else {
      //     toast("An unexpected error occurred");
      //   }
    }
  };

  return (
    <div className="flex flex-col justify-between bg-slate-200">
      <h3 className="flex border rounded-3xl p-3 border-blue-500 w-max m-5 bg-white text-slate-950 font-semibold text-sm">
        STEP {step + 1} / 3
      </h3>
      <div className="section flex justify-center items-center h-[85%] text-start">
        <div className="border p-7 rounded-xl w-full max-w-md md:max-w-lg lg:max-w-xl">
          <div className="">
            <p className="text-2xl font-bold">{qa[step].title}</p>
            <p className="mt-3 text-sm">{qa[step].desc}</p>
          </div>
          <div className="mt-4">
            <p className="font-semibold text-xl">{qa[step].question}</p>
            <div className="text-md my-3">
              {qa[step].options.map((option, index) => (
                <div
                  className="border gap-2 flex p-2 items-center my-1"
                  key={option}
                >
                  <input
                    type="radio"
                    name={`question_${step}`}
                    className="h-4 w-4"
                    value={option}
                    checked={Authorization[`${step}`] === option}
                    onChange={(e) =>
                      setAuthorization({
                        ...Authorization,
                        [`${step}`]: e.target.value,
                      })
                    }
                  />
                  <label htmlFor={`question_${step}_option_${index}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-custom-500 py-4 flex flex-col md:flex-row justify-between px-4 md:px-10">
        <button
          className="border rounded-md h-min py-1 px-3 font-semibold mb-2 md:mb-0 md:mr-2 duration-300 bg-blue-500 text-white hover:bg-white hover:text-slate-950"
          disabled={step === 0}
          onClick={() => setStep((prevStep) => prevStep - 1)}
        >
          Prev
        </button>
        {step === 2 ? (
          <button
            className="border rounded-md h-min py-1 font-semibold px-3 duration-300 bg-blue-500 text-white hover:bg-white hover:text-slate-950"
            type="button"
            onClick={() => {
              handleRequest();
            }}
          >
            Proceed
          </button>
        ) : (
          <button
            className="bg-blue-500 border text-white rounded-md h-min py-1 font-semibold px-3 duration-300 hover:bg-white hover:text-slate-950"
            disabled={step === 2}
            onClick={() => setStep((prevStep) => prevStep + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default InstructorAuthorize;

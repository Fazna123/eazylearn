import { FC, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);
  const [video, setVideo] = useState<File | null>(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };
  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      //item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill the fields");
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };
  const handleUploadVideo = async (index: number) => {
    if (video) {
      const videodata = new FormData();
      videodata.append("file", video);
      videodata.append("upload_preset", "video_preset");

      try {
        const cloudName = "dt3lfeqdp";
        const api = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;
        const response = await axios.post(api, videodata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: false,
        });
        if (response) {
          const { secure_url } = response.data;
          const data = [...courseContentData];
          data[index].videoUrl = secure_url;
          setCourseContentData(data);
          toast("Data Saved Successfuly");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast(error?.response?.data?.message);
        }
        console.error("Error uploading video:", error);
      }
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection} `,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill the fields to proceed");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <>
      <div className="w-[80%] m-auto mt-24 p-3">
        <form onSubmit={handleSubmit}>
          {courseContentData?.map((item: any, index: number) => {
            const showSectionInput =
              index === 0 ||
              item.videoSection !== courseContentData[index - 1].videoSection;
            return (
              <>
                <div
                  className={`w-full bg-blue-200 p-4 ${
                    showSectionInput ? "mt-10" : "mb-0"
                  }`}
                >
                  {showSectionInput && (
                    <>
                      <div className="flex w-full items-center">
                        <input
                          type="text"
                          className={`text-[20px] ${
                            item.videoSection === "Untitled Section"
                              ? "w-[170px]"
                              : "w-min"
                          } cursor-pointer text-blue-800 bg-transparent outline-none`}
                          value={item.videoSection}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].videoSection = e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 cursor-pointer text-blue-800"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                      </div>
                      <br />
                    </>
                  )}
                  <div className="flex w-full items-center justify-between my-0">
                    {isCollapsed[index] ? (
                      <>
                        {item.title ? (
                          <p className="text-blue-800">
                            {index + 1}.{item.title}
                          </p>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <div></div>
                    )}
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`w-6 h-6 mr-2 text-blue-800 ${
                          index > 0 ? "cursor-pointer" : "cursor-no-drop"
                        }`}
                        onClick={() => {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-blue-800"
                        style={{
                          transform: isCollapsed[index]
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                        onClick={() => handleCollapseToggle(index)}
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.47 13.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 0 0-1.06-1.06L12 11.69 5.03 4.72a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  {!isCollapsed[index] && (
                    <>
                      <div className="my-2">
                        <label className="block text-blue-800 text-sm font-bold mb-2 w-[50%]">
                          Video Title
                        </label>
                        <input
                          type="text"
                          placeholder="Project Plan..."
                          className="shadow appearance-none border border-blue-400 rounded w-full !h-min !py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          value={item.title}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].title = e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                      </div>
                      <div className="mb-2">
                        <label className="block text-blue-800 text-sm font-bold mb-2 w-[50%]">
                          Video Url
                        </label>
                        <input
                          id="videoUrl"
                          type="file"
                          accept="video/*"
                          className="shadow appearance-none border border-blue-400 rounded w-full !h-min !py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          onChange={(e) => {
                            e.target.files
                              ? setVideo(e.target.files?.[0])
                              : null;
                          }}
                        />
                        {/* <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                          onClick={() => handleUploadPreview(index)}
                        >
                          Upload
                        </button> */}
                      </div>
                      <div className="mb-2">
                        <label className="block text-blue-800 text-sm font-bold mb-2 w-[50%]">
                          Video Description
                        </label>
                        <textarea
                          rows={8}
                          cols={30}
                          placeholder="Video Link..."
                          className="shadow appearance-none border border-blue-400 rounded w-full !h-min !py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          value={item.description}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].description = e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                        <br />
                      </div>

                      {item?.links.map((link: any, linkIndex: number) => {
                        return (
                          <div className="mb-3 block" key={linkIndex}>
                            <div className="w-full flex items-center justify-between">
                              <label className="block text-blue-800 text-sm font-bold mb-2 w-[50%]">
                                Link {linkIndex + 1}
                              </label>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className={`${
                                  linkIndex === 0
                                    ? "cursor-no-drop"
                                    : "cursor-pointer"
                                } text-blue-800 text-[20px] w-6 h-6`}
                                onClick={() => {
                                  linkIndex === 0
                                    ? null
                                    : handleRemoveLink(index, linkIndex);
                                }}
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </div>
                            <input
                              type="text"
                              placeholder="Source Code...(Link Title)"
                              className="shadow appearance-none border border-blue-400 rounded w-full !h-min !py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              value={link.title}
                              onChange={(e) => {
                                const updatedData = [...courseContentData];
                                updatedData[index].links[linkIndex].title =
                                  e.target.value;
                                setCourseContentData(updatedData);
                              }}
                            />
                            <input
                              type="url"
                              placeholder="Source Code Url...(Link Url)"
                              className="shadow appearance-none border border-blue-400 rounded w-full !h-min !py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              value={link.url}
                              onChange={(e) => {
                                const updatedData = [...courseContentData];
                                updatedData[index].links[linkIndex].url =
                                  e.target.value;
                                setCourseContentData(updatedData);
                              }}
                            />
                          </div>
                        );
                      })}

                      <div className="inline-block mb-4">
                        <p
                          className="flex items-center text-sm text-blue-800 cursor-pointer"
                          onClick={() => {
                            handleAddLink(index);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 text-blue-800 mr-2"
                          >
                            <path
                              fillRule="evenodd"
                              d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Add Link
                        </p>
                      </div>
                    </>
                  )}
                  <br />
                  {index === courseContentData.length - 1 && (
                    <div>
                      <p
                        className="flex items-center text-sm text-blue-800 cursor-pointer"
                        onClick={() => {
                          handleUploadVideo(index);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
                        </svg>
                        Save the content
                      </p>
                    </div>
                  )}
                  <br />
                  {index === courseContentData.length - 1 && (
                    <div>
                      <p
                        className="flex items-center text-sm text-blue-800 cursor-pointer"
                        onClick={() => {
                          newContentHandler(item);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 text-blue-500 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Add New Content
                      </p>
                    </div>
                  )}
                </div>
              </>
            );
          })}
          <br />
          <div
            className="flex items-center text-[20px] text-blue-800 cursor-pointer"
            onClick={() => addNewSection()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-blue-500 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
            Add New Section
          </div>
        </form>
        <br />
        <div className="w-full flex items-center justify-between">
          <div
            className="w-fit px-10 py-2 h-[40px] bg-blue-800 text-center text-white rounded mt-8 cursor-pointer"
            onClick={() => prevButton()}
          >
            Back
          </div>
          <div
            className="w-fit py-2 px-10 h-[40px] bg-blue-800 text-center text-white rounded mt-8 cursor-pointer"
            onClick={() => handleOptions()}
          >
            Next
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default CourseContent;

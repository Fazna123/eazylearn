import { FC, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  courseInfo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  // const [coverImage, setCoverImage] = useState<File | null>(null);
  const [demo, setDemo] = useState<File | null>(null);
  // const [lesson, setLesson] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (demo) {
      const videoData = new FormData();
      videoData.append("file", demo);
      videoData.append("upload_preset", "video_preset");

      try {
        const cloudName = "dt3lfeqdp";
        const api = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;
        const response = await axios.post(api, videoData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response) {
          console.log("demo video uploaded");
          const { secure_url } = response.data;
          setCourseInfo({ ...courseInfo, demoUrl: secure_url });
          setActive(active + 1);
        } else {
          console.log("uploading failed");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast(error?.response?.data?.message);
        }
        console.error("Error uploading video:", error);
      }
    }
  };
  const handleFileChange = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = async (e: any) => {
        if (reader.readyState === 2) {
          const imageData = new FormData();
          imageData.append("file", file); // Append the file, not reader.result
          imageData.append("upload_preset", "image_preset");

          try {
            const cloudName = "dt3lfeqdp";
            const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
            const response = await axios.post(api, imageData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

            if (response) {
              console.log("Thumbnail uploaded");
              const { secure_url } = response.data;
              setCourseInfo({
                ...courseInfo,
                thumbnail: secure_url,
              }); // Update state inside this block
            } else {
              console.log("uploading failed");
            }
          } catch (error) {
            if (axios.isAxiosError(error)) {
              toast(error?.response?.data?.message);
            }
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleFileChange = (e: any) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       if (reader.readyState === 2) {
  //         setCourseInfo({ ...courseInfo, thumbnail: reader.result });
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  // const handleUploadPreview = async (e) => {
  //   //const file = e.target.files?.[0];
  //   if (demo) {
  //     const videoData = new FormData();
  //     videoData.append("file", demo);
  //     videoData.append("upload_preset", "video_preset");

  //     try {
  //       const cloudName = "dt3lfeqdp";
  //       const api = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;
  //       const response = await axios.post(api, videoData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });
  //       if (response) {
  //         console.log("demo video uploaded");
  //       } else {
  //         console.log("uploading failed");
  //       }
  //       const { secure_url } = response.data;
  //       setCourseInfo({ ...courseInfo, demoUrl: secure_url });
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         toast(error?.response?.data?.message);
  //       }
  //       console.error("Error uploading video:", error);
  //     }
  //   }
  // };

  return (
    <div className="w-full mt-24">
      <form onSubmit={handleSubmit} className="mx-auto max-w-[80%]">
        <div>
          <label
            className="block text-blue-800 text-sm font-bold mb-2"
            htmlFor="courseName"
          >
            Course Name
          </label>
          <input
            className="shadow appearance-none border border-blue-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            required
            value={courseInfo.name}
            type="name"
            placeholder="Enter course name"
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
          />
        </div>
        <br />
        <div className="mb-5">
          <label
            className="block text-blue-800 text-sm font-bold mb-2"
            htmlFor="courseDescription"
          >
            Course Description
          </label>
          <textarea
            className="shadow appearance-none border  border-blue-400 rounded w-full !h-min !py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            required
            cols={30}
            rows={8}
            value={courseInfo.description}
            placeholder="Enter course description"
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          />
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label
              className="block text-blue-800 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="shadow appearance-none border border-blue-400 rounded w-full !h-min !py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              required
              value={courseInfo.price}
              placeholder="50"
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
            />
          </div>
          <div className="w-[50%]">
            <label
              className="block text-blue-800 text-sm font-bold mb-2 w-[50%]"
              htmlFor="estimatedPrice"
            >
              Estimated Price(Optional)
            </label>
            <input
              className="shadow appearance-none border border-blue-400 rounded w-full !h-min !py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="estimatedPrice"
              type="number"
              required
              value={courseInfo.estimatedPrice}
              placeholder="100"
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
            />
          </div>
        </div>
        <br />
        <div>
          <label
            className="block text-blue-800 text-sm font-bold mb-2"
            htmlFor="tags"
          >
            Course Tags
          </label>
          <input
            className="shadow appearance-none border border-blue-400 rounded w-full !h-min !py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tags"
            type="text"
            required
            value={courseInfo.tags}
            placeholder="MERN, Tailwind, LMS"
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
          />
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label
              className="block text-blue-800 text-sm font-bold mb-2"
              htmlFor="level"
            >
              Course Level
            </label>
            <input
              className="shadow appearance-none border border-blue-400 rounded w-full !h-min !py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="level"
              type="text"
              required
              value={courseInfo.level}
              placeholder="Beginner/Intermediate/Expert"
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
            />
          </div>
          {/* <div className="w-[50%]">
            <label
              className="block text-blue-800 text-sm font-bold mb-2 w-[50%]"
              htmlFor="demoUrl"
            >
              Demo Url
            </label>
            <input
              className="shadow appearance-none border border-blue-400 rounded w-full !h-min !py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="demoUrl"
              type="text"
              value={courseInfo.demoUrl}
              placeholder="Enter demo url"
              readOnly
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={()=>handleUploadPreview()}
            >
              Upload
            </button>
          </div> */}
          <div className="w-[50%]">
            <label
              className="block text-blue-800 text-sm font-bold mb-2 w-[50%]"
              htmlFor="demoUrl"
            >
              Demo Url
            </label>
            <input
              className="shadow appearance-none border border-blue-400 rounded w-full !h-min !py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="demoUrl"
              type="file"
              accept="video/*"
              onChange={(e) => {
                e.target.files ? setDemo(e.target.files?.[0]) : null;
              }}
            />
            {/* <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={(e) => handleUploadPreview(e)}
            >
              Upload
            </button> */}
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] border-blue-400 border p-3 flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt=""
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-blue-800">
                Drag and Drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-fit px-10 h-[40px] bg-blue-800 text-center text-white rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />

        {/* <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          type="submit"
        >
          Submit
        </button> */}
      </form>
    </div>
  );
};

export default CourseInformation;

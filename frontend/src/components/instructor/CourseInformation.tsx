import { FC, useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
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
            htmlFor=""
          >
            Course Description
          </label>
          <textarea
            className="shadow appearance-none border  border-blue-400 rounded w-full !h-min !py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id=""
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
              type="text"
              value={courseInfo.demoUrl}
              placeholder="Enter demo url"
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
            />
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

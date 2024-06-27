import { FC } from "react";

type Props = {
  active: number;
  //setActive: (active: number) => void;
};

const CourseOptions: FC<Props> = ({ active }) => {
  const options = [
    "Course Information",
    "Course Data",
    "Course Content",
    "Course Preview",
  ];

  return (
    <div>
      {options.map((option: string, index: number) => (
        <div key={index} className="w-full flex py-5">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              active + 1 > index ? "bg-blue-500" : "bg-gray-500"
            } relative`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={active + 1 > index ? "#ffff" : "#ffff"}
              className="w-6 h-6 text-[25px]"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                clipRule="evenodd"
              />
            </svg>
            {index !== options.length - 1 && (
              <div
                className={`absolute h-[30px] w-1 ${
                  active + 1 > index ? "bg-blue-500" : "bg-gray-500"
                } bottom-[-90%]`}
              />
            )}
          </div>
          <h5
            className={`pl-2 ${
              active === index ? "text-blue-700" : "text-gray-600"
            } text-[20px]`}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;

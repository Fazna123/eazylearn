import { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Link } from "react-router-dom";
import Ratings from "../utils/Ratings";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link to={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}>
      <div className="w-full bg-blue-950 min-h-[35vh] backdrop-blur border rounded-lg p-3 shadow-sm">
        <img
          src={item.thumbnail}
          width={800}
          height={300}
          style={{ objectFit: "contain" }}
          className="rounded w-full"
          alt=""
        />
        <br />
        <h1 className="text-[16px] text-white">{item.name}</h1>
        <div className="w-full flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <h5 className="text-white">Ratings</h5>
            <Ratings rating={item.ratings} />
          </div>
          <h5 className={`text-slate-200 ${isProfile && "hidden sm:inline"}`}>
            {item.purchased} Students
          </h5>
        </div>
        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex">
            <h3 className="text-white">
              {item.price === 0 ? "Free" : item.price + "$"}
            </h3>
            <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-white">
              {item.estimatedPrice}
            </h5>
          </div>
          <div className="flex items-center pb-3">
            <AiOutlineUnorderedList size={20} fill="#fff" />
            <h5 className="pl-2 text-white">
              {item.courseData?.length} Lectures
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;

import React from "react";

type Props = {
  item: any;
};

const ReviewCard = (props: Props) => {
  return (
    <div className="w-full h-max pb-4 border border-[#00000028] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
      <div className="flex w-full">
        <img
          src={props.item.avatar}
          alt=""
          className="w-[50px] rounded-full object-cover"
          width={50}
          height={50}
        />
        <div className="sm:flex justify-between w-full hidden">
          <div className="pl-4">
            <h5 className="text-[20px] text-slate-800">{props.item.name}</h5>
            <h6 className="text-[16px] text-slate-800">
              {props.item.profession}
            </h6>
          </div>
          {/* <Ratings rating={props.item.ratings} /> */}
        </div>
      </div>
      <p className="pt-2 px-2 text-slate-800">{props.item.comment}</p>
    </div>
  );
};

export default ReviewCard;

import { useState } from "react";

export default function Adminheader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-end p-5 fixed top-5 right-0 w-[85%]">
        <div
          className="relative cursor-pointer m-2"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-2xl cursor-pointer"
          >
            <path
              fill-rule="evenodd"
              d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
              clip-rule="evenodd"
            />
          </svg>
          <span className="absolute -top-2 -right-1 bg-red-500 rounded-full w-[18px] h-[18px] text-[12px] flex items-center justify-center text-white ">
            3
          </span>
        </div>
        {open && (
          <div className="w-[350px] h-auto bg-blue-950 text-white shadow-xl absolute top-16 z-18 rounded">
            <h5 className="text-center text-[20px] p-3">Notifications</h5>
            <div className="border-gray-100 border-2 bg-blue-900">
              <div className="w-full flex items-center justify-between -2">
                <p className="text-white">New Questions</p>
                <p className="text-white cursor-pointer">Mark as read</p>
              </div>
              <p className="px-2 py-3 text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
                accusamus.
              </p>
              <p className="p-2 text-white text-[14px]">5 days ago</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

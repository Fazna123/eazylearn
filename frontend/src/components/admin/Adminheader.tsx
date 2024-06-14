import { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import {
  getAllNotifications,
  updateNotificationsStatus,
} from "../../utils/endPoint";
import { format } from "timeago.js";

const ENDPOINT = import.meta.env.VITE_PUBLIC_BASE_API;
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

export default function Adminheader() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any>([]);
  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/damk25w05/video/upload/v1693465789/notification_vcetjn.mp3"
    )
  );
  const playerNotificationSound = () => {
    audio.play();
  };

  const fetchNotificatons = async () => {
    const { success, error, data } = await getAllNotifications();
    if (success) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    } else {
      console.log(error.message);
    }
  };

  const updateNotifications = async (id: string) => {
    const { success, error, data } = await updateNotificationsStatus(id);
    if (success) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    } else {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchNotificatons();
  }, []);

  // useEffect(() => {
  //   updateNotifications();
  // }, [notifications]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      fetchNotificatons();
      playerNotificationSound();
    });
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotifications(id);
  };

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
            {notifications && notifications.length}
          </span>
        </div>
        {open && (
          <div className="w-[350px] h-auto bg-blue-950 text-white shadow-xl absolute top-16 z-99 rounded">
            <h5 className="text-center text-[20px] p-3">Notifications</h5>
            {notifications &&
              notifications.map((item: any, index: number) => (
                <div className="border-gray-100 border-2 bg-blue-900">
                  <div className="w-full flex items-center justify-between -2">
                    <p className="text-white">{item.title}</p>
                    <p
                      className="text-white cursor-pointer"
                      onClick={() => handleNotificationStatusChange(item._id)}
                    >
                      Mark as read
                    </p>
                  </div>
                  <p className="px-2 py-3 text-white">{item.message}</p>
                  <p className="p-2 text-white text-[14px]">
                    {format(item.createdAt)}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";

import {
  createNewMessage,
  getAllMessages,
  getInstructorConversations,
  getUserDetails,
  updateLastMessageAPI,
} from "../utils/endPoint";

interface Conversation {
  _id: string;
  groupTitle: string;
  members: string[];
}

interface Message {
  sender: string;
  text: string;
  createdAt: number;
}
import socketIO from "socket.io-client";
const ENDPOINT = import.meta.env.VITE_PUBLIC_BASE_API;

const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

function StudentMessages() {
  const { currentUser } = useSelector((state: any) => state.user);
  //console.log(currentUser);
  const userId = currentUser?.user._id;

  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState({
    sender: "",
    text: "",
    createdAt: 0,
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentChat, setCurrentChat] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  //-----------------------------------------------------------------------------------

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
    return () => {
      socketId.off("getMessage");
    };
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  //-------------------------------------------------------------------------------------------
  useEffect(() => {
    const fetchConversations = async () => {
      const { success, error, data } = await getInstructorConversations(userId);
      if (success) {
        setConversations(data.conversations);
      } else {
        swal(error.message);
      }
    };
    fetchConversations();
  }, [currentUser, messages]);

  //----------------------------------------------------------------------------------

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser?.user?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
    return () => {
      socketId.off("getUsers");
    };
  }, [currentUser]);

  const onlineCheck = (chat: any) => {
    const chatMembers = chat.members.find((member: any) => member !== userId);
    if (!chatMembers) return false;
    const online = onlineUsers.find(
      (user: any) => user?.userId === chatMembers
    );
    //setActiveStatus(online ? true : false);
    return online ? true : false;
  };
  //----------------------------------------------------------------------------------

  useEffect(() => {
    if (!currentChat) return;

    const getMessage = async () => {
      const { success, error, data } = await getAllMessages(currentChat._id);
      if (success) {
        setMessages(data.messages);
      } else {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  console.log("msgs:", messages);

  //----------------------------------------------------------------------------------

  const sendMessageHandler = async (e: any) => {
    e.preventDefault();

    if (!currentChat) return;
    const message = {
      sender: currentUser?.user._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const recieverId = currentChat?.members.find(
      (member) => member !== currentUser.user._id
    );

    socketId.emit("sendMessage", {
      senderId: currentUser.user._id,
      recieverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        const { success, error, data } = await createNewMessage(message);
        if (success) {
          setMessages([...messages, data.chatMessage]);
          updateLastMessage();
        } else {
          console.log(error.message);
        }
      }
    } catch (error: any) {
      swal(`${error.message}`);
    }
  };

  //---------------------------------------------------------------------------------------------
  const updateLastMessage = async () => {
    if (!currentChat) return;
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: currentUser.user._id,
    });

    const conversationId = currentChat._id;
    const lastMessage = newMessage;
    const lastMessageId = currentUser.user._id;
    console.log(lastMessageId, "lmid");
    const { success, data, error } = await updateLastMessageAPI(
      conversationId,
      lastMessage,
      lastMessageId
    );
    if (success) {
      setNewMessage("");
      setConversations((prevConversations: any) => {
        const updatedConversations = prevConversations.map((conv: any) => {
          if (conv._id === conversationId) {
            return { ...conv, lastMessage, updatedAt: new Date() }; // Ensure updatedAt is a Date object
          }
          return conv;
        });
        return updatedConversations.sort(
          (a: any, b: any) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
      console.log(data.conversation);
    } else {
      console.log(error.message);
    }
  };
  console.log("currentChat", currentChat);
  //------------------------------------------------------------------------------

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //-------------------------------------------------------------------------------------------

  return (
    <div className="bg-blue-50 py-5 px-10 h-full flex flex-row justify-center">
      <div className="w-[60%] bg-white h-[80vh] mx-auto rounded ">
        {!open && (
          <>
            <h1 className="text-center text-[30px] py-3">All Messages</h1>
            {conversations &&
              conversations.map((item, index) => (
                <MessageList
                  data={item}
                  key={index}
                  index={index}
                  setOpen={setOpen}
                  setCurrentChat={setCurrentChat}
                  me={currentUser.user._id}
                  setUserData={setUserData}
                  userData={userData}
                  online={onlineCheck(item)}
                  setActiveStatus={setActiveStatus}
                />
              ))}
          </>
        )}
        {open && (
          <StudentInboxMessage
            setOpen={setOpen}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessageHandler={sendMessageHandler}
            messages={messages}
            instructorId={currentUser.user._id}
            userData={userData}
            activeStatus={activeStatus}
            scrollRef={scrollRef}
          />
        )}
      </div>
    </div>
  );
}

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  userData,
  online,
  setActiveStatus,
}: {
  data: any;
  index: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentChat: React.Dispatch<React.SetStateAction<Conversation | null>>;
  me: string;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  userData: any;
  online: boolean;
  setActiveStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState<{ name: any; avatar: any }>({
    name: undefined,
    avatar: undefined,
  });
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/inbox?${id}`);
    setOpen(true);
  };

  console.log(userData);
  useEffect(() => {
    //setActiveStatus(online);
    const userId = data.members.find((user: any) => user !== me);

    console.log(userId, "ffffffff");
    const getUserInfo = async () => {
      const { success, error, data } = await getUserDetails(userId);
      if (success) {
        setUser(data.user);
      } else {
        console.log(error.message);
      }
    };
    getUserInfo();
  }, [me, data]);
  console.log("sudent msg lst", user);
  console.log(user.name);

  return (
    <div
      className={`w-[97%] flex p-2 px-3 mx-4 ${
        active === index ? "bg-slate-200" : "bg-transparent"
      } cursor-pointer`}
      onClick={() => {
        // setActive(index) ||
        // handleClick(data._id) ||
        // setCurrentChat(data) ||
        // setUserData(user) ||
        // setActiveStatus(online)
        setActive(index);
        handleClick(data._id);
        setCurrentChat(data);
        setUserData(user);
        setActiveStatus(online);
      }}
    >
      <div className="relative">
        <img
          src={user?.avatar}
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        {/* {online ? (
          <div className="w-[12px] h-[12px] bg-green-500 rounded-full absolute top-[2px] right-[2px]"></div>
        ) : (
          <div className="w-[12px] h-[12px] bg-transparent rounded-full absolute top-[2px] right-[2px]"></div>
        )} */}
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{user?.name}</h1>
        <p className="text-[16px] text-slate-500">
          {/* {data.lastMessageId !== userData._id ? "You:" : ""} */}
          {data.lastMessage}
        </p>
      </div>
    </div>
  );
};

const StudentInboxMessage = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  instructorId,
  userData,
  activeStatus,
  scrollRef,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessageHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  messages: Message[];
  instructorId: string;
  userData: any; // Adjust as per your actual userData type
  activeStatus: boolean;
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      <div className="w-full flex p-3 items-center justify-between bg-slate-400">
        <div className="flex">
          <img
            src={userData?.avatar}
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
            <h1>{activeStatus ? "Online" : ""}</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* {messages &&
          messages.map((item: any, index: number) => {
            <div className="px-3 h-[63vh] overflow-y-scroll">
              <div className="flex w-full my-2">
                <div className="w-max rounded p-2 bg-slate-200 text-slate-900 h-min">
                  <p>{item.text}</p>
                </div>
              </div>
            </div>;
          })} */}

      <div className="px-3 h-[63vh] overflow-y-scroll">
        {messages &&
          messages.map((item: any) => (
            <div
              key={item._id}
              className={`flex w-full my-2 ${
                item.sender === instructorId ? "justify-end" : "justify-start"
              }`}
              ref={scrollRef}
            >
              <div>
                <div
                  className={`w-max rounded p-2 text-white h-min ${
                    item.sender === instructorId
                      ? "bg-green-600"
                      : " bg-slate-600"
                  } `}
                >
                  <p>{item.text}</p>
                </div>
                <p className="text-[12px] text-slate-500">
                  {format(item.createdAt)}
                </p>
              </div>
            </div>
          ))}
      </div>

      <form
        aria-required={true}
        onSubmit={sendMessageHandler}
        className="p-3 relative w-full"
      >
        <input
          type="text"
          required
          placeholder="Enter your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border w-full p-3 border-slate-300"
        />
        <input type="submit" value="Send" className="hidden" id="send" />
        <label htmlFor="send">
          <AiOutlineSend
            size={20}
            className="cursor-pointer absolute top-6 right-5"
          />
        </label>
      </form>
    </div>
  );
};
export default StudentMessages;

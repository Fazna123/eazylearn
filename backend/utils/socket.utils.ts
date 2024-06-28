import { Server, Socket } from "socket.io";
//import { v4 as uuidv4 } from "uuid";

import ChatRepository from "../repositories/chat.repository";

class SocketUtils {
  private chatRepository: ChatRepository;
  constructor(chatRepository: ChatRepository) {
    this.chatRepository = chatRepository;
  }

  configureSocketIO = async (io: Server) => {
    let users: { userId: string; socketId: string }[] = [];

    const addUser = (userId: string, socketId: string) => {
      if (!users.some((user) => user.userId === userId)) {
        users.push({ userId, socketId });
      }
    };

    const removeUser = (socketId: string) => {
      users = users.filter((user) => user.socketId !== socketId);
    };

    const getUser = (recieverId: string) => {
      return users.find((user) => user.userId === recieverId);
    };

    //Defining message object with seen property
    const createMessage = ({
      senderId,
      recieverId,
      text,
    }: {
      senderId: string;
      recieverId: string;
      text: string;
    }) => ({
      senderId,
      recieverId,
      text,
      seen: false,
    });

    io.on("connection", (socket: Socket) => {
      console.log("a user connected");

      socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
      });

      //send and get message
      const messages: { [key: string]: any[] } = {}; //Object to track messages sent to each other

      socket.on("sendMessage", ({ senderId, recieverId, text }) => {
        const message = createMessage({ senderId, recieverId, text });
        const user = getUser(recieverId);

        //Store messages in messages object
        if (!messages[recieverId]) {
          messages[recieverId] = [message];
        } else {
          messages[recieverId].push(message);
        }

        if (user) {
          io.to(user.socketId).emit("getMessage", message);
        }
      });

      socket.on("messageSeen", ({ senderId, recieverId, messageId }) => {
        const user = getUser(senderId);

        //update the seen flag
        if (messages[senderId]) {
          const message = messages[senderId].find(
            (message) =>
              message.recieverId === recieverId && message.id === messageId
          );
          if (message) {
            message.seen = true;

            //send a message seen event to the sender
            if (user) {
              io.to(user.socketId).emit("messageSeen", {
                senderId,
                recieverId,
                messageId,
              });
            }
          }
        }
      });

      //update and get last message
      socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
        io.emit("getLastMessage", {
          lastMessage,
          lastMessageId,
        });
      });

      socket.on("notification", (data: any) => {
        //Broadcasting notification to all connected clients
        io.emit("newNotification", data);
      });

      //when disconnected
      socket.on("disconnect", () => {
        console.log("a user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
      });
    });
  };
}
export default SocketUtils;

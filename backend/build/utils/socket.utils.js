"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class SocketUtils {
    constructor(chatRepository) {
        this.configureSocketIO = (io) => __awaiter(this, void 0, void 0, function* () {
            let users = [];
            const addUser = (userId, socketId) => {
                if (!users.some((user) => user.userId === userId)) {
                    users.push({ userId, socketId });
                }
            };
            const removeUser = (socketId) => {
                users = users.filter((user) => user.socketId !== socketId);
            };
            const getUser = (recieverId) => {
                return users.find((user) => user.userId === recieverId);
            };
            //Defining message object with seen property
            const createMessage = ({ senderId, recieverId, text, }) => ({
                senderId,
                recieverId,
                text,
                seen: false,
            });
            io.on("connection", (socket) => {
                console.log("a user connected");
                socket.on("addUser", (userId) => {
                    addUser(userId, socket.id);
                    io.emit("getUsers", users);
                });
                //send and get message
                const messages = {}; //Object to track messages sent to each other
                socket.on("sendMessage", ({ senderId, recieverId, text }) => {
                    const message = createMessage({ senderId, recieverId, text });
                    const user = getUser(recieverId);
                    //Store messages in messages object
                    if (!messages[recieverId]) {
                        messages[recieverId] = [message];
                    }
                    else {
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
                        const message = messages[senderId].find((message) => message.recieverId === recieverId && message.id === messageId);
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
                socket.on("notification", (data) => {
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
        });
        this.chatRepository = chatRepository;
    }
}
exports.default = SocketUtils;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_model_1 = __importDefault(require("../models/conversation.model"));
const chat_model_1 = __importDefault(require("../models/chat.model"));
class ChatRepository {
    findConversation(groupTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isConversationExist = yield conversation_model_1.default.findOne({
                    groupTitle,
                });
                if (!isConversationExist) {
                    return {
                        success: false,
                        message: `Converstion Group already exists`,
                    };
                }
                return {
                    success: true,
                    message: "Conversation Group Not Exist",
                    conversation: isConversationExist,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch ${error}`,
                };
            }
        });
    }
    createConversation(userId, insructorId, groupTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(insructorId);
                const conversation = yield conversation_model_1.default.create({
                    members: [userId, insructorId],
                    groupTitle: groupTitle,
                });
                return {
                    success: true,
                    message: "Conversation Group created",
                    conversation,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to create group ${error}`,
                };
            }
        });
    }
    createMessage(conversationId, sender, text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = new chat_model_1.default({
                    conversationId: conversationId,
                    sender: sender,
                    text: text,
                });
                yield message.save();
                return {
                    success: true,
                    message: "Message created successfully",
                    chatMessage: message,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to create message: ${error.message}`,
                };
            }
        });
    }
    getInstructorConversations(instructorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversations = yield conversation_model_1.default
                    .find({
                    members: {
                        $in: [instructorId],
                    },
                })
                    .sort({ updatedAt: -1 });
                return {
                    success: true,
                    message: "Cnversations fetched",
                    conversations,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch conversatons: ${error.message}`,
                };
            }
        });
    }
    updateLastMessage(lastMessage, lastMessageId, conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversation = yield conversation_model_1.default.findByIdAndUpdate(conversationId, {
                    lastMessage,
                    lastMessageId,
                });
                return {
                    success: true,
                    message: "Cnversations fetched",
                    conversation,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch conversatons: ${error.message}`,
                };
            }
        });
    }
    getAllMessages(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield chat_model_1.default.find({ conversationId: conversationId });
                // .sort({ createdAt: -1 });
                return {
                    success: true,
                    message: "Cnversations fetched",
                    messages,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch conversatons: ${error.message}`,
                };
            }
        });
    }
}
exports.default = ChatRepository;

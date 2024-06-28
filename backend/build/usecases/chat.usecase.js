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
class ChatUsecase {
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }
    createNewConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { groupTitle, userId, instructorId } = req.body;
                console.log(req.body);
                const isExist = yield this.chatRepository.findConversation(groupTitle);
                if (isExist.success) {
                    return {
                        status: 200,
                        data: {
                            success: true,
                            message: "Conversation Group already exists",
                            conversation: isExist.conversation,
                        },
                    };
                }
                else {
                    const response = yield this.chatRepository.createConversation(userId, instructorId, groupTitle);
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            conversation: response.conversation,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    createMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { conversationId, sender, text } = req.body;
                console.log(req.body);
                const response = yield this.chatRepository.createMessage(conversationId, sender, text);
                return {
                    status: response.success ? 200 : 500,
                    data: {
                        success: response.success,
                        message: response.message,
                        chatMessage: response.chatMessage,
                    },
                };
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    getInstructorConversations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params.id);
                const response = yield this.chatRepository.getInstructorConversations(req.params.id);
                return {
                    status: response.success ? 200 : 500,
                    data: {
                        success: response.success,
                        message: response.message,
                        conversations: response.conversations,
                    },
                };
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    updateLastMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversationId = req.params.id;
                const { lastMessage, lastMessageId } = req.body;
                console.log(lastMessageId, "last msg id");
                const response = yield this.chatRepository.updateLastMessage(lastMessage, lastMessageId, conversationId);
                return {
                    status: response.success ? 200 : 500,
                    data: {
                        success: response.success,
                        message: response.message,
                        conversation: response.conversation,
                    },
                };
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    getAllMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversationId = req.params.id;
                const response = yield this.chatRepository.getAllMessages(conversationId);
                return {
                    status: response.success ? 200 : 500,
                    data: {
                        success: response.success,
                        message: response.message,
                        messages: response.messages,
                    },
                };
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
}
exports.default = ChatUsecase;

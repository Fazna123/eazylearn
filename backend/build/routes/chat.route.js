"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_usecase_1 = __importDefault(require("../usecases/chat.usecase"));
const chat_controller_1 = __importDefault(require("../controllers/chat.controller"));
const chat_repository_1 = __importDefault(require("../repositories/chat.repository"));
const auth_1 = require("../middlewares/auth");
const chatRoute = express_1.default.Router();
const chatRepository = new chat_repository_1.default();
const chatUsecase = new chat_usecase_1.default(chatRepository);
const chatController = new chat_controller_1.default(chatUsecase);
chatRoute.post("/create-new-conversation", auth_1.isAuthenticated, (req, res) => chatController.createNewConversation(req, res));
chatRoute.post("/create-new-message", auth_1.isAuthenticated, (req, res) => chatController.createMessage(req, res));
chatRoute.get("/get-all-instructor-conversations/:id", auth_1.isAuthenticated, (req, res) => {
    //console.log("chatRoute conversations");
    chatController.getInstructorConversations(req, res);
});
chatRoute.put("/update-last-message/:id", auth_1.isAuthenticated, (req, res) => {
    console.log("chatRoute conversations");
    chatController.updateLastMessage(req, res);
});
chatRoute.get("/get-all-messages/:id", auth_1.isAuthenticated, (req, res) => {
    console.log("get all messages route");
    chatController.getAllMessages(req, res);
});
exports.default = chatRoute;

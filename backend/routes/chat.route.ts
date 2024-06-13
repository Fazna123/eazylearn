import express, { Request, Response } from "express";
import ChatUsecase from "../usecases/chat.usecase";
import ChatController from "../controllers/chat.controller";
import ChatRepository from "../repositories/chat.repository";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";

const chatRoute = express.Router();

const chatRepository = new ChatRepository();
const chatUsecase = new ChatUsecase(chatRepository);
const chatController = new ChatController(chatUsecase);

chatRoute.post(
  "/create-new-conversation",
  isAuthenticated,
  (req: Request, res: Response) =>
    chatController.createNewConversation(req, res)
);

chatRoute.post(
  "/create-new-message",
  isAuthenticated,
  (req: Request, res: Response) => chatController.createMessage(req, res)
);

chatRoute.get(
  "/get-all-instructor-conversations/:id",
  isAuthenticated,
  (req: Request, res: Response) => {
    //console.log("chatRoute conversations");
    chatController.getInstructorConversations(req, res);
  }
);

chatRoute.put(
  "/update-last-message/:id",
  isAuthenticated,
  (req: Request, res: Response) => {
    console.log("chatRoute conversations");
    chatController.updateLastMessage(req, res);
  }
);

chatRoute.get(
  "/get-all-messages/:id",
  isAuthenticated,
  (req: Request, res: Response) => {
    console.log("get all messages route");
    chatController.getAllMessages(req, res);
  }
);

export default chatRoute;

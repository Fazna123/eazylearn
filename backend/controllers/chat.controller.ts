import { Request, Response } from "express";
import ChatUsecase from "../usecases/chat.usecase";

class UserController {
  private chatUsecase: ChatUsecase;
  constructor(chatUsecase: ChatUsecase) {
    this.chatUsecase = chatUsecase;
  }

  async createNewConversation(req: Request, res: Response) {
    try {
      const response = await this.chatUsecase.createNewConversation(req, res);
      if (response !== undefined)
        res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async createMessage(req: Request, res: Response) {
    try {
      const response = await this.chatUsecase.createMessage(req, res);
      if (response !== undefined)
        res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async getInstructorConversations(req: Request, res: Response) {
    try {
      //console.log("cntrllr");
      const response = await this.chatUsecase.getInstructorConversations(
        req,
        res
      );
      if (response !== undefined)
        res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async updateLastMessage(req: Request, res: Response) {
    try {
      console.log("cntrllr");
      const response = await this.chatUsecase.updateLastMessage(req, res);
      if (response !== undefined)
        res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async getAllMessages(req: Request, res: Response) {
    try {
      console.log("cntrllr");
      const response = await this.chatUsecase.getAllMessages(req, res);
      if (response !== undefined)
        res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
}
export default UserController;

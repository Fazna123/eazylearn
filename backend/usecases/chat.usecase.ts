import { Request, Response } from "express";
import ChatRepository from "../repositories/chat.repository";

class ChatUsecase {
  private chatRepository: ChatRepository;
  constructor(chatRepository: ChatRepository) {
    this.chatRepository = chatRepository;
  }

  async createNewConversation(req: Request, res: Response) {
    try {
      const { groupTitle, userId, instructorId } = req.body;
      console.log(req.body);
      const isExist = await this.chatRepository.findConversation(groupTitle);

      if (isExist.success) {
        return {
          status: 200,
          data: {
            success: true,
            message: "Conversation Group already exists",
            conversation: isExist.conversation,
          },
        };
      } else {
        const response = await this.chatRepository.createConversation(
          userId,
          instructorId,
          groupTitle
        );

        return {
          status: response.success ? 200 : 500,
          data: {
            success: response.success,
            message: response.message,
            conversation: response.conversation,
          },
        };
      }
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async createMessage(req: Request, res: Response) {
    try {
      const { conversationId, sender, text } = req.body;
      console.log(req.body);
      const response = await this.chatRepository.createMessage(
        conversationId,
        sender,
        text
      );

      return {
        status: response.success ? 200 : 500,
        data: {
          success: response.success,
          message: response.message,
          chatMessage: response.chatMessage,
        },
      };
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async getInstructorConversations(req: Request, res: Response) {
    try {
      console.log(req.params.id);
      const response = await this.chatRepository.getInstructorConversations(
        req.params.id
      );

      return {
        status: response.success ? 200 : 500,
        data: {
          success: response.success,
          message: response.message,
          conversations: response.conversations,
        },
      };
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }

  async updateLastMessage(req: Request, res: Response) {
    try {
      const conversationId = req.params.id;
      const { lastMessage, lastMessageId } = req.body;
      console.log(lastMessageId, "last msg id");
      const response = await this.chatRepository.updateLastMessage(
        lastMessage,
        lastMessageId,
        conversationId
      );

      return {
        status: response.success ? 200 : 500,
        data: {
          success: response.success,
          message: response.message,
          conversation: response.conversation,
        },
      };
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }

  async getAllMessages(req: Request, res: Response) {
    try {
      const conversationId = req.params.id;

      const response = await this.chatRepository.getAllMessages(conversationId);

      return {
        status: response.success ? 200 : 500,
        data: {
          success: response.success,
          message: response.message,
          messages: response.messages,
        },
      };
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
}

export default ChatUsecase;

import conversationModel from "../models/conversation.model";
import chatModel from "../models/chat.model";

class ChatRepository {
  async findConversation(groupTitle: string) {
    try {
      const isConversationExist = await conversationModel.findOne({
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
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }

  async createConversation(
    userId: string,
    insructorId: string,
    groupTitle: string
  ) {
    try {
      console.log(insructorId);
      const conversation = await conversationModel.create({
        members: [userId, insructorId],
        groupTitle: groupTitle,
      });

      return {
        success: true,
        message: "Conversation Group created",
        conversation,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to create group ${error}`,
      };
    }
  }

  async createMessage(conversationId: string, sender: string, text: string) {
    try {
      const message = new chatModel({
        conversationId: conversationId,
        sender: sender,
        text: text,
      });

      await message.save();

      return {
        success: true,
        message: "Message created successfully",
        chatMessage: message,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to create message: ${error.message}`,
      };
    }
  }

  async getInstructorConversations(instructorId: string) {
    try {
      const conversations = await conversationModel
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
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to fetch conversatons: ${error.message}`,
      };
    }
  }

  async updateLastMessage(
    lastMessage: string,
    lastMessageId: string,
    conversationId: string
  ) {
    try {
      const conversation = await conversationModel.findByIdAndUpdate(
        conversationId,
        {
          lastMessage,
          lastMessageId,
        }
      );

      return {
        success: true,
        message: "Cnversations fetched",
        conversation,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to fetch conversatons: ${error.message}`,
      };
    }
  }

  async getAllMessages(conversationId: string) {
    try {
      const messages = await chatModel.find({ conversationId: conversationId });
      // .sort({ createdAt: -1 });

      return {
        success: true,
        message: "Cnversations fetched",
        messages,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Failed to fetch conversatons: ${error.message}`,
      };
    }
  }
}

export default ChatRepository;

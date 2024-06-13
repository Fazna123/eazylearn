import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    text: {
      type: String,
    },
    sender: {
      type: String,
    },
    images: [{ type: String }],
  },
  { timestamps: true }
);

const chatModel = mongoose.model("Chat", chatSchema);

export default chatModel;

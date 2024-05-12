import mongoose, { Schema, Model } from "mongoose";
import { INotification } from "../interfaces/notification";

const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "unread",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      // type: String,
    },
  },
  { timestamps: true }
);

const notificationModel: Model<INotification> = mongoose.model(
  "Notification",
  notificationSchema
);
export default notificationModel;

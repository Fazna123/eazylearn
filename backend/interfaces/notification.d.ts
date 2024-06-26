import { Document, ObjectId } from "mongoose";

export interface INotification extends Document {
  title: string;
  message: string;
  status: string;
  userId: string | ObjectId;
}

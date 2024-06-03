import { Document, ObjectId } from "mongoose";

export interface IOrder extends Document {
  courseId: string | ObjectId;
  userId: string | ObjectId;
  payment_info: object;
  price: number | string;
}

import mongoose, { Document, Model, Schema } from "mongoose";
import { IOrder } from "../interfaces/order";

const orderSchema = new Schema<IOrder>(
  {
    courseId: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    payment_info: {
      type: Object,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

const orderModel: Model<IOrder> = mongoose.model("Order", orderSchema);

export default orderModel;

import { Document } from "mongoose";
import { IUser } from "./user";

export interface IComment extends Document {
  user: IUser;
  question?: string;
  questionReplies?: IComment[];
}

export interface IReview extends Document {
  user: IUser;
  rating?: number;
  comment?: string;
  commentReplies?: IComment[];
}

export interface IAddReviewData {
  review?: string;
  rating?: number;
  userId: string;
}

export interface IAddReviewReply {
  comment: string;
  courseId: string;
  reviewId: string;
}

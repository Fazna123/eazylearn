import { Document } from "mongoose";

export interface IComment extends Document {
  user: object;
  comment: string;
}

export interface IReview extends Document {
  user: object;
  rating: number;
  comment: string;
  commentReplies: IComment[];
}

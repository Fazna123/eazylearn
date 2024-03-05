import ILink from "./link";
import { IReview } from "./review";

interface IMCQ extends Document {
  question: string;
  options: string[];
  answer: number;
}

interface ICourse extends Document {
  _id?: string | ObjectId;
  title: string;
  description: string;
  language: string;
  level: string;
  category: string | ObjectId;
  cover: string;
  preview: string;
  lessons: ILesson[];
  announcements: string[];
  mcq: IMCQ[];
  coupons: ICoupon[];
  reviews: IReview[];
  instructor: string | ObjectId;
  enrollers: ObjectId[];
  price: number;
  offer: number;
  isApproved: boolean;
  isBlock: boolean;
}

export default ICourse;

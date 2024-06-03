import ILink from "./link";
import ICoupon from "./coupon";
import { IComment, IReview } from "./review";
import { Document } from "mongoose";

export interface ICourseDetails extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestions: string;
  questions: IComment[];
}

export interface ICourse extends Document {
  name: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  thumbnail?: object;
  tags?: string;
  level?: string;
  demoUrl: string;
  benefits?: { title: string }[];
  prerequisites?: { title: string }[];
  reviews?: IReview[];
  courseData?: ICourseDetails[];
  ratings?: number;
  purchased?: number;
  instructor?: string | ObjectId;
  offer?: number;
  isApproved: boolean;
  isBlock: boolean;
  coupons?: ICoupon[];
  category?: string | ObjectId;
  announcements?: string[];
  isRejected?: boolean;
}

// interface IMCQ extends Document {
//   question: string;
//   options: string[];
//   answer: number;
// }

// interface ICourse extends Document {
//   _id?: string | ObjectId;
//   title: string;
//   description: string;
//   language: string;
//   level: string;
//   category: string | ObjectId;
//   cover: string;
//   preview: string;
//   lessons: ILesson[];
//   announcements: string[];
//   mcq: IMCQ[];
//   coupons: ICoupon[];
//   reviews: IReview[];
//   instructor: string | ObjectId;
//   enrollers: ObjectId[];
//   price: number;
//   offer: number;
//   isApproved: boolean;
//   isBlock: boolean;
// }

// export default ICourse;

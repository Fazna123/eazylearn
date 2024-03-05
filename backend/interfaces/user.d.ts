import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  avatar?: string;
  role?: string;
  isVerified?: boolean;
  //courses?: Array<{ courseId: string }>;
  learnings?: Array<{
    course: ObjectId;
    progress: Array<{}>;
    certificate: boolean;
  }>;
  teachings?: Array<{}>;
  wishlist?: Array<{}>;
  wallet?: Object;
  isBlock?: boolean;

  comparePassword: (password: string) => Promise<boolean>;
  signAccessToken: () => string;
  signRefreshToken: () => string;
}

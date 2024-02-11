import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  avatar?: {
    public_id: string;
    url: string;
  };
  role?: string;
  isVerified?: boolean;
  courses?: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
  signAccessToken: () => string;
  signRefreshToken: () => string;
}

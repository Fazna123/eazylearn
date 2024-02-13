import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { IUser } from "../interfaces/user";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "Please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: [6, "Password must be atleast 6 characters"],
      select: false,
      default: "googleAuth",
    },

    avatar: {
      //public_id: String,
      //url: String,
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },

    // avatar: {
    //   public_id: {
    //     type: String,
    //     default: "", // Provide default values for each property
    //   },
    //   url: {
    //     type: String,
    //     default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    //   },
    // },

    role: {
      type: String,
      default: "student",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    courses: [
      {
        courseId: String,
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.signAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "1d",
  });
};

userSchema.methods.signRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "", {
    expiresIn: "3d",
  });
};

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);

export default userModel;

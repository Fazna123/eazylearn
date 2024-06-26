import mongoose, { Document, Schema, Model, ObjectId } from "mongoose";
import { IComment, IReport, IReview } from "../interfaces/review";
import ILink from "../interfaces/link";
import { ICourse, ICourseDetails } from "../interfaces/course";
import User from "./user.model";

const reviewSchema = new Schema<IReview>(
  {
    user: Object,
    rating: {
      type: Number,
      default: 0,
    },
    comment: String,
    commentReplies: [Object],
  },
  { timestamps: true }
);

const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});

const commentSchema = new Schema<IComment>(
  {
    user: Object,
    question: String,
    questionReplies: [Object],
  },
  { timestamps: true }
);

const reportSchema = new Schema<IReport>(
  {
    user: Object,
    reason: String,
  },
  { timestamps: true }
);

const courseDetailsSchema = new Schema<ICourseDetails>({
  videoUrl: String,
  //videoThumbnail: Object,
  title: String,
  videoSection: String,
  description: String,
  videoLength: Number,
  videoPlayer: String,
  links: [linkSchema],
  suggestions: String,
  questions: [commentSchema],
});

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    estimatedPrice: {
      type: Number,
    },
    thumbnail: {
      type: String,
    },
    tags: {
      type: String,
      //required: true,
    },
    level: {
      type: String,
      //required: true,
    },
    demoUrl: {
      type: String,
      //required: true,
    },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    reports: [reportSchema],
    courseData: [courseDetailsSchema],
    ratings: {
      type: Number,
      default: 0,
    },
    purchased: { type: Number, default: 0 },
    offer: {
      type: Number,
      default: 0,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    isRejected: {
      type: Boolean,
      default: false,
    },
    isReported: {
      type: Boolean,
      default: false,
    },

    announcements: { type: [String], default: [] },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      // type: String,
    },
    instructor: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      // type: String,
    },
  },
  { timestamps: true }
);

const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);

export default CourseModel;

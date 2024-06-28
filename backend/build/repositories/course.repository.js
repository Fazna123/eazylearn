"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_model_1 = __importDefault(require("../models/category.model"));
const course_model_1 = __importDefault(require("../models/course.model"));
const notification_model_1 = __importDefault(require("../models/notification.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const analytics_generator_1 = require("../utils/analytics.generator");
const node_cron_1 = __importDefault(require("node-cron"));
class CourseRepository {
    constructor() {
        this.initializeCronJobs();
    }
    initializeCronJobs() {
        node_cron_1.default.schedule("0 0 0 * * *", () => __awaiter(this, void 0, void 0, function* () {
            try {
                const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                const result = yield notification_model_1.default.deleteMany({
                    status: "read",
                    createdAt: { $lt: thirtyDaysAgo },
                });
                console.log(`Deleted ${result.deletedCount} notifications`);
                // console.log("---------");
                // console.log("running");
            }
            catch (error) {
                console.error("Error in cron job:", error);
            }
        }));
    }
    createCourse(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(data);
                const course = yield course_model_1.default.create(data);
                if (!course) {
                    return {
                        success: false,
                        message: "Failed to create course",
                    };
                }
                return {
                    success: true,
                    message: "Course created",
                    course,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch ${error}`,
                };
            }
        });
    }
    editCourse(courseId, details) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield course_model_1.default.findByIdAndUpdate(courseId, {
                    $set: details,
                }, { new: true });
                if (!course) {
                    return {
                        success: false,
                        message: "Failed to update course",
                    };
                }
                return {
                    success: true,
                    message: "Course updated",
                    course,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch ${error}`,
                };
            }
        });
    }
    getSingleCourse(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield course_model_1.default.findById(courseId, {
                    isBlock: false,
                }).select("-courseData.videoUrl -courseData.sugession -courseData.questions -courseData.links");
                if (!course) {
                    return {
                        success: false,
                        message: "Failed to fetch course",
                    };
                }
                return {
                    success: true,
                    message: "Course details fetched successfully",
                    course,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch ${error}`,
                };
            }
        });
    }
    getSingleCourseContent(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield course_model_1.default.findById(courseId, {
                    isBlock: false,
                });
                if (!course) {
                    return {
                        success: false,
                        message: "Failed to fetch course",
                    };
                }
                return {
                    success: true,
                    message: "Course details fetched successfully",
                    course,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch ${error}`,
                };
            }
        });
    }
    getAllCourse() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield course_model_1.default.find({
                    isBlock: false,
                    isApproved: true,
                })
                    .select("-courseData.videoUrl -courseData.sugession -courseData.questions -courseData.links")
                    .sort({ createdAt: -1 });
                if (!courses) {
                    return {
                        success: false,
                        message: "Failed to fetch course",
                    };
                }
                return {
                    success: true,
                    message: "Course details fetched successfully",
                    courses,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch ${error}`,
                };
            }
        });
    }
    getApprovedCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield course_model_1.default.find({
                    isBlock: false,
                    isApproved: true,
                }).sort({ createdAt: -1 });
                if (!courses) {
                    return {
                        success: false,
                        message: "Failed to fetch course",
                    };
                }
                return {
                    success: true,
                    message: "Course details fetched successfully",
                    courses,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch ${error}`,
                };
            }
        });
    }
    getCoursesToApprove() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield course_model_1.default.find({
                    isBlock: false,
                    isApproved: false,
                }).populate("instructor", "email");
                if (!courses) {
                    return {
                        success: false,
                        message: "Failed to fetch course",
                    };
                }
                return {
                    success: true,
                    message: "Course details fetched successfully",
                    courses,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch ${error}`,
                };
            }
        });
    }
    myTeachings(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield course_model_1.default.find({
                    instructor: userId,
                    isBlock: false,
                }).sort({ createdAt: -1 });
                if (!courses) {
                    return {
                        success: false,
                        message: "Failed to fetch course",
                    };
                }
                return {
                    success: true,
                    message: "Course details fetched successfully",
                    courses,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch ${error}`,
                };
            }
        });
    }
    approveCourse(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield course_model_1.default.findByIdAndUpdate(courseId, { isApproved: true }, { new: true });
                if (!course) {
                    return {
                        success: false,
                        message: "Failed to approve course",
                    };
                }
                return {
                    success: true,
                    message: "Course approved successfully",
                    course,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to approve ${error}`,
                };
            }
        });
    }
    rejectCourse(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield course_model_1.default.findByIdAndUpdate(courseId, { isRejected: true }, { new: true });
                if (!course) {
                    return {
                        success: false,
                        message: "Failed to approve course",
                    };
                }
                return {
                    success: true,
                    message: "Course approved successfully",
                    course,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to approve ${error}`,
                };
            }
        });
    }
    deleteCourse(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield course_model_1.default.findByIdAndUpdate(courseId, { isBlock: true }, { new: true });
                if (!course) {
                    return {
                        success: false,
                        message: "Failed to delete course",
                    };
                }
                return {
                    success: true,
                    message: "Course deleted successfully",
                    course,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to delete course ${error}`,
                };
            }
        });
    }
    revokeCourse(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield course_model_1.default.findByIdAndUpdate(courseId, { isBlock: false }, { new: true });
                if (!course) {
                    return {
                        success: false,
                        message: "Failed to delete course",
                    };
                }
                return {
                    success: true,
                    message: "Course deleted successfully",
                    course,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to delete course ${error}`,
                };
            }
        });
    }
    deletedCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield course_model_1.default.find({ isBlock: true }).sort({
                    createdAt: -1,
                });
                if (!courses) {
                    return {
                        success: false,
                        message: "Failed to fetch deleted courses",
                    };
                }
                return {
                    success: true,
                    message: "Deleted  courses fetched successfully",
                    courses,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch deleted courses ${error}`,
                };
            }
        });
    }
    reportedCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield course_model_1.default.find({
                    isReported: true,
                    isBlock: false,
                }).sort({
                    createdAt: -1,
                });
                if (!courses) {
                    return {
                        success: false,
                        message: "Failed to fetch reported courses",
                    };
                }
                return {
                    success: true,
                    message: "Reported Course fetched successfully",
                    courses,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch reported course ${error}`,
                };
            }
        });
    }
    getAllCourseDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield course_model_1.default.find().sort({ createdAt: -1 });
                if (!courses) {
                    return {
                        success: false,
                        message: "Failed to fetch course",
                    };
                }
                return {
                    success: true,
                    message: "Course details fetched successfully",
                    courses,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch ${error}`,
                };
            }
        });
    }
    createCategory(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_model_1.default.create(data);
                if (!category) {
                    return {
                        success: false,
                        message: `server error`,
                    };
                }
                return {
                    success: true,
                    message: "Category Added",
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch ${error}`,
                };
            }
        });
    }
    findCategory(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_model_1.default.findOne({ name });
                if (!category) {
                    return {
                        success: false,
                        message: `server error`,
                    };
                }
                return {
                    success: true,
                    message: "Category found",
                    category,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch ${error}`,
                };
            }
        });
    }
    getCategories(regex) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = regex
                    ? yield category_model_1.default.find({ name: { $regex: regex, $options: "i" } })
                    : yield category_model_1.default.find();
                return {
                    success: true,
                    message: "Fetch all caetgories",
                    categories,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch ${error}`,
                };
            }
        });
    }
    updateCategory(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log(categories);
                const updated = yield category_model_1.default.findByIdAndUpdate(id, { name }, {
                    new: true,
                });
                // for (const category of categories) {
                //   await categoryModel.findByIdAndUpdate(category._id, {
                //     title: category.title,
                //   });
                // }
                if (!updated) {
                    return {
                        success: false,
                        message: "Unable to update right now",
                    };
                }
                return {
                    success: true,
                    message: "Updated the Categories",
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch ${error}`,
                };
            }
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log(categories);
                const updated = yield category_model_1.default.findByIdAndDelete(id, {
                    new: true,
                });
                // for (const category of categories) {
                //   await categoryModel.findByIdAndUpdate(category._id, {
                //     title: category.title,
                //   });
                // }
                if (!updated) {
                    return {
                        success: false,
                        message: "Unable to delete right now",
                    };
                }
                return {
                    success: true,
                    message: "Deleted the Categories",
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to delete ${error}`,
                };
            }
        });
    }
    coursePurchaseUpdate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield course_model_1.default.findByIdAndUpdate(id, { $inc: { purchased: 1 } }, { new: true });
                console.log(courses);
                if (!courses) {
                    return {
                        success: false,
                        message: "Failed to fetch course",
                    };
                }
                return {
                    success: true,
                    message: "Course details fetched successfully",
                    courses,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch ${error}`,
                };
            }
        });
    }
    addQuestion(courseId, contentId, newQuestion) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield course_model_1.default.findOneAndUpdate({
                    _id: courseId,
                    "courseData._id": contentId, // Match the courseId and contentId
                }, {
                    $push: {
                        "courseData.$.questions": newQuestion, // Push the new question into the 'questions' array of the matched content
                    },
                }, {
                    new: true,
                });
                if (!course) {
                    return {
                        success: false,
                        message: "Failed to find course or content",
                    };
                }
                return {
                    success: true,
                    message: "Question added successfully",
                    course,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to add question: ${error}`,
                };
            }
        });
    }
    addAnswer(courseId, contentId, questionId, answer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield course_model_1.default.findOneAndUpdate({
                    _id: courseId,
                    "courseData._id": contentId,
                    "courseData.questions._id": questionId,
                }, {
                    $push: {
                        "courseData.$[content].questions.$[question].questionReplies": answer,
                    },
                }, {
                    new: true,
                    arrayFilters: [
                        { "content._id": contentId },
                        { "question._id": questionId },
                    ],
                });
                if (!course) {
                    return {
                        success: false,
                        message: "Failed to find course or content or question",
                    };
                }
                return {
                    success: true,
                    message: "Answer added successfully",
                    course,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to add answer: ${error}`,
                };
            }
        });
    }
    updateCourseRatings(courseId, reviewData) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield course_model_1.default.findById(courseId);
                const reviews = (_a = course === null || course === void 0 ? void 0 : course.reviews) !== null && _a !== void 0 ? _a : [];
                reviews.push(reviewData);
                let avg = 0;
                reviews.forEach((rev) => {
                    avg += rev.rating;
                });
                if (course) {
                    course.ratings = avg / reviews.length;
                }
                yield (course === null || course === void 0 ? void 0 : course.save());
                return {
                    success: true,
                    message: "Review added successfully",
                    course,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to add review: ${error}`,
                };
            }
        });
    }
    updateReplyToReview(courseId, review) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCourse = yield course_model_1.default.findByIdAndUpdate(courseId, { $set: { "reviews.$[review]": review } }, { new: true, arrayFilters: [{ "review._id": review._id }] });
                return {
                    success: true,
                    message: "Reply to review added successfully",
                    course: updatedCourse,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to add reply to review: ${error}`,
                };
            }
        });
    }
    getNotifications() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifications = yield notification_model_1.default
                    .find()
                    .sort({ createdAt: -1 });
                return {
                    success: true,
                    message: "Notifications fetched successfully",
                    notifications: notifications,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch notifications: ${error}`,
                };
            }
        });
    }
    updateNotificationStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = yield notification_model_1.default.findByIdAndUpdate(id, {
                    status: "read",
                });
                if (!notification) {
                    return {
                        success: false,
                        message: `Failed to update notifications`,
                    };
                }
                const notifications = yield notification_model_1.default
                    .find()
                    .sort({ createdAt: -1 });
                return {
                    success: true,
                    message: "Notifications updated successfully",
                    notifications: notifications,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to update notifications: ${error}`,
                };
            }
        });
    }
    getAllCourseSearch({ search, category, page, pageSize, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pageNumber = parseInt((page !== null && page !== void 0 ? page : 1).toString(), 10);
                const limit = parseInt((pageSize !== null && pageSize !== void 0 ? pageSize : 10).toString(), 10);
                const skip = (pageNumber - 1) * limit;
                const query = { isBlock: false, isApproved: true };
                if (search) {
                    query.name = { $regex: search, $options: "i" }; // case-insensitive search
                }
                if (category && category !== "All") {
                    query.category = category;
                }
                const courses = yield course_model_1.default.find(query)
                    .select("-courseData.videoUrl -courseData.sugession -courseData.questions -courseData.links")
                    .skip(skip)
                    .limit(limit);
                const totalCourses = yield course_model_1.default.countDocuments(query);
                if (!courses) {
                    return {
                        success: false,
                        message: "Failed to fetch courses",
                    };
                }
                return {
                    success: true,
                    message: "Course details fetched successfully",
                    courses,
                    totalCourses,
                    currentPage: pageNumber,
                    totalPages: Math.ceil(totalCourses / limit),
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch courses: ${error.message}`,
                };
            }
        });
    }
    getCourseAnalytics() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield (0, analytics_generator_1.generateLast12MonthsData)(course_model_1.default);
                return {
                    success: true,
                    message: "Details fetched",
                    courses,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Server Error ${error.message}`,
                };
            }
        });
    }
    getMyCourses(userId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findById({ _id: userId }).select("courses");
                if (!user) {
                    return {
                        success: false,
                        message: "User not found",
                    };
                }
                const courseIds = (_a = user === null || user === void 0 ? void 0 : user.courses) === null || _a === void 0 ? void 0 : _a.map((course) => course._id);
                //console.log(courseIds);
                const courses = yield course_model_1.default.find({ _id: { $in: courseIds } });
                //onsole.log(courses);
                return {
                    success: true,
                    message: "Details fetched",
                    courses,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Server Error ${error.message}`,
                };
            }
        });
    }
    updateCourseReports(courseId, reportData) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield course_model_1.default.findById(courseId);
                if (!course) {
                    return {
                        success: false,
                        message: "Course not found",
                    };
                }
                const reports = (_a = course === null || course === void 0 ? void 0 : course.reports) !== null && _a !== void 0 ? _a : [];
                reports.push(reportData);
                course.isReported = true;
                course.reports = reports; // Ensure reports are saved
                yield (course === null || course === void 0 ? void 0 : course.save());
                return {
                    success: true,
                    message: "Report added successfully",
                    course,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to report course: ${error}`,
                };
            }
        });
    }
    editReview(courseId, reviewId, comment, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield course_model_1.default.findById(courseId);
                if (!course) {
                    return {
                        success: false,
                        message: "Course not found",
                    };
                }
                if (!course.reviews) {
                    return {
                        success: false,
                        message: "No reviews found for this course",
                    };
                }
                // Find the review by ID within the course's reviews array
                //const review = course.reviews.id(reviewId);
                const review = course.reviews.find((review) => review._id.toString() === reviewId); //changed during building
                if (!review) {
                    return {
                        success: false,
                        message: `Review not found`,
                    };
                }
                // Update the review fields
                review.comment = comment;
                review.rating = rating;
                // Save the updated course
                yield course.save();
                return {
                    success: true,
                    message: "Review edited successfully",
                    course,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to edit review: ${error}`,
                };
            }
        });
    }
}
exports.default = CourseRepository;
// async addQuestion(courseId, courseContent) {
//   try {
//     // Update the course document by pushing the new question into the specified content's 'questions' array
//     const course = await CourseModel.findByIdAndUpdate(
//       courseId,
//       {
//         $push: { "courseData.$[content].questions": courseContent.questions },
//       },
//       {
//         new: true,
//         arrayFilters: [{ "content._id": courseContent._id }], // Filter to match the specified contentId
//       }
//     );
//     if (!course) {
//       return {
//         success: false,
//         message: "Failed to find course",
//       };
//     }
//     return {
//       success: true,
//       message: "Question added successfully",
//       course,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: `Failed to add question: ${error}`,
//     };
//   }
// }

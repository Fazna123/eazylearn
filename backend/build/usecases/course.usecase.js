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
const mongoose_1 = __importDefault(require("mongoose"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class CourseUsecase {
    constructor(courseRepository, userRepository, orderRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }
    createCourse(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                if (data) {
                    const courseData = data;
                    courseData.instructor = ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) || "";
                    const response = yield this.courseRepository.createCourse(courseData);
                    if (response.course) {
                        return {
                            status: response.success ? 200 : 500,
                            data: {
                                success: response.success,
                                message: response.message,
                                course: response.course,
                            },
                        };
                    }
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    editCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const courseId = req.params.id;
                const response = yield this.courseRepository.editCourse(courseId, data);
                if (response.course) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            course: response.course,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    getSingleCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseId = req.params.id;
                const response = yield this.courseRepository.getSingleCourse(courseId);
                if (response.course) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            course: response.course,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    getSingleCourseContent(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseId = req.params.id;
                const userCourseList = (_a = req.user) === null || _a === void 0 ? void 0 : _a.courses;
                const courseExists = userCourseList === null || userCourseList === void 0 ? void 0 : userCourseList.find((course) => course._id.toString() === courseId);
                if (!courseExists) {
                    return {
                        status: 404,
                        data: {
                            success: false,
                            message: "You are not eligible to access this course",
                        },
                    };
                }
                const response = yield this.courseRepository.getSingleCourseContent(courseId);
                if (response.course) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            course: response.course,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    getAllCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const courseId = req.params.id;
                const response = yield this.courseRepository.getAllCourse();
                if (response.courses) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            courses: response.courses,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    getApprovedCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const courseId = req.params.id;
                const response = yield this.courseRepository.getApprovedCourses();
                if (response.courses) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            courses: response.courses,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    getCoursesToApprove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const courseId = req.params.id;
                const response = yield this.courseRepository.getCoursesToApprove();
                if (response.courses) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            courses: response.courses,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    getAllCourseSearch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { search = "", category = "All", page = "1", pageSize = "10", } = req.query;
                const response = yield this.courseRepository.getAllCourseSearch({
                    search: search.toString(),
                    category: category.toString(),
                    page: parseInt(page, 10) || 1,
                    pageSize: parseInt(pageSize, 10) || 10,
                });
                if (response.courses) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            courses: response.courses,
                            totalCourses: response.totalCourses,
                            currentPage: response.currentPage,
                            totalPages: response.totalPages,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    myTeachings(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("myteachings usecase");
                const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) || "";
                console.log("userid:", userId);
                const response = yield this.courseRepository.myTeachings(userId);
                if (response.courses) {
                    console.log(response.courses);
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            courses: response.courses,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    approveCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseId = req.params.id;
                const response = yield this.courseRepository.approveCourse(courseId);
                if (response.course) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            course: response.course,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    rejectCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseId = req.params.id;
                const response = yield this.courseRepository.rejectCourse(courseId);
                if (response.course) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            course: response.course,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    deleteCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseId = req.params.id;
                const response = yield this.courseRepository.deleteCourse(courseId);
                if (response.course) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            course: response.course,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    revokeCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseId = req.params.id;
                const response = yield this.courseRepository.revokeCourse(courseId);
                if (response.course) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            course: response.course,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    getAllCourseDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const courseId = req.params.id;
                const response = yield this.courseRepository.getAllCourseDetails();
                if (response.courses) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            courses: response.courses,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    deletedCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const courseId = req.params.id;
                const response = yield this.courseRepository.deletedCourses();
                if (response.courses) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            courses: response.courses,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    reportedCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const courseId = req.params.id;
                const response = yield this.courseRepository.reportedCourses();
                if (response.courses) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            courses: response.courses,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    addCategory(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name } = data;
                name = name.toLowerCase();
                const categoryExist = yield this.courseRepository.findCategory(name);
                if (categoryExist.success) {
                    return {
                        status: 404,
                        data: {
                            success: false,
                            message: "Category Exist",
                        },
                    };
                }
                const res = yield this.courseRepository.createCategory({ name });
                return {
                    status: res.success ? 200 : 500,
                    data: {
                        success: res.success,
                        message: res.message,
                    },
                };
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    getCategories(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { search } = query;
                const res = yield this.courseRepository.getCategories(search);
                return {
                    status: res.success ? 200 : 500,
                    data: {
                        success: res.success,
                        message: res.message,
                        categories: res.categories,
                    },
                };
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("update cat usecase");
                console.log("req.body", req.body);
                let { id, name } = req.body;
                name = name.toLowerCase();
                const categories = req.body;
                const res = yield this.courseRepository.updateCategory(id, name);
                return {
                    status: res.success ? 200 : 500,
                    data: {
                        success: res.success,
                        message: res.message,
                    },
                };
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const res = yield this.courseRepository.deleteCategory(id);
                return {
                    status: res.success ? 200 : 500,
                    data: {
                        success: res.success,
                        message: res.message,
                    },
                };
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    addQuestion(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { question, courseId, contentId } = req.body;
                const courseDetails = yield this.courseRepository.getSingleCourseContent(courseId);
                const course = courseDetails.course;
                if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
                    return {
                        status: 400,
                        data: {
                            success: false,
                            message: "Invalid Content Id",
                        },
                    };
                }
                const courseContent = (_a = course === null || course === void 0 ? void 0 : course.courseData) === null || _a === void 0 ? void 0 : _a.find((item) => item._id.equals(contentId));
                const newQuestion = {
                    user: req === null || req === void 0 ? void 0 : req.user,
                    question,
                    questionReplies: [],
                };
                //courseContent?.questions.push(newQuestion);
                const res = yield this.courseRepository.addQuestion(courseId, courseContent === null || courseContent === void 0 ? void 0 : courseContent._id, newQuestion);
                if (res) {
                    const notificationData = {
                        user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
                        title: "New Question Recieved",
                        message: `You have a new question in ${courseContent === null || courseContent === void 0 ? void 0 : courseContent.title} of ${(_c = res.course) === null || _c === void 0 ? void 0 : _c.name}`,
                    };
                    const notification = yield this.orderRepository.saveNotification(notificationData);
                }
                return {
                    status: res.success ? 200 : 500,
                    data: {
                        success: res.success,
                        message: res.message,
                        course: res.course,
                    },
                };
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    addAnswer(req, res) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { answer, courseId, contentId, questionId } = req.body;
                const courseDetails = yield this.courseRepository.getSingleCourseContent(courseId);
                const course = courseDetails.course;
                if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
                    return {
                        status: 400,
                        data: {
                            success: false,
                            message: "Invalid Content Id",
                        },
                    };
                }
                const courseContent = (_a = course === null || course === void 0 ? void 0 : course.courseData) === null || _a === void 0 ? void 0 : _a.find((item) => item._id.equals(contentId));
                const question = (_b = courseContent === null || courseContent === void 0 ? void 0 : courseContent.questions) === null || _b === void 0 ? void 0 : _b.find((item) => item._id.equals(questionId));
                if (!question) {
                    return {
                        status: 400,
                        data: {
                            success: false,
                            message: "Invalid question Id",
                        },
                    };
                }
                const newAnswer = {
                    user: req.user,
                    answer,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                // question.questionReplies?.push(newAnswer);
                // await course?.save()
                const res = yield this.courseRepository.addAnswer(course === null || course === void 0 ? void 0 : course._id, courseContent === null || courseContent === void 0 ? void 0 : courseContent._id, question._id, newAnswer);
                if (((_c = req.user) === null || _c === void 0 ? void 0 : _c._id) === question.user._id) {
                    const notificationData = {
                        user: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id,
                        title: "New Question Reply Recieved",
                        message: `You have a new question reply in ${courseContent === null || courseContent === void 0 ? void 0 : courseContent.title} of ${(_e = res.course) === null || _e === void 0 ? void 0 : _e.name}`,
                    };
                    const notification = yield this.orderRepository.saveNotification(notificationData);
                }
                else {
                    const dataMail = {
                        name: question.user.name,
                        title: courseContent === null || courseContent === void 0 ? void 0 : courseContent.title,
                    };
                    const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/question-reply.ejs"), dataMail);
                    try {
                        yield (0, sendMail_1.default)({
                            email: question.user.email,
                            subject: "Question Reply",
                            template: "question-reply.ejs",
                            data: dataMail,
                        });
                    }
                    catch (error) {
                        return {
                            status: 500,
                            data: {
                                success: false,
                                message: `Failed to send the mail ${error}`,
                            },
                        };
                    }
                }
                return {
                    status: res.success ? 200 : 500,
                    data: {
                        success: res.success,
                        message: res.message,
                        course: res.course,
                    },
                };
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    addReview(req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("rev usecase");
                const courseId = req.params.id;
                console.log(courseId);
                const { review, rating, userId } = req.body;
                //const user = await this.userRepository.findUser(userId);
                const courses = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.courses;
                const courseExists = courses === null || courses === void 0 ? void 0 : courses.some((course) => course._id.toString() === courseId.toString());
                if (!courseExists) {
                    return {
                        status: 404,
                        data: {
                            success: false,
                            message: "You are not eligible to access this course",
                        },
                    };
                }
                const reviewData = {
                    user: req === null || req === void 0 ? void 0 : req.user,
                    comment: review,
                    rating,
                };
                const res = yield this.courseRepository.updateCourseRatings(courseId, reviewData);
                const courseDetails = yield this.courseRepository.getSingleCourseContent(courseId);
                const notificationData = {
                    user: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id,
                    title: "New Review Recieved",
                    message: `${(_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.name} has given a review in ${(_d = courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails.course) === null || _d === void 0 ? void 0 : _d.name}`,
                };
                const notification = yield this.orderRepository.saveNotification(notificationData);
                return {
                    status: res.success ? 200 : 500,
                    data: {
                        success: res.success,
                        message: res.message,
                        course: res.course,
                    },
                };
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    //add reply to review
    addReplyToReview(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { comment, courseId, reviewId } = req.body;
                const courseDetails = yield this.courseRepository.getSingleCourseContent(courseId);
                if (!courseDetails.course) {
                    return {
                        status: 404,
                        data: {
                            success: false,
                            message: "Course Not Found",
                        },
                    };
                }
                const review = (_a = courseDetails.course.reviews) === null || _a === void 0 ? void 0 : _a.find((rev) => rev._id.toString() === reviewId);
                if (!review) {
                    return {
                        status: 404,
                        data: {
                            success: false,
                            message: "Review Not Found",
                        },
                    };
                }
                const replyData = {
                    user: req.user,
                    comment,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                if (!review.commentReplies) {
                    review.commentReplies = [];
                }
                (_b = review === null || review === void 0 ? void 0 : review.commentReplies) === null || _b === void 0 ? void 0 : _b.push(replyData);
                const res = yield this.courseRepository.updateReplyToReview(courseId, review);
                return {
                    status: res.success ? 200 : 500,
                    data: {
                        success: res.success,
                        message: res.message,
                        course: res.course,
                    },
                };
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    getNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.courseRepository.getNotifications();
                return {
                    status: res.success ? 200 : 500,
                    data: {
                        success: res.success,
                        message: res.message,
                        notifications: res.notifications,
                    },
                };
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    updateNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const res = yield this.courseRepository.updateNotificationStatus(id);
                return {
                    status: res.success ? 200 : 500,
                    data: {
                        success: res.success,
                        message: res.message,
                        notifications: res.notifications,
                    },
                };
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    getCourseAnalytics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseRepository.getCourseAnalytics();
                return {
                    status: response.success ? 201 : 500,
                    data: {
                        success: response.success,
                        message: response.message,
                        courses: response.courses,
                    },
                };
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: `server error ${error.message}`,
                    },
                };
            }
        });
    }
    getMyCourses(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!userId) {
                    return {
                        status: 404,
                        data: {
                            success: false,
                            message: `Need to authorize`,
                        },
                    };
                }
                const response = yield this.courseRepository.getMyCourses(userId);
                return {
                    status: response.success ? 201 : 500,
                    data: {
                        success: response.success,
                        message: response.message,
                        courses: response.courses,
                    },
                };
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: `server error ${error.message}`,
                    },
                };
            }
        });
    }
    sendRejectionMail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log("Rejection use case");
                //console.log("Request body:", req.body);
                const { email, courseName, reason } = req.body;
                const mailData = {
                    courseName,
                    reason,
                    year: new Date().getFullYear(),
                };
                try {
                    yield this.sendMail({
                        email: email,
                        subject: "Course Rejection Notification",
                        template: "rejectionMail.ejs",
                        data: mailData,
                    });
                    return {
                        status: 201,
                        data: {
                            success: true,
                            message: "Mail sent successfully",
                        },
                    };
                    // res.status(201).json({
                    //   success: true,
                    //   message: "Mail sent successfully",
                    // });
                }
                catch (error) {
                    console.error("Error sending mail:", error.message);
                    return {
                        status: 500,
                        data: {
                            success: false,
                            message: `server error ${error.message}`,
                        },
                    };
                }
            }
            catch (error) {
                console.error("Server error:", error.message);
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: `server error ${error.message}`,
                    },
                };
            }
        });
    }
    sendMail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer_1.default.createTransport({
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || "587"),
                service: process.env.SMTP_SERVICE,
                auth: {
                    user: process.env.SMTP_MAIL,
                    pass: process.env.SMTP_PASSWORD,
                },
            });
            //console.log("send Mail");
            const { email, subject, template, data } = options;
            //console.log(options);
            const templatePath = path_1.default.join(__dirname, "../mails", template);
            //console.log(templatePath);
            const html = yield ejs_1.default.renderFile(templatePath, data);
            const mailOptions = {
                from: process.env.SMTP_MAIL,
                to: email,
                subject,
                html,
            };
            yield transporter.sendMail(mailOptions);
        });
    }
    addReportReason(req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseId = req.params.id;
                //console.log(courseId);
                const { reason } = req.body;
                //const user = await this.userRepository.findUser(userId);
                const courses = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.courses;
                console.log("courses", courses);
                const courseExists = courses === null || courses === void 0 ? void 0 : courses.some((course) => course._id.toString() === courseId.toString());
                if (!courseExists) {
                    return {
                        status: 404,
                        data: {
                            success: false,
                            message: "You are not eligible to access this course",
                        },
                    };
                }
                const reportData = {
                    user: req === null || req === void 0 ? void 0 : req.user,
                    reason,
                };
                const res = yield this.courseRepository.updateCourseReports(courseId, reportData);
                const courseDetails = yield this.courseRepository.getSingleCourseContent(courseId);
                const notificationData = {
                    user: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id,
                    title: "Course Reported",
                    message: `${(_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.name} has reported the course ${(_d = courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails.course) === null || _d === void 0 ? void 0 : _d.name} for ${reason}`,
                };
                const notification = yield this.orderRepository.saveNotification(notificationData);
                return {
                    status: res.success ? 200 : 500,
                    data: {
                        success: res.success,
                        message: res.message,
                        course: res.course,
                    },
                };
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    editReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseId = req.params.id;
                const { reviewId, comment, rating } = req.body;
                const res = yield this.courseRepository.editReview(courseId, reviewId, comment, rating);
                return {
                    status: res.success ? 200 : 500,
                    data: {
                        success: res.success,
                        message: res.message,
                    },
                };
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
}
exports.default = CourseUsecase;

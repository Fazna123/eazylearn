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
const path_1 = __importDefault(require("path"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const ejs_1 = __importDefault(require("ejs"));
const dotenv_1 = __importDefault(require("dotenv"));
const redis_1 = require("../utils/redis");
dotenv_1.default.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// require("dotenv").config();
class OrderUsecase {
    constructor(orderRepository, userRepository, courseRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }
    createOrder(req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log("order use case");
                // const dataRxd = req.body;
                // console.log(dataRxd);
                const { courseId, payment_info } = req.body;
                if (payment_info) {
                    if ("id" in payment_info) {
                        const paymentIntentId = payment_info.id;
                        const paymentIntent = yield stripe.paymentIntents.retrieve(paymentIntentId);
                        if (paymentIntent.status !== "succeeded") {
                            return {
                                status: 400,
                                data: {
                                    success: false,
                                    message: "Payment not authorized",
                                },
                            };
                        }
                    }
                }
                const id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!id) {
                    return {
                        status: 404,
                        data: {
                            success: false,
                            message: "Need to authorize user",
                        },
                    };
                }
                const userDetails = yield this.userRepository.findUser(id);
                const user = userDetails.data;
                //console.log(user);
                const courseExistInUser = (_b = user === null || user === void 0 ? void 0 : user.courses) === null || _b === void 0 ? void 0 : _b.some((course) => course._id.toString() === courseId);
                console.log(courseExistInUser);
                if (courseExistInUser) {
                    return {
                        status: 404,
                        data: {
                            success: false,
                            message: "Course is already Purchased",
                        },
                    };
                }
                const courseDetails = yield this.courseRepository.getSingleCourse(courseId);
                //console.log(courseDetails.course);
                if (!courseDetails.course) {
                    return {
                        status: 404,
                        data: {
                            success: false,
                            message: "Course not Found",
                        },
                    };
                }
                const data = {
                    courseId: courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails.course._id,
                    price: courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails.course.price,
                    userId: user === null || user === void 0 ? void 0 : user._id,
                    payment_info,
                };
                console.log(data);
                const response = yield this.orderRepository.createOrder(data);
                if (response.order) {
                    const mailData = {
                        order: {
                            _id: courseDetails.course._id.toString().slice(0, 6),
                            name: courseDetails.course.name,
                            price: courseDetails.course.price,
                            date: new Date().toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }),
                        },
                    };
                    const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/order-confirmation.ejs"), { order: mailData });
                    try {
                        if (user) {
                            yield (0, sendMail_1.default)({
                                email: user.email,
                                subject: "Order Confirmation",
                                template: "order-confirmation.ejs",
                                data: mailData,
                            });
                        }
                    }
                    catch (error) {
                        return {
                            status: 500,
                            data: {
                                success: false,
                                message: error.message,
                            },
                        };
                    }
                    (_c = user === null || user === void 0 ? void 0 : user.courses) === null || _c === void 0 ? void 0 : _c.push(courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails.course._id);
                    const user_id = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
                    if (!user_id) {
                        return {
                            status: 404,
                            data: {
                                success: false,
                                message: "Need to authorize",
                            },
                        };
                    }
                    yield redis_1.redis.set(user_id, JSON.stringify(user));
                    if (courseDetails.course.purchased) {
                        courseDetails.course.purchased += 1;
                    }
                    yield this.courseRepository.coursePurchaseUpdate(courseDetails.course._id);
                    console.log(user === null || user === void 0 ? void 0 : user.courses);
                    const userUpdate = yield this.userRepository.userUpdate(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.courses);
                    if (userUpdate.data) {
                        const notificationData = {
                            user: user === null || user === void 0 ? void 0 : user._id,
                            title: "New Order",
                            message: `You have a new order of ${courseDetails.course.name}`,
                        };
                        const notification = yield this.orderRepository.saveNotification(notificationData);
                    }
                    return {
                        status: response.success ? 201 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            order: response.order,
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
    //send stripe  publishable key
    sendStripePublishableKey(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                status: 200,
                data: {
                    success: true,
                    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
                },
            };
            return {
                status: 200,
                sucesss: true,
                publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
            };
            // res.status(200).json({
            //   publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
            // });
        });
    }
    //new payment
    newPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myPayment = yield stripe.paymentIntents.create({
                    amount: req.body.amount,
                    currency: "usd",
                    metadata: {
                        company: "EazyLearN",
                    },
                    description: "Example payment for a course",
                    automatic_payment_methods: {
                        enabled: true,
                    },
                });
                return {
                    status: 201,
                    data: {
                        success: true,
                        client_secret: myPayment.client_secret,
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
    getAllOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.orderRepository.getAllOrders();
                return {
                    status: response.success ? 201 : 500,
                    data: {
                        success: response.success,
                        message: response.message,
                        orders: response.orders,
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
    getOrderAnalytics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.orderRepository.getOrderAnalytics();
                return {
                    status: response.success ? 201 : 500,
                    data: {
                        success: response.success,
                        message: response.message,
                        orders: response.orders,
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
    getDashboardData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.orderRepository.getDashboardData();
                return {
                    status: response.success ? 201 : 500,
                    data: {
                        success: response.success,
                        message: response.message,
                        data: response.data,
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
    getInstructorMonthlyOrderAnalytics(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instructorId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!instructorId) {
                    return {
                        status: 404,
                        data: {
                            success: false,
                            message: `Need to authorize`,
                        },
                    };
                }
                const response = yield this.orderRepository.getInstructorMonthlyOrderAnalytics(instructorId);
                return {
                    status: response.success ? 201 : 500,
                    data: {
                        success: response.success,
                        message: response.message,
                        data: response.data,
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
}
exports.default = OrderUsecase;

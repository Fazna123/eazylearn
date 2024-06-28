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
const order_model_1 = __importDefault(require("../models/order.model"));
const notification_model_1 = __importDefault(require("../models/notification.model"));
const analytics_generator_1 = require("../utils/analytics.generator");
const user_model_1 = __importDefault(require("../models/user.model"));
const course_model_1 = __importDefault(require("../models/course.model"));
class OrderRepository {
    createOrder(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield order_model_1.default.create(data);
                if (!order) {
                    return {
                        success: false,
                        message: "Failed to finish the order",
                    };
                }
                return {
                    success: true,
                    message: "Order created",
                    order,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to Order ${error}`,
                };
            }
        });
    }
    saveNotification(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = yield notification_model_1.default.create(data);
                if (!notification) {
                    return {
                        success: false,
                        message: "Failed to finish the order",
                    };
                }
                return {
                    success: true,
                    message: "Order created",
                    notification,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to Order ${error}`,
                };
            }
        });
    }
    // async getAllOrders() {
    //   try {
    //     const orders = await orderModel
    //       .find()
    //       .sort({ createdAt: -1 })
    //       .populate("courseId", "name")
    //       .populate("userId", "name");
    //     if (!orders || orders.length === 0) {
    //       return {
    //         success: false,
    //         message: "No orders found",
    //       };
    //     }
    //     return {
    //       success: true,
    //       message: "Orders fetched completely",
    //       orders,
    //     };
    //   } catch (error) {
    //     return {
    //       success: false,
    //       message: `Failed to fetch orders ${error}`,
    //     };
    //   }
    // }
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield order_model_1.default
                    .find()
                    .sort({ createdAt: -1 })
                    .populate({
                    path: "courseId",
                    select: "name price", // Include name and price fields from courseId
                })
                    .populate({
                    path: "userId",
                    select: "name email", // Include name and email fields from userId
                });
                if (!orders || orders.length === 0) {
                    return {
                        success: false,
                        message: "No orders found",
                    };
                }
                return {
                    success: true,
                    message: "Orders fetched completely",
                    orders,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch orders ${error}`,
                };
            }
        });
    }
    getOrderAnalytics() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield (0, analytics_generator_1.generateLast12MonthsData)(order_model_1.default);
                return {
                    success: true,
                    message: "Details fetched",
                    orders,
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
    getDashboardData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalStudents = yield user_model_1.default.countDocuments({ role: "student" });
                const totalOrders = yield order_model_1.default.countDocuments();
                const totalCourses = yield course_model_1.default.countDocuments();
                return {
                    success: true,
                    message: "Details Fetched",
                    data: {
                        totalOrders,
                        totalStudents,
                        totalCourses,
                    },
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Server error ${error}`,
                };
            }
        });
    }
    getInstructorMonthlyOrderAnalytics(instructorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("order repo");
                console.log(instructorId);
                const courses = yield course_model_1.default.find({ instructor: instructorId }, "_id");
                console.log(courses);
                // Extract course IDs
                const courseIds = courses.map((course) => course._id);
                console.log(courseIds);
                const monthlyRevenue = yield order_model_1.default.aggregate([
                    {
                        $match: {
                            courseId: { $in: courseIds },
                        },
                    },
                    {
                        $project: {
                            userId: 1,
                            courseId: 1,
                            price: 1,
                            year: { $year: "$createdAt" },
                            month: { $month: "$createdAt" },
                        },
                    },
                    {
                        $group: {
                            _id: { year: "$year", month: "$month" },
                            totalAmount: { $sum: "$price" },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            year: "$_id.year",
                            month: "$_id.month",
                            totalAmount: { $multiply: ["$totalAmount", 0.8] },
                        },
                    },
                ]);
                const monthlyCount = yield order_model_1.default.aggregate([
                    {
                        $match: {
                            courseId: { $in: courseIds },
                        },
                    },
                    {
                        $project: {
                            userId: 1,
                            courseId: 1,
                            price: 1,
                            year: { $year: "$createdAt" },
                            month: { $month: "$createdAt" },
                        },
                    },
                    {
                        $group: {
                            _id: { year: "$year", month: "$month" },
                            count: { $sum: 1 },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            year: "$_id.year",
                            month: "$_id.month",
                            count: 1,
                        },
                    },
                ]);
                if (!monthlyRevenue || !monthlyCount) {
                    return {
                        success: false,
                        message: `server error`,
                    };
                }
                return {
                    success: true,
                    message: "order fetched",
                    data: { monthlyRevenue, monthlyCount },
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Server error ${error}`,
                };
            }
        });
    }
}
exports.default = OrderRepository;

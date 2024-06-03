import mongoose from "mongoose";
import orderModel from "../models/order.model";
// import userModel from "../models/user.model";
//import CourseModel from "../models/course.model";
import IOrder from "../interfaces/order";
import notificationModel from "../models/notification.model";
import { generateLast12MonthsData } from "../utils/analytics.generator";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
class OrderRepository {
  async createOrder(data: any) {
    try {
      const order = await orderModel.create(data);
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
    } catch (error) {
      return {
        success: false,
        message: `Failed to Order ${error}`,
      };
    }
  }

  async saveNotification(data: any) {
    try {
      const notification = await notificationModel.create(data);
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
    } catch (error) {
      return {
        success: false,
        message: `Failed to Order ${error}`,
      };
    }
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

  async getAllOrders() {
    try {
      const orders = await orderModel
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
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch orders ${error}`,
      };
    }
  }

  async getOrderAnalytics() {
    try {
      const orders = await generateLast12MonthsData(orderModel);
      return {
        success: true,
        message: "Details fetched",
        orders,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Server Error ${error.message}`,
      };
    }
  }

  async getDashboardData() {
    try {
      const totalStudents = await userModel.countDocuments({ role: "student" });
      const totalOrders = await orderModel.countDocuments();
      const totalCourses = await CourseModel.countDocuments();

      return {
        success: true,
        message: "Details Fetched",
        data: {
          totalOrders,

          totalStudents,
          totalCourses,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Server error ${error}`,
      };
    }
  }

  async getInstructorMonthlyOrderAnalytics(instructorId: string) {
    try {
      console.log("order repo");
      console.log(instructorId);
      const courses = await CourseModel.find(
        { instructor: instructorId },
        "_id"
      );

      console.log(courses);
      // Extract course IDs
      const courseIds = courses.map((course) => course._id);
      console.log(courseIds);

      const monthlyRevenue = await orderModel.aggregate([
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
      const monthlyCount = await orderModel.aggregate([
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
    } catch (error) {
      return {
        success: false,
        message: `Server error ${error}`,
      };
    }
  }
}
export default OrderRepository;

import { Request, Response } from "express";
import path from "path";
import { IOrder } from "../interfaces/order";
import CourseRepository from "../repositories/course.repository";
import OrderRepository from "../repositories/order.repository";
import UserRepository from "../repositories/user.repository";

import sendMail from "../utils/sendMail";
import ejs from "ejs";

import dotenv from "dotenv";
import { redis } from "../utils/redis";
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// require("dotenv").config();

class OrderUsecase {
  private orderRepository: OrderRepository;
  private userRepository: UserRepository;
  private courseRepository: CourseRepository;
  constructor(
    orderRepository: OrderRepository,
    userRepository: UserRepository,
    courseRepository: CourseRepository
  ) {
    this.orderRepository = orderRepository;
    this.userRepository = userRepository;
    this.courseRepository = courseRepository;
  }

  async createOrder(req: Request, res: Response) {
    try {
      // console.log("order use case");
      // const dataRxd = req.body;
      // console.log(dataRxd);
      const { courseId, payment_info } = req.body;
      if (payment_info) {
        if ("id" in payment_info) {
          const paymentIntentId = payment_info.id;
          const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId
          );
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

      const id = req?.user?._id;
      const userDetails = await this.userRepository.findUser(id);
      const user = userDetails.data;
      //console.log(user);
      const courseExistInUser = user?.courses?.some(
        (course: any) => course._id.toString() === courseId
      );
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
      const courseDetails = await this.courseRepository.getSingleCourse(
        courseId
      );
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
      const data: any = {
        courseId: courseDetails?.course._id,
        price: courseDetails?.course.price,
        userId: user?._id,
        payment_info,
      };
      console.log(data);

      const response = await this.orderRepository.createOrder(data);
      if (response.order) {
        const mailData: any = {
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
        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/order-confirmation.ejs"),
          { order: mailData }
        );
        try {
          if (user) {
            await sendMail({
              email: user.email,
              subject: "Order Confirmation",
              template: "order-confirmation.ejs",
              data: mailData,
            });
          }
        } catch (error: any) {
          return {
            status: 500,
            data: {
              success: false,
              message: error.message,
            },
          };
        }
        user?.courses?.push(courseDetails?.course._id);
        await redis.set(req.user?._id, JSON.stringify(user));

        if (courseDetails.course.purchased) {
          courseDetails.course.purchased += 1;
        }
        await this.courseRepository.coursePurchaseUpdate(
          courseDetails.course._id
        );
        console.log(user?.courses);
        const userUpdate = await this.userRepository.userUpdate(
          user?._id,
          user?.courses
        );
        if (userUpdate.data) {
          const notificationData = {
            user: user?._id,
            title: "New Order",
            message: `You have a new order of ${courseDetails.course.name}`,
          };
          const notification = await this.orderRepository.saveNotification(
            notificationData
          );
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
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }

  //send stripe  publishable key
  async sendStripePublishableKey(req: Request, res: Response) {
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
  }

  //new payment

  async newPayment(req: Request, res: Response) {
    try {
      const myPayment = await stripe.paymentIntents.create({
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
    } catch (error: any) {
      return {
        status: 500,
        data: {
          success: false,
          message: `server error ${error.message}`,
        },
      };
    }
  }

  async getAllOrders(req: Request, res: Response) {
    try {
      const response = await this.orderRepository.getAllOrders();
      return {
        status: response.success ? 201 : 500,
        data: {
          success: response.success,
          message: response.message,
          orders: response.orders,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        data: {
          success: false,
          message: `server error ${error.message}`,
        },
      };
    }
  }

  async getOrderAnalytics(req: Request, res: Response) {
    try {
      const response = await this.orderRepository.getOrderAnalytics();
      return {
        status: response.success ? 201 : 500,
        data: {
          success: response.success,
          message: response.message,
          orders: response.orders,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        data: {
          success: false,
          message: `server error ${error.message}`,
        },
      };
    }
  }
  async getDashboardData(req: Request, res: Response) {
    try {
      const response = await this.orderRepository.getDashboardData();
      return {
        status: response.success ? 201 : 500,
        data: {
          success: response.success,
          message: response.message,
          data: response.data,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        data: {
          success: false,
          message: `server error ${error.message}`,
        },
      };
    }
  }

  async getInstructorMonthlyOrderAnalytics(req: Request, res: Response) {
    try {
      const instructorId = req?.user?._id;
      const response =
        await this.orderRepository.getInstructorMonthlyOrderAnalytics(
          instructorId
        );
      return {
        status: response.success ? 201 : 500,
        data: {
          success: response.success,
          message: response.message,
          data: response.data,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        data: {
          success: false,
          message: `server error ${error.message}`,
        },
      };
    }
  }
}
export default OrderUsecase;

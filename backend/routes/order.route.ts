import express, { Request, Response, NextFunction } from "express";
import UserRepository from "../repositories/user.repository";

//import StripePayments from "../utils/stripe.payment";
import CourseRepository from "../repositories/course.repository";
import OrderRepository from "../repositories/order.repository";
import OrderUsecase from "../usecases/order.usecase";
import OrderController from "../controllers/order.controller";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";

const userRepository = new UserRepository();
//const stripePayments = new StripePayments(userRepository);
const courseRepository = new CourseRepository();
const orderRepository = new OrderRepository();
const orderUsecase = new OrderUsecase(
  orderRepository,
  userRepository,
  courseRepository
);

const orderController = new OrderController(orderUsecase);

const orderRoute = express.Router();

orderRoute.post(
  "/create-order",
  isAuthenticated,
  (req: Request, res: Response) => {
    console.log("order route");
    orderController.createOrder(req, res);
  }
);

orderRoute.get(
  "/payment/stripepublishablekey",
  (req: Request, res: Response) => {
    orderController.sendStripePublishableKey(req, res);
  }
);

orderRoute.post("/payment", (req: Request, res: Response) => {
  orderController.newPayment(req, res);
});

orderRoute.get(
  "/get-allorders",
  isAuthenticated,
  authorizeRoles("admin"),
  (req: Request, res: Response) => {
    orderController.getAllOrders(req, res);
  }
);

orderRoute.get(
  "/get-order-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  (req: Request, res: Response) => {
    orderController.getOrderAnalytics(req, res);
  }
);

orderRoute.get(
  "/get-dashboarddata",
  isAuthenticated,
  authorizeRoles("admin"),
  (req: Request, res: Response) => {
    orderController.getDashboardData(req, res);
  }
);

orderRoute.get(
  "/get-instructordashboardanalytics",
  isAuthenticated,

  (req: Request, res: Response) => {
    orderController.getInstructorMontlyOrderAnalytics(req, res);
  }
);

export default orderRoute;

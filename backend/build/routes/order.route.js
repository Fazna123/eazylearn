"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
//import StripePayments from "../utils/stripe.payment";
const course_repository_1 = __importDefault(require("../repositories/course.repository"));
const order_repository_1 = __importDefault(require("../repositories/order.repository"));
const order_usecase_1 = __importDefault(require("../usecases/order.usecase"));
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
const auth_1 = require("../middlewares/auth");
const userRepository = new user_repository_1.default();
//const stripePayments = new StripePayments(userRepository);
const courseRepository = new course_repository_1.default();
const orderRepository = new order_repository_1.default();
const orderUsecase = new order_usecase_1.default(orderRepository, userRepository, courseRepository);
const orderController = new order_controller_1.default(orderUsecase);
const orderRoute = express_1.default.Router();
orderRoute.post("/create-order", auth_1.isAuthenticated, (req, res) => {
    console.log("order route");
    orderController.createOrder(req, res);
});
orderRoute.get("/payment/stripepublishablekey", (req, res) => {
    orderController.sendStripePublishableKey(req, res);
});
orderRoute.post("/payment", (req, res) => {
    orderController.newPayment(req, res);
});
orderRoute.get("/get-allorders", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), (req, res) => {
    orderController.getAllOrders(req, res);
});
orderRoute.get("/get-order-analytics", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), (req, res) => {
    orderController.getOrderAnalytics(req, res);
});
orderRoute.get("/get-dashboarddata", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), (req, res) => {
    orderController.getDashboardData(req, res);
});
orderRoute.get("/get-instructordashboardanalytics", auth_1.isAuthenticated, (req, res) => {
    orderController.getInstructorMontlyOrderAnalytics(req, res);
});
exports.default = orderRoute;

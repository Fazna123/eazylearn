import orderModel from "../models/order.model";
// import userModel from "../models/user.model";
//import CourseModel from "../models/course.model";
import IOrder from "../interfaces/order";
import notificationModel from "../models/notification.model";
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
}
export default OrderRepository;

import { Request, Response } from "express";

import OrderUsecase from "../usecases/order.usecase";

class OrderController {
  private orderUsecase: OrderUsecase;
  constructor(orderUsecase: OrderUsecase) {
    this.orderUsecase = orderUsecase;
  }

  async createOrder(req: Request, res: Response) {
    try {
      console.log("order cntrllr");
      const response = await this.orderUsecase.createOrder(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async sendStripePublishableKey(req: Request, res: Response) {
    try {
      console.log("order cntrllr");
      const response = await this.orderUsecase.sendStripePublishableKey(
        req,
        res
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async newPayment(req: Request, res: Response) {
    try {
      console.log("order cntrllr");
      const response = await this.orderUsecase.newPayment(req, res);
      return res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async getAllOrders(req: Request, res: Response) {
    try {
      const response = await this.orderUsecase.getAllOrders(req, res);
      return res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Server Error",
      });
    }
  }

  async getOrderAnalytics(req: Request, res: Response) {
    try {
      const response = await this.orderUsecase.getOrderAnalytics(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Server Error",
      });
    }
  }
  async getDashboardData(req: Request, res: Response) {
    try {
      const response = await this.orderUsecase.getDashboardData(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Server Error",
      });
    }
  }

  async getInstructorMontlyOrderAnalytics(req: Request, res: Response) {
    try {
      const response =
        await this.orderUsecase.getInstructorMonthlyOrderAnalytics(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Server Error",
      });
    }
  }
}
export default OrderController;

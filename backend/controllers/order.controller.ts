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
}
export default OrderController;

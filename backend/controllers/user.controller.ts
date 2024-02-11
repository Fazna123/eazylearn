import { Request, Response } from "express";
import UserUsecase from "../usecases/user.usecase";

class UserController {
  private userUsecase: UserUsecase;
  constructor(userUsecase: UserUsecase) {
    this.userUsecase = userUsecase;
  }

  async createUser(req: Request, res: Response) {
    try {
      //console.log("controller", req.body);
      const response = await this.userUsecase.createUser(req, res);
      if (response !== undefined)
        res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async activateUser(req: Request, res: Response) {
    try {
      //console.log("Activate user controller", req.body);
      const response = await this.userUsecase.activateUser(req, res);
      if (response !== undefined)
        res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.loginUser(req, res);
      if (response !== undefined) res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async logoutUser(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.logoutUser(req, res);
      if (response !== undefined) res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
}
export default UserController;

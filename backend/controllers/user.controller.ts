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
      console.log("Activate user controller", req.body);
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
      console.log("logout controller");
      console.log(req.cookies);
      const response = await this.userUsecase.logoutUser(req, res);
      if (response !== undefined) res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async googleLogin(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.googleLogin(req, res);
      if (response !== undefined) res.status(response).send(response);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async updateUserDetails(req: Request, res: Response) {
    try {
      console.log(req.body);
      const response = await this.userUsecase.updateUserDetails(
        req.body,
        req.user?.email as string
      );
      if (response !== undefined) {
        // const user = response.data.data;
        // res.status(status).json({
        //   success: true,
        //   user,
        // });
        res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  // async getUserInfo(req: Request, res: Response) {
  //   try {
  //     console.log("controller");
  //     const response = await this.userUsecase.getUserInfo(req, res);
  //     console.log("response in controller", response);
  //     if (response !== undefined) res.status(response.status).send(response);
  //   } catch (error) {
  //     res.status(500).send({
  //       success: false,
  //       message: "server error",
  //     });
  //   }
  // }
}
export default UserController;

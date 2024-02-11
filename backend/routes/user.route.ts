import express, { Request, Response } from "express";
import UserUsecase from "../usecases/user.usecase";
import UserController from "../controllers/user.controller";
import UserRepository from "../repositories/user.repository";

const userRoute = express.Router();

const userRepository = new UserRepository();
const userUsecase = new UserUsecase(userRepository);
const userController = new UserController(userUsecase);

// userRoute.post("/register", userController.createUser);

userRoute.post("/register", (req: Request, res: Response) => {
  userController.createUser(req, res);
});

userRoute.post("/activate-user", (req: Request, res: Response) => {
  userController.activateUser(req, res);
});

userRoute.post("/login", (req: Request, res: Response) => {
  userController.loginUser(req, res);
});

userRoute.get("/logout", (req: Request, res: Response) => {
  userController.logoutUser(req, res);
});

export default userRoute;

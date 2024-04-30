import express, { Request, Response } from "express";
import UserUsecase from "../usecases/user.usecase";
import UserController from "../controllers/user.controller";
import UserRepository from "../repositories/user.repository";
import { isAuthenticated } from "../middlewares/auth";

const userRoute = express.Router();

const userRepository = new UserRepository();
const userUsecase = new UserUsecase(userRepository);
const userController = new UserController(userUsecase);

userRoute.post("/register", (req: Request, res: Response) => {
  userController.createUser(req, res);
});

userRoute.post("/activate-user", (req: Request, res: Response) => {
  userController.activateUser(req, res);
});

userRoute.post("/login", (req: Request, res: Response) => {
  console.log("login");
  userController.loginUser(req, res);
});

userRoute.post("/google", (req: Request, res: Response) => {
  console.log("google route");
  userController.googleLogin(req, res);
});

userRoute.get("/logout", isAuthenticated, (req: Request, res: Response) => {
  userController.logoutUser(req, res);
});

userRoute.post("/resendotp", (req: Request, res: Response) => {
  console.log("resend otp route");
  userController.resendOtp(req, res);
});
userRoute.get("/me", isAuthenticated, (req: Request, res: Response) => {
  userController.getUserInfo(req, res);
});

userRoute.get("/refresh", (req: Request, res: Response) => {
  userController.updateAccessToken(req, res);
});

userRoute.put("/updateuser", isAuthenticated, (req: Request, res: Response) => {
  userController.updateUserDetails(req, res);
});

userRoute.get(
  "/get-instructors",
  isAuthenticated,
  (req: Request, res: Response) => {
    console.log("user route get instrtrs");
    userController.getInstructors(req, res);
  }
);

userRoute.put(
  "/approve-instructor/:id",
  isAuthenticated,
  (req: Request, res: Response) => {
    userController.approveInstructor(req, res);
  }
);

userRoute.get(
  "/get-students",
  isAuthenticated,
  (req: Request, res: Response) => {
    userController.getStudents(req, res);
  }
);

userRoute.delete(
  "/delete-user/:id",
  isAuthenticated,
  (req: Request, res: Response) => {
    userController.deleteUser(req, res);
  }
);

export default userRoute;

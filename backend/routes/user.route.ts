import express, { Request, Response } from "express";
import UserUsecase from "../usecases/user.usecase";
import UserController from "../controllers/user.controller";
import UserRepository from "../repositories/user.repository";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";

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
  console.log("logout user route");
  userController.logoutUser(req, res);
});

userRoute.post("/resendotp", (req: Request, res: Response) => {
  console.log("resend otp route");
  userController.resendOtp(req, res);
});
userRoute.get("/me", isAuthenticated, (req: Request, res: Response) => {
  userController.getUserInfo(req, res);
});

userRoute.get("/myinfo", isAuthenticated, (req: Request, res: Response) => {
  userController.getMyInfo(req, res);
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

userRoute.put(
  "/instructor/:id",
  isAuthenticated,
  (req: Request, res: Response) => {
    console.log("user role to instructor in route");
    userController.approveRoleInstructor(req, res);
  }
);

userRoute.put(
  "/changepassword",
  isAuthenticated,
  (req: Request, res: Response) => {
    userController.changePassword(req, res);
  }
);

userRoute.put(
  "/reject-user/:id",
  isAuthenticated,
  (req: Request, res: Response) => {
    userController.rejectInstructor(req, res);
  }
);

userRoute.get(
  "/get-instructors-approval",
  isAuthenticated,
  (req: Request, res: Response) => {
    console.log("user route get instrtrs");
    userController.getInstructorsApproval(req, res);
  }
);
userRoute.put(
  "/block-user/:id",
  isAuthenticated,
  (req: Request, res: Response) => {
    userController.blockUser(req, res);
  }
);

userRoute.put(
  "/unblock-user/:id",
  isAuthenticated,
  (req: Request, res: Response) => {
    userController.unBlockUser(req, res);
  }
);

userRoute.get(
  "/get-user-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  (req: Request, res: Response) => {
    userController.getUserAnalytics(req, res);
  }
);

userRoute.get(
  "/user-info/:id",
  isAuthenticated,
  (req: Request, res: Response) => {
    console.log("user dtails route");
    userController.getUserDetails(req, res);
  }
);

export default userRoute;

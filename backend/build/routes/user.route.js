"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_usecase_1 = __importDefault(require("../usecases/user.usecase"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const auth_1 = require("../middlewares/auth");
const userRoute = express_1.default.Router();
const userRepository = new user_repository_1.default();
const userUsecase = new user_usecase_1.default(userRepository);
const userController = new user_controller_1.default(userUsecase);
userRoute.post("/register", (req, res) => {
    userController.createUser(req, res);
});
userRoute.post("/activate-user", (req, res) => {
    userController.activateUser(req, res);
});
userRoute.post("/login", (req, res) => {
    console.log("login");
    userController.loginUser(req, res);
});
userRoute.post("/google", (req, res) => {
    console.log("google route");
    userController.googleLogin(req, res);
});
userRoute.get("/logout", auth_1.isAuthenticated, (req, res) => {
    console.log("logout user route");
    userController.logoutUser(req, res);
});
userRoute.post("/resendotp", (req, res) => {
    console.log("resend otp route");
    userController.resendOtp(req, res);
});
userRoute.get("/me", auth_1.isAuthenticated, (req, res) => {
    userController.getUserInfo(req, res);
});
userRoute.get("/myinfo", auth_1.isAuthenticated, (req, res) => {
    userController.getMyInfo(req, res);
});
userRoute.get("/refresh", (req, res) => {
    userController.updateAccessToken(req, res);
});
userRoute.put("/updateuser", auth_1.isAuthenticated, (req, res) => {
    userController.updateUserDetails(req, res);
});
userRoute.get("/get-instructors", auth_1.isAuthenticated, (req, res) => {
    console.log("user route get instrtrs");
    userController.getInstructors(req, res);
});
userRoute.put("/approve-instructor/:id", auth_1.isAuthenticated, (req, res) => {
    userController.approveInstructor(req, res);
});
userRoute.get("/get-students", auth_1.isAuthenticated, (req, res) => {
    userController.getStudents(req, res);
});
userRoute.delete("/delete-user/:id", auth_1.isAuthenticated, (req, res) => {
    userController.deleteUser(req, res);
});
userRoute.put("/instructor/:id", auth_1.isAuthenticated, (req, res) => {
    console.log("user role to instructor in route");
    userController.approveRoleInstructor(req, res);
});
userRoute.put("/changepassword", auth_1.isAuthenticated, (req, res) => {
    userController.changePassword(req, res);
});
userRoute.put("/reject-user/:id", auth_1.isAuthenticated, (req, res) => {
    userController.rejectInstructor(req, res);
});
userRoute.get("/get-instructors-approval", auth_1.isAuthenticated, (req, res) => {
    console.log("user route get instrtrs");
    userController.getInstructorsApproval(req, res);
});
userRoute.put("/block-user/:id", auth_1.isAuthenticated, (req, res) => {
    userController.blockUser(req, res);
});
userRoute.put("/unblock-user/:id", auth_1.isAuthenticated, (req, res) => {
    userController.unBlockUser(req, res);
});
userRoute.get("/get-user-analytics", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), (req, res) => {
    userController.getUserAnalytics(req, res);
});
userRoute.get("/user-info/:id", auth_1.isAuthenticated, (req, res) => {
    console.log("user dtails route");
    userController.getUserDetails(req, res);
});
exports.default = userRoute;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const course_repository_1 = __importDefault(require("../repositories/course.repository"));
const course_usecase_1 = __importDefault(require("../usecases/course.usecase"));
const course_controller_1 = __importDefault(require("../controllers/course.controller"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const order_repository_1 = __importDefault(require("../repositories/order.repository"));
const courseRoute = express_1.default.Router();
const courseRepository = new course_repository_1.default();
const userRepository = new user_repository_1.default();
const orderRepository = new order_repository_1.default();
const courseUsecase = new course_usecase_1.default(courseRepository, userRepository, orderRepository);
const courseController = new course_controller_1.default(courseUsecase);
courseRoute.post("/create-course", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("instructor"), (req, res) => {
    courseController.createCourse(req, res);
});
courseRoute.put("/edit-course/:id", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("instructor"), (req, res) => {
    courseController.editCourse(req, res);
});
courseRoute.get("/get-course/:id", (req, res) => {
    courseController.getSingleCourse(req, res);
});
//only selected datas are visible
courseRoute.get("/get-courses", (req, res) => {
    courseController.getAllCourse(req, res);
});
courseRoute.get("/get-approved-courses", auth_1.isAuthenticated, (req, res) => {
    courseController.getApprovedCourses(req, res);
});
courseRoute.get("/get-courses-approval", auth_1.isAuthenticated, (req, res) => {
    courseController.getCoursesToApprove(req, res);
});
//with searching,filtering and pageination
courseRoute.get("/get-courses-search", (req, res) => {
    courseController.getAllCourseSearch(req, res);
});
//all details will be visible
courseRoute.get("/get-allcourses", auth_1.isAuthenticated, (req, res) => {
    courseController.getAllCourseDetails(req, res);
});
courseRoute.get("/get-myteachings", auth_1.isAuthenticated, (req, res) => {
    courseController.myTeachings(req, res);
});
courseRoute.put("/approve-course/:id", auth_1.isAuthenticated, (req, res) => {
    courseController.approveCourse(req, res);
});
courseRoute.put("/reject-course/:id", auth_1.isAuthenticated, (req, res) => {
    courseController.rejectCourse(req, res);
});
courseRoute.delete("/delete-course/:id", auth_1.isAuthenticated, (req, res) => {
    courseController.deleteCourse(req, res);
});
courseRoute.put("/revoke-course/:id", auth_1.isAuthenticated, (req, res) => {
    courseController.revokeCourse(req, res);
});
courseRoute.post("/add-category", auth_1.isAuthenticated, (req, res) => {
    console.log("add categry route");
    courseController.addCategory(req, res);
});
courseRoute.get("/all-categories", (req, res) => {
    courseController.getCategories(req, res);
});
courseRoute.put("/update-category", auth_1.isAuthenticated, (req, res) => {
    console.log("update cat route");
    courseController.updateCategory(req, res);
});
courseRoute.delete("/delete-category/:id", auth_1.isAuthenticated, (req, res) => {
    courseController.deleteCategory(req, res);
});
courseRoute.get("/get-course-content/:id", auth_1.isAuthenticated, (req, res) => {
    courseController.getSingleCourseContent(req, res);
});
courseRoute.put("/add-question", auth_1.isAuthenticated, (req, res) => {
    courseController.addQuestion(req, res);
});
courseRoute.put("/add-answer", 
// authorizeRoles("instructor"),
auth_1.isAuthenticated, (req, res) => {
    courseController.addAnswer(req, res);
});
courseRoute.put("/add-review/:id", auth_1.isAuthenticated, (req, res) => {
    console.log("add review route");
    courseController.addReview(req, res);
});
courseRoute.put("/add-reply", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), (req, res) => {
    courseController.addReplyToReview(req, res);
});
courseRoute.get("/get-all-notifications", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), (req, res) => {
    courseController.getNotifications(req, res);
});
courseRoute.put("/update-notification/:id", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), (req, res) => {
    courseController.updateNotifications(req, res);
});
courseRoute.get("/get-deletedCourses", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), (req, res) => {
    courseController.deletedCourses(req, res);
});
courseRoute.get("/get-reportedcourses", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), (req, res) => {
    courseController.reportedCourses(req, res);
});
courseRoute.get("/get-course-analytics", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), (req, res) => {
    courseController.getCourseAnalytics(req, res);
});
courseRoute.get("/mycourses-user", auth_1.isAuthenticated, (req, res) => {
    courseController.getMyCourses(req, res);
});
courseRoute.post("/send-rejection-email", auth_1.isAuthenticated, (req, res) => {
    console.log("rejection route");
    courseController.sendRejectionEmail(req, res);
});
courseRoute.put("/add-report-reason/:id", auth_1.isAuthenticated, (req, res) => {
    courseController.addReportReason(req, res);
});
courseRoute.put("/edit-review/:id", auth_1.isAuthenticated, (req, res) => {
    courseController.editReview(req, res);
});
exports.default = courseRoute;

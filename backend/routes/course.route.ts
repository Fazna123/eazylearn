import express, { Request, Response } from "express";

import { authorizeRoles, isAuthenticated } from "../middlewares/auth";
import CourseRepository from "../repositories/course.repository";
import CourseUsecase from "../usecases/course.usecase";
import CourseController from "../controllers/course.controller";
import UserRepository from "../repositories/user.repository";
import OrderRepository from "../repositories/order.repository";

const courseRoute = express.Router();

const courseRepository = new CourseRepository();
const userRepository = new UserRepository();
const orderRepository = new OrderRepository();
const courseUsecase = new CourseUsecase(
  courseRepository,
  userRepository,
  orderRepository
);
const courseController = new CourseController(courseUsecase);

courseRoute.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("instructor"),
  (req: Request, res: Response) => {
    courseController.createCourse(req, res);
  }
);

courseRoute.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("instructor"),
  (req: Request, res: Response) => {
    courseController.editCourse(req, res);
  }
);

courseRoute.get("/get-course/:id", (req: Request, res: Response) => {
  courseController.getSingleCourse(req, res);
});

//only selected datas are visible
courseRoute.get("/get-courses", (req: Request, res: Response) => {
  courseController.getAllCourse(req, res);
});

courseRoute.get(
  "/get-approved-courses",
  isAuthenticated,
  (req: Request, res: Response) => {
    courseController.getApprovedCourses(req, res);
  }
);

courseRoute.get(
  "/get-courses-approval",
  isAuthenticated,
  (req: Request, res: Response) => {
    courseController.getCoursesToApprove(req, res);
  }
);

//with searching,filtering and pageination
courseRoute.get("/get-courses-search", (req: Request, res: Response) => {
  courseController.getAllCourseSearch(req, res);
});

//all details will be visible
courseRoute.get(
  "/get-allcourses",
  isAuthenticated,
  (req: Request, res: Response) => {
    courseController.getAllCourseDetails(req, res);
  }
);

courseRoute.get(
  "/get-myteachings",
  isAuthenticated,
  (req: Request, res: Response) => {
    courseController.myTeachings(req, res);
  }
);

courseRoute.put(
  "/approve-course/:id",
  isAuthenticated,
  (req: Request, res: Response) => {
    courseController.approveCourse(req, res);
  }
);

courseRoute.put(
  "/reject-course/:id",
  isAuthenticated,
  (req: Request, res: Response) => {
    courseController.rejectCourse(req, res);
  }
);

courseRoute.delete(
  "/delete-course/:id",
  isAuthenticated,
  (req: Request, res: Response) => {
    courseController.deleteCourse(req, res);
  }
);

courseRoute.put(
  "/revoke-course/:id",
  isAuthenticated,
  (req: Request, res: Response) => {
    courseController.revokeCourse(req, res);
  }
);

courseRoute.post(
  "/add-category",
  isAuthenticated,
  (req: Request, res: Response) => {
    console.log("add categry route");
    courseController.addCategory(req, res);
  }
);
courseRoute.get(
  "/all-categories",

  (req: Request, res: Response) => {
    courseController.getCategories(req, res);
  }
);

courseRoute.put(
  "/update-category",
  isAuthenticated,
  (req: Request, res: Response) => {
    console.log("update cat route");
    courseController.updateCategory(req, res);
  }
);

courseRoute.delete(
  "/delete-category/:id",
  isAuthenticated,
  (req: Request, res: Response) => {
    courseController.deleteCategory(req, res);
  }
);

courseRoute.get(
  "/get-course-content/:id",
  isAuthenticated,
  (req: Request, res: Response) => {
    courseController.getSingleCourseContent(req, res);
  }
);
courseRoute.put(
  "/add-question",
  isAuthenticated,
  (req: Request, res: Response) => {
    courseController.addQuestion(req, res);
  }
);

courseRoute.put(
  "/add-answer",
  // authorizeRoles("instructor"),
  isAuthenticated,
  (req: Request, res: Response) => {
    courseController.addAnswer(req, res);
  }
);

courseRoute.put(
  "/add-review/:id",
  isAuthenticated,
  (req: Request, res: Response) => {
    console.log("add review route");
    courseController.addReview(req, res);
  }
);

courseRoute.put(
  "/add-reply",
  isAuthenticated,
  authorizeRoles("admin"),
  (req: Request, res: Response) => {
    courseController.addReplyToReview(req, res);
  }
);

courseRoute.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  (req: Request, res: Response) => {
    courseController.getNotifications(req, res);
  }
);

courseRoute.put(
  "/update-notification/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  (req: Request, res: Response) => {
    courseController.updateNotifications(req, res);
  }
);

courseRoute.get(
  "/get-deletedCourses",
  isAuthenticated,
  authorizeRoles("admin"),
  (req: Request, res: Response) => {
    courseController.deletedCourses(req, res);
  }
);

courseRoute.get(
  "/get-course-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  (req: Request, res: Response) => {
    courseController.getCourseAnalytics(req, res);
  }
);

courseRoute.get(
  "/mycourses-user",
  isAuthenticated,
  (req: Request, res: Response) => {
    courseController.getMyCourses(req, res);
  }
);

courseRoute.post(
  "/send-rejection-email",
  isAuthenticated,
  (req: Request, res: Response) => {
    console.log("rejection route");
    courseController.sendRejectionEmail(req, res);
  }
);

export default courseRoute;

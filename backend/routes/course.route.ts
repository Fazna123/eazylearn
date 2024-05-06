import express, { Request, Response } from "express";

import { authorizeRoles, isAuthenticated } from "../middlewares/auth";
import CourseRepository from "../repositories/course.repository";
import CourseUsecase from "../usecases/course.usecase";
import CourseController from "../controllers/course.controller";
import UserRepository from "../repositories/user.repository";

const courseRoute = express.Router();

const courseRepository = new CourseRepository();
const userRepository = new UserRepository();
const courseUsecase = new CourseUsecase(courseRepository, userRepository);
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

courseRoute.get("/get-courses", (req: Request, res: Response) => {
  courseController.getAllCourse(req, res);
});

courseRoute.get("/get-allcourses", (req: Request, res: Response) => {
  courseController.getAllCourseDetails(req, res);
});

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

courseRoute.delete(
  "/delete-course/:id",
  isAuthenticated,
  (req: Request, res: Response) => {
    courseController.deleteCourse(req, res);
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
  isAuthenticated,
  (req: Request, res: Response) => {
    courseController.getCategories(req, res);
  }
);

courseRoute.put(
  "/update-category",

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

export default courseRoute;

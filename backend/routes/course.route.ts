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

export default courseRoute;

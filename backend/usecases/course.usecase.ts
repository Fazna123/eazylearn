import { ICourse } from "../interfaces/course";
import CourseRepository from "../repositories/course.repository";
import UserRepository from "../repositories/user.repository";

class CourseUsecase {
  private courseRepository: CourseRepository;
  private userRepository: UserRepository;
  constructor(
    courseRepository: CourseRepository,
    userRepository: UserRepository
  ) {
    this.courseRepository = courseRepository;
    this.userRepository = userRepository;
  }

  async createCourse(req: Request, res: Response) {
    try {
      const data = req.body;
      const response = await this.courseRepository.createCourse(data);
      if (response.course) {
        return {
          status: response.success ? 200 : 500,
          data: {
            success: response.success,
            message: response.message,
            course: response.course,
          },
        };
      }
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }

  async editCourse(req: Request, res: Response) {
    try {
      const data = req.body;
      const courseId = req.params.id;
      const response = await this.courseRepository.editCourse(courseId, data);
      if (response.course) {
        return {
          status: response.success ? 200 : 500,
          data: {
            success: response.success,
            message: response.message,
            course: response.course,
          },
        };
      }
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }

  async getSingleCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.id;
      const response = await this.courseRepository.getSingleCourse(courseId);
      if (response.course) {
        return {
          status: response.success ? 200 : 500,
          data: {
            success: response.success,
            message: response.message,
            course: response.course,
          },
        };
      }
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
}

export default CourseUsecase;

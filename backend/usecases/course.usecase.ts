import ICategory from "../interfaces/category";
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
      if (data) {
        const courseData = data as unknown as ICourse;
        courseData.instructor = req.user?._id || "";
        const response = await this.courseRepository.createCourse(courseData);
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
  async getAllCourse(req: Request, res: Response) {
    try {
      //const courseId = req.params.id;
      const response = await this.courseRepository.getAllCourse();
      if (response.courses) {
        return {
          status: response.success ? 200 : 500,
          data: {
            success: response.success,
            message: response.message,
            courses: response.courses,
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
  async myTeachings(req: Request, res: Response) {
    try {
      console.log("myteachings usecase");
      const userId = req.user?._id || "";
      console.log("userid:", userId);
      const response = await this.courseRepository.myTeachings(userId);
      if (response.courses) {
        console.log(response.courses);
        return {
          status: response.success ? 200 : 500,
          data: {
            success: response.success,
            message: response.message,
            courses: response.courses,
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
  async approveCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.id;
      const response = await this.courseRepository.approveCourse(courseId);
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
  async deleteCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.id;
      const response = await this.courseRepository.deleteCourse(courseId);
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
  async getAllCourseDetails(req: Request, res: Response) {
    try {
      //const courseId = req.params.id;
      const response = await this.courseRepository.getAllCourseDetails();
      if (response.courses) {
        return {
          status: response.success ? 200 : 500,
          data: {
            success: response.success,
            message: response.message,
            courses: response.courses,
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

  async addCategory(data: ICategory) {
    try {
      let { name } = data;
      name = name.toLowerCase();
      const categoryExist = await this.courseRepository.findCategory(name);
      if (categoryExist.success) {
        return {
          status: 404,
          data: {
            success: false,
            message: "Category Exist",
          },
        };
      }
      const res = await this.courseRepository.createCategory({ name });
      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
        },
      };
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
  async getCategories(query: any) {
    try {
      const { search } = query;
      const res = await this.courseRepository.getCategories(search);
      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
          categories: res.categories,
        },
      };
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
  async updateCategory(req: Request, res: Response) {
    try {
      console.log("update cat usecase");
      console.log("req.body", req.body);
      let { id, name } = req.body;
      name = name.toLowerCase();
      const categories = req.body;

      const res = await this.courseRepository.updateCategory(id, name);
      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
        },
      };
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
  async deleteCategory(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const res = await this.courseRepository.deleteCategory(id);
      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
        },
      };
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

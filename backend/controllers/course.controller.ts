import { Request, Response } from "express";
import CourseUsecase from "../usecases/course.usecase";

class CourseController {
  private courseUsecase: CourseUsecase;
  constructor(courseUsecase: CourseUsecase) {
    this.courseUsecase = courseUsecase;
  }

  async createCourse(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.createCourse(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async editCourse(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.editCourse(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async getSingleCourse(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.getSingleCourse(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async getSingleCourseContent(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.getSingleCourseContent(
        req,
        res
      );
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async getAllCourse(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.getAllCourse(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async getApprovedCourses(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.getApprovedCourses(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async getCoursesToApprove(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.getCoursesToApprove(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async getAllCourseSearch(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.getAllCourseSearch(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async myTeachings(req: Request, res: Response) {
    try {
      console.log("my teachings controller");
      const response = await this.courseUsecase.myTeachings(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async approveCourse(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.approveCourse(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async rejectCourse(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.rejectCourse(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async deleteCourse(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.deleteCourse(req, res);
      if (response !== undefined) {
        res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async revokeCourse(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.revokeCourse(req, res);
      if (response !== undefined) {
        res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async getAllCourseDetails(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.getAllCourseDetails(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async deletedCourses(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.deletedCourses(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async reportedCourses(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.reportedCourses(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async addCategory(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.addCategory(req.body);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async getCategories(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.getCategories(req.query);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async updateCategory(req: Request, res: Response) {
    try {
      console.log("update cat cntrller");
      const response = await this.courseUsecase.updateCategory(req, res);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async deleteCategory(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.deleteCategory(req, res);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async addQuestion(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.addQuestion(req, res);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async addAnswer(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.addAnswer(req, res);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async addReview(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.addReview(req, res);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async addReplyToReview(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.addReplyToReview(req, res);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async getNotifications(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.getNotifications(req, res);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async updateNotifications(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.updateNotifications(req, res);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async getCourseAnalytics(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.getCourseAnalytics(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Server Error",
      });
    }
  }

  async getMyCourses(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.getMyCourses(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Server Error",
      });
    }
  }

  async sendRejectionEmail(req: Request, res: Response) {
    try {
      console.log("rejctn cntrllr");
      const response = await this.courseUsecase.sendRejectionMail(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Server Error",
      });
    }
  }

  async addReportReason(req: Request, res: Response) {
    try {
      //console.log("rejctn cntrllr");
      const response = await this.courseUsecase.addReportReason(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Server Error",
      });
    }
  }

  async editReview(req: Request, res: Response) {
    try {
      //console.log("rejctn cntrllr");
      const response = await this.courseUsecase.editReview(req, res);
      if (response !== undefined) {
        return res.status(response.status).send(response.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Server Error",
      });
    }
  }
}

export default CourseController;

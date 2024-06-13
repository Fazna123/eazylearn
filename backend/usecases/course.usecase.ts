import { Request, Response } from "express";
import mongoose from "mongoose";
import ICategory from "../interfaces/category";
import { ICourse } from "../interfaces/course";
import IAddQuestionData from "../interfaces/question";
import CourseRepository from "../repositories/course.repository";
import UserRepository from "../repositories/user.repository";
import OrderRepository from "../repositories/order.repository";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import { IAddReviewData, IAddReviewReply } from "../interfaces/review";
import cron from "node-cron";
import EmailOptions from "../interfaces/email";
import nodemailer, { Transporter } from "nodemailer";

class CourseUsecase {
  private courseRepository: CourseRepository;
  private userRepository: UserRepository;
  private orderRepository: OrderRepository;
  constructor(
    courseRepository: CourseRepository,
    userRepository: UserRepository,
    orderRepository: OrderRepository
  ) {
    this.courseRepository = courseRepository;
    this.userRepository = userRepository;
    this.orderRepository = orderRepository;
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
  async getSingleCourseContent(req: Request, res: Response) {
    try {
      const courseId = req.params.id;
      const userCourseList = req.user?.courses;

      const courseExists = userCourseList?.find(
        (course: any) => course._id.toString() === courseId
      );
      if (!courseExists) {
        return {
          status: 404,
          data: {
            success: false,
            message: "You are not eligible to access this course",
          },
        };
      }
      const response = await this.courseRepository.getSingleCourseContent(
        courseId
      );
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

  async getApprovedCourses(req: Request, res: Response) {
    try {
      //const courseId = req.params.id;
      const response = await this.courseRepository.getApprovedCourses();
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

  async getCoursesToApprove(req: Request, res: Response) {
    try {
      //const courseId = req.params.id;
      const response = await this.courseRepository.getCoursesToApprove();
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

  async getAllCourseSearch(req: Request, res: Response) {
    try {
      const {
        search = "",
        category = "All",
        page = "1",
        pageSize = "10",
      } = req.query;
      const response = await this.courseRepository.getAllCourseSearch({
        search: search.toString(),
        category: category.toString(),
        page: parseInt(page as string, 10) || 1,
        pageSize: parseInt(pageSize as string, 10) || 10,
      });
      if (response.courses) {
        return {
          status: response.success ? 200 : 500,
          data: {
            success: response.success,
            message: response.message,
            courses: response.courses,
            totalCourses: response.totalCourses,
            currentPage: response.currentPage,
            totalPages: response.totalPages,
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
  async rejectCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.id;
      const response = await this.courseRepository.rejectCourse(courseId);
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
  async revokeCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.id;
      const response = await this.courseRepository.revokeCourse(courseId);
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

  async deletedCourses(req: Request, res: Response) {
    try {
      //const courseId = req.params.id;
      const response = await this.courseRepository.deletedCourses();
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
  async addQuestion(req: Request, res: Response) {
    try {
      const { question, courseId, contentId }: IAddQuestionData = req.body;
      const courseDetails = await this.courseRepository.getSingleCourseContent(
        courseId
      );
      const course = courseDetails.course;
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return {
          status: 400,
          data: {
            success: false,
            message: "Invalid Content Id",
          },
        };
      }
      const courseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );
      const newQuestion: any = {
        user: req?.user,
        question,
        questionReplies: [],
      };
      //courseContent?.questions.push(newQuestion);
      const res = await this.courseRepository.addQuestion(
        courseId,
        courseContent?._id,
        newQuestion
      );

      if (res) {
        const notificationData = {
          user: req.user?._id,
          title: "New Question Recieved",
          message: `You have a new question in ${courseContent?.title} of ${res.course?.name}`,
        };
        const notification = await this.orderRepository.saveNotification(
          notificationData
        );
      }

      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
          course: res.course,
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

  async addAnswer(req: Request, res: Response) {
    try {
      const { answer, courseId, contentId, questionId } = req.body;
      const courseDetails = await this.courseRepository.getSingleCourseContent(
        courseId
      );
      const course = courseDetails.course;
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return {
          status: 400,
          data: {
            success: false,
            message: "Invalid Content Id",
          },
        };
      }
      const courseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );

      const question = courseContent?.questions?.find((item: any) =>
        item._id.equals(questionId)
      );
      if (!question) {
        return {
          status: 400,
          data: {
            success: false,
            message: "Invalid question Id",
          },
        };
      }
      const newAnswer = {
        user: req.user,
        answer,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // question.questionReplies?.push(newAnswer);
      // await course?.save()
      const res = await this.courseRepository.addAnswer(
        course?._id,
        courseContent?._id,
        question._id,
        newAnswer
      );
      if (req.user?._id === question.user._id) {
        const notificationData = {
          user: req.user?._id,
          title: "New Question Reply Recieved",
          message: `You have a new question reply in ${courseContent?.title} of ${res.course?.name}`,
        };
        const notification = await this.orderRepository.saveNotification(
          notificationData
        );
      } else {
        const dataMail: any = {
          name: question.user.name,
          title: courseContent?.title,
        };
        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/question-reply.ejs"),
          dataMail
        );
        try {
          await sendMail({
            email: question.user.email,
            subject: "Question Reply",
            template: "question-reply.ejs",
            data: dataMail,
          });
        } catch (error) {
          return {
            status: 500,
            data: {
              success: false,
              message: `Failed to send the mail ${error}`,
            },
          };
        }
      }
      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
          course: res.course,
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

  async addReview(req: Request, res: Response) {
    try {
      console.log("rev usecase");
      const courseId = req.params.id;
      console.log(courseId);
      const { review, rating, userId } = req.body as IAddReviewData;
      //const user = await this.userRepository.findUser(userId);
      const courses = req?.user?.courses;
      const courseExists = courses?.some(
        (course: any) => course._id.toString() === courseId.toString()
      );
      if (!courseExists) {
        return {
          status: 404,
          data: {
            success: false,
            message: "You are not eligible to access this course",
          },
        };
      }
      const reviewData: any = {
        user: req?.user,
        comment: review,
        rating,
      };
      const res = await this.courseRepository.updateCourseRatings(
        courseId,
        reviewData
      );

      const courseDetails = await this.courseRepository.getSingleCourseContent(
        courseId
      );

      const notificationData = {
        user: req?.user?._id,
        title: "New Review Recieved",
        message: `${req?.user?.name} has given a review in ${courseDetails?.course?.name}`,
      };
      const notification = await this.orderRepository.saveNotification(
        notificationData
      );
      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
          course: res.course,
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

  //add reply to review
  async addReplyToReview(req: Request, res: Response) {
    try {
      const { comment, courseId, reviewId } = req.body as IAddReviewReply;
      const courseDetails = await this.courseRepository.getSingleCourseContent(
        courseId
      );
      if (!courseDetails.course) {
        return {
          status: 404,
          data: {
            success: false,
            message: "Course Not Found",
          },
        };
      }
      const review = courseDetails.course.reviews?.find(
        (rev: any) => rev._id.toString() === reviewId
      );
      if (!review) {
        return {
          status: 404,
          data: {
            success: false,
            message: "Review Not Found",
          },
        };
      }
      const replyData: any = {
        user: req.user,
        comment,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (!review.commentReplies) {
        review.commentReplies = [];
      }
      review?.commentReplies?.push(replyData);
      const res = await this.courseRepository.updateReplyToReview(
        courseId,
        review
      );
      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
          course: res.course,
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

  async getNotifications(req: Request, res: Response) {
    try {
      const res = await this.courseRepository.getNotifications();
      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
          notifications: res.notifications,
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

  async updateNotifications(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const res = await this.courseRepository.updateNotificationStatus(id);
      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
          notifications: res.notifications,
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
  async getCourseAnalytics(req: Request, res: Response) {
    try {
      const response = await this.courseRepository.getCourseAnalytics();
      return {
        status: response.success ? 201 : 500,
        data: {
          success: response.success,
          message: response.message,
          courses: response.courses,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        data: {
          success: false,
          message: `server error ${error.message}`,
        },
      };
    }
  }

  async getMyCourses(req: Request, res: Response) {
    try {
      const userId = req?.user?._id;
      const response = await this.courseRepository.getMyCourses(userId);
      return {
        status: response.success ? 201 : 500,
        data: {
          success: response.success,
          message: response.message,
          courses: response.courses,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        data: {
          success: false,
          message: `server error ${error.message}`,
        },
      };
    }
  }

  async sendRejectionMail(req: Request, res: Response) {
    try {
      //console.log("Rejection use case");
      //console.log("Request body:", req.body);
      const { email, courseName, reason } = req.body;
      const mailData = {
        courseName,
        reason,
        year: new Date().getFullYear(),
      };

      try {
        await this.sendMail({
          email: email,
          subject: "Course Rejection Notification",
          template: "rejectionMail.ejs",
          data: mailData,
        });

        res.status(201).json({
          success: true,
          message: "Mail sent successfully",
        });
      } catch (error: any) {
        console.error("Error sending mail:", error.message);
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    } catch (error: any) {
      console.error("Server error:", error.message);
      res.status(500).json({
        success: false,
        message: `Server error: ${error.message}`,
      });
    }
  }

  async sendMail(options: any): Promise<void> {
    const transporter: Transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    //console.log("send Mail");
    const { email, subject, template, data } = options;
    //console.log(options);

    const templatePath = path.join(__dirname, "../mails", template);
    //console.log(templatePath);

    const html: string = await ejs.renderFile(templatePath, data);

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  }
}

export default CourseUsecase;

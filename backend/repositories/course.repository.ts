import ICategory from "../interfaces/category";
import { ICourse } from "../interfaces/course";
import categoryModel from "../models/category.model";
import CourseModel from "../models/course.model";
import notificationModel from "../models/notification.model";

class CourseRepository {
  async createCourse(data: ICourse) {
    try {
      console.log(data);
      const course = await CourseModel.create(data);
      if (!course) {
        return {
          success: false,
          message: "Failed to create course",
        };
      }
      return {
        success: true,
        message: "Course created",
        course,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }

  async editCourse(courseId: string, details: ICourse) {
    try {
      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        {
          $set: details,
        },
        { new: true }
      );
      if (!course) {
        return {
          success: false,
          message: "Failed to update course",
        };
      }
      return {
        success: true,
        message: "Course updated",
        course,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }

  async getSingleCourse(courseId: string) {
    try {
      const course = await CourseModel.findById(courseId, {
        isBlock: false,
      }).select(
        "-courseData.videoUrl -courseData.sugession -courseData.questions -courseData.links"
      );
      if (!course) {
        return {
          success: false,
          message: "Failed to fetch course",
        };
      }
      return {
        success: true,
        message: "Course details fetched successfully",
        course,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }

  async getSingleCourseContent(courseId: string) {
    try {
      const course = await CourseModel.findById(courseId, {
        isBlock: false,
      });
      if (!course) {
        return {
          success: false,
          message: "Failed to fetch course",
        };
      }
      return {
        success: true,
        message: "Course details fetched successfully",
        course,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async getAllCourse() {
    try {
      const courses = await CourseModel.find({ isBlock: false }).select(
        "-courseData.videoUrl -courseData.sugession -courseData.questions -courseData.links"
      );
      if (!courses) {
        return {
          success: false,
          message: "Failed to fetch course",
        };
      }
      return {
        success: true,
        message: "Course details fetched successfully",
        courses,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async myTeachings(userId: string) {
    try {
      const courses = await CourseModel.find({
        instructor: userId,
        isBlock: false,
      });
      if (!courses) {
        return {
          success: false,
          message: "Failed to fetch course",
        };
      }
      return {
        success: true,
        message: "Course details fetched successfully",
        courses,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async approveCourse(courseId: string) {
    try {
      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        { isApproved: true },
        { new: true }
      );
      if (!course) {
        return {
          success: false,
          message: "Failed to approve course",
        };
      }
      return {
        success: true,
        message: "Course approved successfully",
        course,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to approve ${error}`,
      };
    }
  }
  async deleteCourse(courseId: string) {
    try {
      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        { isBlock: true },
        { new: true }
      );

      if (!course) {
        return {
          success: false,
          message: "Failed to delete course",
        };
      }
      return {
        success: true,
        message: "Course deleted successfully",
        course,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to delete course ${error}`,
      };
    }
  }
  async getAllCourseDetails() {
    try {
      const courses = await CourseModel.find();
      if (!courses) {
        return {
          success: false,
          message: "Failed to fetch course",
        };
      }
      return {
        success: true,
        message: "Course details fetched successfully",
        courses,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }

  async createCategory(data: ICategory) {
    try {
      const category = await categoryModel.create(data);
      if (!category) {
        return {
          success: false,
          message: `server error`,
        };
      }
      return {
        success: true,
        message: "Category Added",
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async findCategory(name: string) {
    try {
      const category = await categoryModel.findOne({ name });
      if (!category) {
        return {
          success: false,
          message: `server error`,
        };
      }
      return {
        success: true,
        message: "Category found",
        category,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async getCategories(regex: string) {
    try {
      const categories = regex
        ? await categoryModel.find({ name: { $regex: regex, $options: "i" } })
        : await categoryModel.find();

      return {
        success: true,
        message: "Fetch all caetgories",
        categories,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async updateCategory(id: string, name: string) {
    try {
      //console.log(categories);
      const updated = await categoryModel.findByIdAndUpdate(
        id,
        { name },
        {
          new: true,
        }
      );
      // for (const category of categories) {
      //   await categoryModel.findByIdAndUpdate(category._id, {
      //     title: category.title,
      //   });
      // }
      if (!updated) {
        return {
          success: false,
          message: "Unable to update right now",
        };
      }
      return {
        success: true,
        message: "Updated the Categories",
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async deleteCategory(id: string) {
    try {
      //console.log(categories);
      const updated = await categoryModel.findByIdAndDelete(
        id,

        {
          new: true,
        }
      );
      // for (const category of categories) {
      //   await categoryModel.findByIdAndUpdate(category._id, {
      //     title: category.title,
      //   });
      // }
      if (!updated) {
        return {
          success: false,
          message: "Unable to delete right now",
        };
      }
      return {
        success: true,
        message: "Deleted the Categories",
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to delete ${error}`,
      };
    }
  }
  async coursePurchaseUpdate(id: string) {
    try {
      const courses = await CourseModel.findByIdAndUpdate(
        id,
        { $inc: { purchased: 1 } },
        { new: true }
      );
      console.log(courses);
      if (!courses) {
        return {
          success: false,
          message: "Failed to fetch course",
        };
      }
      return {
        success: true,
        message: "Course details fetched successfully",
        courses,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async addQuestion(courseId: string, contentId: string, newQuestion: object) {
    try {
      const course = await CourseModel.findOneAndUpdate(
        {
          _id: courseId,
          "courseData._id": contentId, // Match the courseId and contentId
        },
        {
          $push: {
            "courseData.$.questions": newQuestion, // Push the new question into the 'questions' array of the matched content
          },
        },
        {
          new: true,
        }
      );

      if (!course) {
        return {
          success: false,
          message: "Failed to find course or content",
        };
      }

      return {
        success: true,
        message: "Question added successfully",
        course,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to add question: ${error}`,
      };
    }
  }

  async addAnswer(
    courseId: string,
    contentId: string,
    questionId: string,
    answer: any
  ) {
    try {
      const course = await CourseModel.findOneAndUpdate(
        {
          _id: courseId,
          "courseData._id": contentId,
          "courseData.questions._id": questionId,
        },
        {
          $push: {
            "courseData.$[content].questions.$[question].questionReplies":
              answer,
          },
        },
        {
          new: true,
          arrayFilters: [
            { "content._id": contentId },
            { "question._id": questionId },
          ],
        }
      );

      if (!course) {
        return {
          success: false,
          message: "Failed to find course or content or question",
        };
      }

      return {
        success: true,
        message: "Answer added successfully",
        course,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to add answer: ${error}`,
      };
    }
  }
  async updateCourseRatings(courseId: string, reviewData: any) {
    try {
      const course = await CourseModel.findById(courseId);

      const reviews = course?.reviews ?? [];

      reviews.push(reviewData);

      let avg = 0;
      reviews.forEach((rev: any) => {
        avg += rev.rating;
      });

      if (course) {
        course.ratings = avg / reviews.length;
      }

      await course?.save();
      return {
        success: true,
        message: "Review added successfully",
        course,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to add review: ${error}`,
      };
    }
  }

  async updateReplyToReview(courseId: any, review: any) {
    try {
      const updatedCourse = await CourseModel.findByIdAndUpdate(
        courseId,
        { $set: { "reviews.$[review]": review } },
        { new: true, arrayFilters: [{ "review._id": review._id }] }
      );

      return {
        success: true,
        message: "Reply to review added successfully",
        course: updatedCourse,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to add reply to review: ${error}`,
      };
    }
  }
  async getNotifications() {
    try {
      const notifications = await notificationModel
        .find()
        .sort({ createdAt: -1 });
      return {
        success: true,
        message: "Notifications fetched successfully",
        notifications: notifications,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch notifications: ${error}`,
      };
    }
  }

  async updateNotificationStatus(id: string) {
    try {
      const notification = await notificationModel.findByIdAndUpdate(id, {
        status: "read",
      });
      if (!notification) {
        return {
          success: false,
          message: `Failed to update notifications`,
        };
      }
      const notifications = await notificationModel
        .find()
        .sort({ createdAt: -1 });
      return {
        success: true,
        message: "Notifications updated successfully",
        notifications: notifications,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to update notifications: ${error}`,
      };
    }
  }
}

export default CourseRepository;

// async addQuestion(courseId, courseContent) {
//   try {
//     // Update the course document by pushing the new question into the specified content's 'questions' array
//     const course = await CourseModel.findByIdAndUpdate(
//       courseId,
//       {
//         $push: { "courseData.$[content].questions": courseContent.questions },
//       },
//       {
//         new: true,
//         arrayFilters: [{ "content._id": courseContent._id }], // Filter to match the specified contentId
//       }
//     );

//     if (!course) {
//       return {
//         success: false,
//         message: "Failed to find course",
//       };
//     }

//     return {
//       success: true,
//       message: "Question added successfully",
//       course,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: `Failed to add question: ${error}`,
//     };
//   }
// }

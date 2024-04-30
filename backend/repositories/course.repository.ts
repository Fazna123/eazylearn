import { ICourse } from "../interfaces/course";
import CourseModel from "../models/course.model";

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
      const course = await CourseModel.findById(courseId).select(
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
  async getAllCourse() {
    try {
      const courses = await CourseModel.find().select(
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
      const courses = await CourseModel.find({ instructor: userId });
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
      const course = await CourseModel.findByIdAndDelete(courseId);

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
}

export default CourseRepository;

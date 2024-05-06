import ICategory from "../interfaces/category";
import { ICourse } from "../interfaces/course";
import categoryModel from "../models/category.model";
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
}

export default CourseRepository;

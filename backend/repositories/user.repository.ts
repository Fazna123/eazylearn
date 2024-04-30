import Users from "../models/user.model";
//import { UserRole } from "../enums/UserRole.enum";
//import { IUser } from "../interfaces/user";
import IUserRegistrationBody from "../interfaces/userBody";
import ILoginRequest from "../interfaces/login";
import { ObjectId } from "mongoose";
import userModel from "../models/user.model";

class UserRepository {
  async checkExistUser(email: string) {
    try {
      //console.log("authenticate user in repo");
      const userDetails = await Users.findOne({ email: email });
      //console.log(userDetails);
      if (!userDetails) {
        return {
          success: true,
          message: "No user found",
        };
      }
      return {
        success: true,
        message: "user details fetched",
        data: userDetails,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }

  async createUser(details: IUserRegistrationBody) {
    try {
      const userDetails = await Users.create(details);
      if (!userDetails) {
        return {
          success: false,
          message: "user details not stored",
        };
      }
      return {
        success: true,
        message: "user created",
        data: {
          id: userDetails._id,
          email: userDetails.email,
          role: userDetails.role,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }

  async authenticateUser(details: ILoginRequest) {
    try {
      const { email, password } = details;
      const user = await Users.findOne({ email }).select("+password");
      if (!user) {
        return {
          success: true,
          message: "No user found",
        };
      }

      const isPasswordMatch = await user.comparePassword(password);

      if (!isPasswordMatch) {
        return {
          success: false,
          message: "Invalid Credentials",
        };
      }

      return {
        success: true,
        message: "User authenticated",
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to verify password, server error",
      };
    }
  }

  async updateUserDetails(userId: string, updates: IUserRegistrationBody) {
    try {
      const userDetails = await Users.findByIdAndUpdate(userId, updates, {
        new: true,
      });
      if (!userDetails) {
        return {
          success: false,
          message: "No user found",
        };
      }
      return {
        success: true,
        message: "user details updated",
        data: userDetails,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to update ${error}`,
      };
    }
  }

  async getUser(email: string) {
    try {
      console.log("email at repo", email);
      const userDetails = await Users.findOne({ email });
      console.log(userDetails);
      if (!userDetails) {
        return {
          success: false,
          message: "user details not stored",
        };
      }
      return {
        success: true,
        message: "user created",
        data: userDetails,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }

  async getInstructors() {
    try {
      console.log("user repo get instrtrs");
      const instructors = await Users.find({ role: "instructor" });
      console.log(instructors);
      if (!instructors) {
        return {
          success: false,
          message: "Instructor details not fetched",
        };
      }
      return {
        success: true,
        message: "Instructor List fetched",
        instructors,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch instructors ${error}`,
      };
    }
  }
  async approveInstructor(userId: string) {
    try {
      const user = await userModel.findByIdAndUpdate(
        userId,
        { isApproved: true },
        { new: true }
      );
      if (!user) {
        return {
          success: false,
          message: "Failed to approve course",
        };
      }
      return {
        success: true,
        message: "Course approved successfully",
        user,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to approve ${error}`,
      };
    }
  }
  async getStudents() {
    try {
      const students = await userModel.find({ role: "student" });
      console.log("studnts:", students);
      if (!students) {
        return {
          success: false,
          message: "Students details not fetched",
        };
      }
      return {
        success: true,
        message: "Students List fetched",
        students,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch students ${error}`,
      };
    }
  }
  async deleteUser(userId: string) {
    try {
      console.log("delte user repo");
      const user = await userModel.findByIdAndDelete(userId);
      console.log("user in repo delete", user);
      if (!user) {
        return {
          success: false,
          message: "Failed to delete user",
        };
      }
      return {
        success: true,
        message: "User deleted successfully",
        user,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to delete user ${error}`,
      };
    }
  }
}

export default UserRepository;

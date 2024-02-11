import Users from "../models/user.model";
//import { UserRole } from "../enums/UserRole.enum";
//import { IUser } from "../interfaces/user";
import IUserRegistrationBody from "../interfaces/userBody";
import ILoginRequest from "../interfaces/login";

class UserRepository {
  async checkExistUser(email: string) {
    try {
      console.log("authenticate user in repo");
      const userDetails = await Users.findOne({ email: email });
      console.log(userDetails);
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
      //console.log("fetching user details");
      const { email, password } = details;
      const user = await Users.findOne({ email }).select("+password");
      //console.log(user);
      if (!user) {
        return {
          success: true,
          message: "No user found",
        };
      }
      //console.log("checking password match");
      //console.log(password);
      //console.log(typeof password);
      const isPasswordMatch = await user.comparePassword(password);
      //console.log("ispasswordmatch?", isPasswordMatch);
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
}

export default UserRepository;

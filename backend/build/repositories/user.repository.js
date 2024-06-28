"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const user_model_2 = __importDefault(require("../models/user.model"));
const analytics_generator_1 = require("../utils/analytics.generator");
class UserRepository {
    checkExistUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log("authenticate user in repo");
                const userDetails = yield user_model_1.default.findOne({ email: email });
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
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch ${error}`,
                };
            }
        });
    }
    createUser(details) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = yield user_model_1.default.create(details);
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
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch ${error}`,
                };
            }
        });
    }
    authenticateUser(details) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = details;
                const user = yield user_model_1.default.findOne({ email, isBlock: false }).select("+password");
                if (!user) {
                    return {
                        success: true,
                        message: "No user found",
                    };
                }
                const isPasswordMatch = yield user.comparePassword(password);
                if (!isPasswordMatch) {
                    return {
                        success: false,
                        message: "Invalid Old Password",
                    };
                }
                return {
                    success: true,
                    message: "User authenticated",
                    data: user,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "Failed to verify password, server error",
                };
            }
        });
    }
    updateUserDetails(userId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = yield user_model_1.default.findByIdAndUpdate(userId, updates, {
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
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to update ${error}`,
                };
            }
        });
    }
    getUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("email at repo", email);
                const userDetails = yield user_model_1.default.findOne({ email });
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
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch ${error}`,
                };
            }
        });
    }
    getInstructors() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instructors = yield user_model_1.default.find({
                    role: "instructor",
                    isApproved: true,
                }).sort({ createdAt: -1 });
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
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch instructors ${error}`,
                };
            }
        });
    }
    getInstructorsApproval() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instructors = yield user_model_1.default.find({
                    role: "instructor",
                    isApproved: false,
                });
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
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch instructors ${error}`,
                };
            }
        });
    }
    approveInstructor(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_2.default.findByIdAndUpdate(userId, { isApproved: true, isRejected: false }, { new: true });
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
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to approve ${error}`,
                };
            }
        });
    }
    getStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield user_model_2.default
                    .find({ role: "student" })
                    .sort({ createdAt: -1 });
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
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch students ${error}`,
                };
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("delte user repo");
                const user = yield user_model_2.default.findByIdAndDelete(userId);
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
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to delete user ${error}`,
                };
            }
        });
    }
    approveRoleInstructor(userId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log("updates:", updates);
                const user = yield user_model_2.default.findByIdAndUpdate(userId, {
                    role: "instructor",
                    isApproved: false,
                    isRejected: false,
                    verification: updates,
                }, { new: true });
                //console.log("user", user);
                if (!user) {
                    return {
                        success: false,
                        message: "Failed to approve Instructor role",
                    };
                }
                return {
                    success: true,
                    message: "Instructor request sent to admin",
                    user,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to approve instructor role ${error}`,
                };
            }
        });
    }
    changePassword(id, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_2.default.findByIdAndUpdate(id, { password: newPassword }, { new: true });
                if (!user) {
                    return {
                        success: false,
                        message: "Failed to update Password",
                    };
                }
                return {
                    success: true,
                    message: "Password updated successfuly",
                    user,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to update ${error}`,
                };
            }
        });
    }
    rejectInstructor(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_2.default.findByIdAndUpdate(userId, { isApproved: false, isRejected: true, role: "student" }, { new: true });
                if (!user) {
                    return {
                        success: false,
                        message: "Failed to reject user",
                    };
                }
                return {
                    success: true,
                    message: "User rejected",
                    user,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to reject user ${error}`,
                };
            }
        });
    }
    blockUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_2.default.findByIdAndUpdate(userId, { isBlock: true }, { new: true });
                if (!user) {
                    return {
                        success: false,
                        message: "Failed to block user",
                    };
                }
                return {
                    success: true,
                    message: "User Blocked",
                    user,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to block user ${error}`,
                };
            }
        });
    }
    unBlockUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_2.default.findByIdAndUpdate(userId, { isBlock: false }, { new: true });
                if (!user) {
                    return {
                        success: false,
                        message: "Failed to unblock user",
                    };
                }
                return {
                    success: true,
                    message: "User unblocked",
                    user,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to unblock user ${error}`,
                };
            }
        });
    }
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = yield user_model_1.default.findById(id);
                //console.log(userDetails);
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
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to fetch ${error}`,
                };
            }
        });
    }
    userUpdate(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = yield user_model_1.default.findByIdAndUpdate({ _id: id }, { courses: updates }, {
                    new: true,
                });
                console.log(userDetails);
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
            }
            catch (error) {
                return {
                    success: false,
                    message: `Failed to update ${error}`,
                };
            }
        });
    }
    getUserAnalytics() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield (0, analytics_generator_1.generateLast12MonthsData)(user_model_2.default);
                return {
                    success: true,
                    message: "Details fetched",
                    users,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "Server Error",
                };
            }
        });
    }
    getMyInfoById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_2.default.findById(userId);
                return {
                    success: true,
                    message: "Details fetched",
                    user,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "Server Error",
                };
            }
        });
    }
}
exports.default = UserRepository;

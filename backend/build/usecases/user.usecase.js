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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus_enum_1 = require("../enums/HttpStatus.enum");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const jwt_1 = require("../utils/jwt");
const redis_1 = require("../utils/redis");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userservice_1 = require("../services/userservice");
dotenv_1.default.config();
class UserUsecase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const isEmailExist = yield this.userRepository.checkExistUser(email);
                if (isEmailExist.data) {
                    return {
                        status: HttpStatus_enum_1.HttpStatus.ServerError,
                        data: {
                            success: false,
                            message: "Account Exist already",
                        },
                    };
                }
                const user = {
                    name,
                    email,
                    password,
                };
                console.log("user");
                const activationToken = this.createActivationToken(user);
                const activationCode = (yield activationToken).activationCode;
                const data = { user: { name: user.name }, activationCode };
                console.log("data", data);
                const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/activationMail.ejs"), data);
                //console.log("Email HTML content:", html);
                try {
                    yield this.sendMail({
                        email: user.email,
                        subject: "Activate your account",
                        template: "activationMail.ejs",
                        data,
                    });
                    res.status(201).json({
                        success: true,
                        message: `Please check your mail ${user.email} to activate your account`,
                        activationToken: (yield activationToken).token,
                        user,
                    });
                }
                catch (error) {
                    res.status(500).send({
                        success: false,
                        message: "Error sending mail",
                    });
                }
            }
            catch (error) {
                res.status(500).send({
                    success: false,
                    message: "server error",
                });
            }
        });
    }
    createActivationToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("create activaton code");
            const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
            const token = jsonwebtoken_1.default.sign({
                user,
                activationCode,
            }, process.env.ACTIVATION_SECRET, {
                expiresIn: "2m",
            });
            return { token, activationCode };
        });
    }
    sendMail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer_1.default.createTransport({
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || "587"),
                service: process.env.SMTP_SERVICE,
                auth: {
                    user: process.env.SMTP_MAIL,
                    pass: process.env.SMTP_PASSWORD,
                },
            });
            const { email, subject, template, data } = options;
            const templatePath = path_1.default.join(__dirname, "../mails", template);
            const html = yield ejs_1.default.renderFile(templatePath, data);
            const mailOptions = {
                from: process.env.SMTP_MAIL,
                to: email,
                subject,
                html,
            };
            yield transporter.sendMail(mailOptions);
        });
    }
    activateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("activate user reqst body", req.body);
                const { otp, activation_token } = req.body;
                const activation_code = otp;
                console.log(req.body);
                console.log("code", activation_code);
                const newUser = jsonwebtoken_1.default.verify(activation_token, process.env.ACTIVATION_SECRET);
                console.log("new user", newUser);
                if (newUser.activationCode !== activation_code) {
                    return {
                        status: HttpStatus_enum_1.HttpStatus.BadRequest,
                        data: {
                            success: false,
                            message: "Invalid Activation Code",
                        },
                    };
                }
                const { name, email, password } = newUser.user;
                const isEmailExist = yield this.userRepository.checkExistUser(email);
                console.log(isEmailExist);
                if (isEmailExist.data) {
                    return {
                        status: HttpStatus_enum_1.HttpStatus.ServerError,
                        data: {
                            success: false,
                            message: "Account Exist already",
                        },
                    };
                }
                const user = yield this.userRepository.createUser({
                    name,
                    email,
                    password,
                });
                if (user.data) {
                    return {
                        status: HttpStatus_enum_1.HttpStatus.Success,
                        data: {
                            success: true,
                            message: "User Activation Success",
                        },
                    };
                }
                res.status(201).json({
                    success: true,
                });
            }
            catch (error) {
                res.status(500).send({
                    success: false,
                    message: "server error",
                });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // if (!email || !password) {
                //   return {
                //     status: HttpStatus.BadRequest,
                //     data: {
                //       success: false,
                //       message: "Please enter email & password",
                //     },
                //   };
                // }
                // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                // //const passwordRegex =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
                // if (!emailRegex.test(email)) {
                //   return {
                //     status: HttpStatus.NotFound,
                //     data: {
                //       success: false,
                //       message: "Invalid email or password format",
                //     },
                //   };
                // }
                const user = yield this.userRepository.authenticateUser(req.body);
                console.log(user);
                if (!user.data) {
                    return {
                        status: HttpStatus_enum_1.HttpStatus.NotFound,
                        data: {
                            success: false,
                            message: "Invalid email or password",
                        },
                    };
                }
                (0, jwt_1.sendToken)(user.data, 200, res);
            }
            catch (error) {
                res.status(500).send({
                    success: false,
                    message: "server error",
                });
            }
        });
    }
    logoutUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie("access_token", "", { maxAge: 0 });
                res.cookie("refresh_token", "", { maxAge: 0 });
                //console.log("req.user", req.user);
                const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) || "";
                console.log("user:", userId);
                //console.log(`Deleting user data for user ${userId}`);
                yield redis_1.redis.del(userId);
                console.log(`User data for user ${userId} deleted`);
                // const result = await redis.exists(userId);
                // if (result === 1) {
                //   console.log(`Key "${userId}" exists in Redis cache.`);
                // } else {
                //   console.log(`Key "${userId}" does not exist in Redis cache.`);
                // }
                return {
                    status: HttpStatus_enum_1.HttpStatus.Success,
                    data: {
                        success: true,
                        message: "Logged Out successfully",
                    },
                };
            }
            catch (error) {
                res.status(500).send({
                    success: false,
                    message: "server error",
                });
            }
        });
    }
    googleLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, avatar } = req.body;
                console.log("usecase", req.body);
                const user = yield this.userRepository.checkExistUser(email);
                console.log("response from repo", user);
                if (user.data) {
                    (0, jwt_1.sendToken)(user.data, 200, res);
                }
                else {
                    const generatedPassword = Math.random().toString(36).slice(-8) +
                        Math.random().toString(36).slice(-8);
                    const user = yield this.userRepository.createUser({
                        name,
                        email,
                        password: generatedPassword,
                        avatar,
                    });
                    if (user.data) {
                        const newuser = yield this.userRepository.checkExistUser(email);
                        if (newuser.data) {
                            (0, jwt_1.sendToken)(newuser.data, 200, res);
                        }
                        res.status(201).json({
                            success: true,
                        });
                    }
                }
            }
            catch (error) {
                res.status(500).send({
                    success: false,
                    message: "server error",
                });
            }
        });
    }
    // async updateUserInfo(req: Request, res: Response) {
    //   try {
    //     const { name, email } = req.body as IUpdateUserInfo;
    //     const userId = req.user?._id;
    //   } catch (error) {
    //     res.status(500).send({
    //       success: false,
    //       message: "server error",
    //     });
    //   }
    // }
    updateUserDetails(details, newemail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("update in usecase");
                const userInfo = yield this.userRepository.getUser(newemail);
                const user = userInfo.data;
                console.log("user by id", user);
                let { password } = details;
                if (password) {
                    details.password = yield bcryptjs_1.default.hash(password, 10);
                }
                let { profilePicture } = details;
                if (profilePicture) {
                    const { profilePicture } = details, rest = __rest(details, ["profilePicture"]);
                    const avatar = profilePicture;
                    details = Object.assign(Object.assign({}, rest), { avatar });
                }
                const response = yield this.userRepository.updateUserDetails(user === null || user === void 0 ? void 0 : user.id, details);
                if (response.data) {
                    const updatedUser = response.data;
                    console.log("updated user", updatedUser);
                    yield redis_1.redis.set(user === null || user === void 0 ? void 0 : user.id, JSON.stringify(updatedUser));
                    // sendToken(response.data, 200,res);
                    return {
                        status: HttpStatus_enum_1.HttpStatus.Success,
                        data: {
                            success: response.success,
                            message: response.message,
                            user: updatedUser,
                        },
                    };
                }
                else {
                    return {
                        status: HttpStatus_enum_1.HttpStatus.ServerError,
                        data: {
                            success: false,
                            message: "Updation failed",
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: HttpStatus_enum_1.HttpStatus.ServerError,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    updateAccessToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refresh_token = req.cookies.refresh_token;
                const decoded = jsonwebtoken_1.default.verify(refresh_token, process.env.REFRESH_TOKEN);
                if (!decoded) {
                    return {
                        status: HttpStatus_enum_1.HttpStatus.BadRequest,
                        data: {
                            success: false,
                            message: "Couldn't refresh token",
                        },
                    };
                }
                const session = yield redis_1.redis.get(decoded.id);
                if (!session) {
                    return {
                        status: HttpStatus_enum_1.HttpStatus.BadRequest,
                        data: {
                            success: false,
                            message: "Couldn't refresh token",
                        },
                    };
                }
                const user = JSON.parse(session);
                const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: "3d" });
                const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.REFRESH_TOKEN, { expiresIn: "5d" });
                req.user = user;
                res.cookie("access_token", accessToken, jwt_1.accessTokenOptions);
                res.cookie("refresh_token", refreshToken, jwt_1.refreshTokenOptions);
                // res.status(200).json({
                //   status: "success",
                //   accessToken,
                // });
                return {
                    status: HttpStatus_enum_1.HttpStatus.Success,
                    data: {
                        success: true,
                        message: "Refreshed",
                        accessToken,
                    },
                };
            }
            catch (error) {
                return {
                    status: HttpStatus_enum_1.HttpStatus.ServerError,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    resendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = req.body;
                const newUser = {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                };
                const activationToken = yield this.createActivationToken(newUser);
                const activationCode = (yield activationToken).activationCode;
                const data = { user: { name: newUser.name }, activationCode };
                const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/activationMail.ejs"), data);
                try {
                    yield this.sendMail({
                        email: user.email,
                        subject: "Activate your account with new Otp",
                        template: "activationMail.ejs",
                        data,
                    });
                    const response = {
                        status: 201,
                        data: {
                            success: true,
                            message: `Otp has been resent.Please check your mail ${user.email} to activate your account`,
                            activationToken: (yield activationToken).token,
                            user,
                        },
                    };
                    return response;
                }
                catch (error) {
                    return {
                        status: 500,
                        data: {
                            success: false,
                            message: "Failed sending new otp",
                        },
                    };
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: "server error",
                });
            }
        });
    }
    getUserInfo(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!userId) {
                    return {
                        status: HttpStatus_enum_1.HttpStatus.NotFound,
                        data: {
                            success: true,
                            message: "Failed to authorize the session",
                        },
                    };
                }
                console.log("user id in get user info", userId);
                const user = yield (0, userservice_1.getUserById)(userId, res);
                console.log(user);
                if (user) {
                    return {
                        status: HttpStatus_enum_1.HttpStatus.Success,
                        data: {
                            success: true,
                            message: "User Info",
                            user,
                        },
                    };
                }
                else {
                    return {
                        status: HttpStatus_enum_1.HttpStatus.NotFound,
                        data: {
                            success: true,
                            message: "Failed to fetch User Info",
                        },
                    };
                }
            }
            catch (error) {
                res.status(500).send({
                    success: false,
                    message: "server error",
                });
            }
        });
    }
    getMyInfo(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                console.log("user id in get user info", userId);
                if (!userId) {
                    return {
                        status: HttpStatus_enum_1.HttpStatus.NotFound,
                        data: {
                            success: true,
                            message: "Failed to authorize the session",
                        },
                    };
                }
                const user = yield this.userRepository.getMyInfoById(userId);
                console.log(user);
                if (user) {
                    return {
                        status: HttpStatus_enum_1.HttpStatus.Success,
                        data: {
                            success: true,
                            message: "User Info",
                            user: user.user,
                        },
                    };
                }
                else {
                    return {
                        status: HttpStatus_enum_1.HttpStatus.NotFound,
                        data: {
                            success: true,
                            message: "Failed to fetch User Info",
                        },
                    };
                }
            }
            catch (error) {
                res.status(500).send({
                    success: false,
                    message: "server error",
                });
            }
        });
    }
    getInstructors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userRepository.getInstructors();
                if (response.instructors) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            instructors: response.instructors,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    getInstructorsApproval(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("user usecase get instrtrs");
                const response = yield this.userRepository.getInstructorsApproval();
                if (response.instructors) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            instructors: response.instructors,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    approveInstructor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const response = yield this.userRepository.approveInstructor(userId);
                if (response.user) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            user: response.user,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    getStudents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userRepository.getStudents();
                if (response.students) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            students: response.students,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("delete user usecase");
                const userId = req.params.id;
                const response = yield this.userRepository.deleteUser(userId);
                if (response.user) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            user: response.user,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    approveRoleInstructor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const { role, updates } = req.body;
                const response = yield this.userRepository.approveRoleInstructor(userId, updates);
                if (response.user) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            user: response.user,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    changePassword(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { oldPassword, newPassword } = req.body;
                const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
                if (email !== undefined) {
                    const authResult = yield this.userRepository.authenticateUser({
                        email,
                        password: oldPassword,
                    });
                    if (!authResult.success) {
                        return {
                            status: 400,
                            data: {
                                success: false,
                                message: authResult.message,
                            },
                        };
                    }
                    const user = authResult.data;
                    const id = user === null || user === void 0 ? void 0 : user._id;
                    const passwordNew = yield bcryptjs_1.default.hash(newPassword, 10);
                    const response = yield this.userRepository.changePassword(id, passwordNew);
                    if (response.user) {
                        return {
                            status: response.success ? 200 : 500,
                            data: {
                                success: response.success,
                                message: response.message,
                                user: response.user,
                            },
                        };
                    }
                }
            }
            catch (error) {
                console.error(error);
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    rejectInstructor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const response = yield this.userRepository.rejectInstructor(userId);
                if (response.user) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            user: response.user,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    blockUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const response = yield this.userRepository.blockUser(userId);
                if (response.user) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            user: response.user,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    unBlockUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const response = yield this.userRepository.unBlockUser(userId);
                if (response.user) {
                    return {
                        status: response.success ? 200 : 500,
                        data: {
                            success: response.success,
                            message: response.message,
                            user: response.user,
                        },
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: "server error",
                    },
                };
            }
        });
    }
    getUserAnalytics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userRepository.getUserAnalytics();
                return {
                    status: response.success ? 201 : 500,
                    data: {
                        success: response.success,
                        message: response.message,
                        users: response.users,
                    },
                };
            }
            catch (error) {
                return {
                    status: 500,
                    data: {
                        success: false,
                        message: `server error ${error.message}`,
                    },
                };
            }
        });
    }
    getUserDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                console.log("user id in get user info", userId);
                const user = yield this.userRepository.getMyInfoById(userId);
                console.log(user);
                if (user) {
                    return {
                        status: HttpStatus_enum_1.HttpStatus.Success,
                        data: {
                            success: true,
                            message: "User Info",
                            user: user.user,
                        },
                    };
                }
                else {
                    return {
                        status: HttpStatus_enum_1.HttpStatus.NotFound,
                        data: {
                            success: true,
                            message: "Failed to fetch User Info",
                        },
                    };
                }
            }
            catch (error) {
                res.status(500).send({
                    success: false,
                    message: "server error",
                });
            }
        });
    }
}
exports.default = UserUsecase;

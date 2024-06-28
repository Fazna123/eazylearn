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
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor(userUsecase) {
        this.userUsecase = userUsecase;
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log("controller", req.body);
                const response = yield this.userUsecase.createUser(req, res);
                if (response !== undefined)
                    res.status(response.status).send(response.data);
            }
            catch (error) {
                res.status(500).send({
                    success: false,
                    message: "server error",
                });
            }
        });
    }
    activateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Activate user controller", req.body);
                const response = yield this.userUsecase.activateUser(req, res);
                if (response !== undefined)
                    res.status(response.status).send(response.data);
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
                const response = yield this.userUsecase.loginUser(req, res);
                if (response !== undefined)
                    res.status(response.status).send(response);
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
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("logout controller");
                //console.log(req.cookies);
                //console.log("controller lgout request", req.user);
                const response = yield this.userUsecase.logoutUser(req, res);
                if (response !== undefined)
                    res.status(response.status).send(response);
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
                const response = yield this.userUsecase.googleLogin(req, res);
                if (response !== undefined)
                    res.status(response).send(response);
            }
            catch (error) {
                res.status(500).send({
                    success: false,
                    message: "server error",
                });
            }
        });
    }
    updateUserDetails(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const response = yield this.userUsecase.updateUserDetails(req.body, (_a = req.user) === null || _a === void 0 ? void 0 : _a.email);
                if (response !== undefined) {
                    res.status(response.status).send(response.data);
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
    resendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("resend otp controller");
                const response = yield this.userUsecase.resendOtp(req, res);
                if (response !== undefined) {
                    console.log("new response in resend otp cntrllr", response);
                    res.status(response.status).send(response.data);
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
    updateAccessToken(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("update access token");
                const response = yield this.userUsecase.updateAccessToken(req, res);
                if (response !== undefined)
                    res.status(response.status).send((_a = response.data) === null || _a === void 0 ? void 0 : _a.accessToken);
            }
            catch (error) {
                res.status(500).send({
                    success: false,
                    message: "server error",
                });
            }
        });
    }
    getUserInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("controllerinfo me");
                const response = yield this.userUsecase.getUserInfo(req, res);
                console.log("response in controller", response);
                if (response !== undefined)
                    res.status(response.status).send(response.data);
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
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("controllerinfo me");
                const response = yield this.userUsecase.getMyInfo(req, res);
                console.log("response in controller", response);
                if (response !== undefined)
                    res.status(response.status).send(response.data);
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
                const response = yield this.userUsecase.getInstructors(req, res);
                if (response !== undefined)
                    res.status(response.status).send(response.data);
            }
            catch (error) {
                res.status(500).send({
                    success: false,
                    message: "server error",
                });
            }
        });
    }
    getInstructorsApproval(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("user cntrllr get instrtrs");
                const response = yield this.userUsecase.getInstructorsApproval(req, res);
                if (response !== undefined)
                    res.status(response.status).send(response.data);
            }
            catch (error) {
                res.status(500).send({
                    success: false,
                    message: "server error",
                });
            }
        });
    }
    approveInstructor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userUsecase.approveInstructor(req, res);
                if (response !== undefined) {
                    return res.status(response.status).send(response.data);
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
    getStudents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userUsecase.getStudents(req, res);
                if (response !== undefined)
                    res.status(response.status).send(response.data);
            }
            catch (error) {
                res.status(500).send({
                    success: false,
                    message: "server error",
                });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("dlete user cntrllr");
                const response = yield this.userUsecase.deleteUser(req, res);
                if (response !== undefined) {
                    res.status(response.status).send(response.data);
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
    approveRoleInstructor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userUsecase.approveRoleInstructor(req, res);
                if (response !== undefined) {
                    return res.status(response.status).send(response.data);
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
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userUsecase.changePassword(req, res);
                if (response !== undefined) {
                    return res.status(response.status).send(response.data);
                }
            }
            catch (error) {
                res.status(500).send({
                    success: false,
                    message: "Server Error",
                });
            }
        });
    }
    rejectInstructor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userUsecase.rejectInstructor(req, res);
                if (response !== undefined) {
                    return res.status(response.status).send(response.data);
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
    blockUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userUsecase.blockUser(req, res);
                if (response !== undefined) {
                    return res.status(response.status).send(response.data);
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
    unBlockUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userUsecase.unBlockUser(req, res);
                if (response !== undefined) {
                    return res.status(response.status).send(response.data);
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
    getUserAnalytics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userUsecase.getUserAnalytics(req, res);
                if (response !== undefined) {
                    return res.status(response.status).send(response.data);
                }
            }
            catch (error) {
                res.status(500).send({
                    success: false,
                    message: "Server Error",
                });
            }
        });
    }
    getUserDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("controllerinfo me");
                const response = yield this.userUsecase.getUserDetails(req, res);
                console.log("response in controller", response);
                if (response !== undefined)
                    res.status(response.status).send(response.data);
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
exports.default = UserController;

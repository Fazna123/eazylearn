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
class CourseController {
    constructor(courseUsecase) {
        this.courseUsecase = courseUsecase;
    }
    createCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.createCourse(req, res);
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
    editCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.editCourse(req, res);
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
    getSingleCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.getSingleCourse(req, res);
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
    getSingleCourseContent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.getSingleCourseContent(req, res);
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
    getAllCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.getAllCourse(req, res);
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
    getApprovedCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.getApprovedCourses(req, res);
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
    getCoursesToApprove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.getCoursesToApprove(req, res);
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
    getAllCourseSearch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.getAllCourseSearch(req, res);
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
    myTeachings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("my teachings controller");
                const response = yield this.courseUsecase.myTeachings(req, res);
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
    approveCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.approveCourse(req, res);
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
    rejectCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.rejectCourse(req, res);
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
    deleteCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.deleteCourse(req, res);
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
    revokeCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.revokeCourse(req, res);
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
    getAllCourseDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.getAllCourseDetails(req, res);
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
    deletedCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.deletedCourses(req, res);
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
    reportedCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.reportedCourses(req, res);
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
    addCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.addCategory(req.body);
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
    getCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.getCategories(req.query);
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
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("update cat cntrller");
                const response = yield this.courseUsecase.updateCategory(req, res);
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
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.deleteCategory(req, res);
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
    addQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.addQuestion(req, res);
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
    addAnswer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.addAnswer(req, res);
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
    addReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.addReview(req, res);
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
    addReplyToReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.addReplyToReview(req, res);
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
    getNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.getNotifications(req, res);
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
    updateNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.updateNotifications(req, res);
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
    getCourseAnalytics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.getCourseAnalytics(req, res);
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
    getMyCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.courseUsecase.getMyCourses(req, res);
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
    sendRejectionEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("rejctn cntrllr");
                const response = yield this.courseUsecase.sendRejectionMail(req, res);
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
    addReportReason(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log("rejctn cntrllr");
                const response = yield this.courseUsecase.addReportReason(req, res);
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
    editReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log("rejctn cntrllr");
                const response = yield this.courseUsecase.editReview(req, res);
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
}
exports.default = CourseController;

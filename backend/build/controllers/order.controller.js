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
class OrderController {
    constructor(orderUsecase) {
        this.orderUsecase = orderUsecase;
    }
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("order cntrllr");
                const response = yield this.orderUsecase.createOrder(req, res);
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
    sendStripePublishableKey(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("order cntrllr");
                const response = yield this.orderUsecase.sendStripePublishableKey(req, res);
                return res.status(response.status).send(response.data);
            }
            catch (error) {
                res.status(500).send({
                    success: false,
                    message: "server error",
                });
            }
        });
    }
    newPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("order cntrllr");
                const response = yield this.orderUsecase.newPayment(req, res);
                return res.status(response.status).send(response.data);
            }
            catch (error) {
                res.status(500).send({
                    success: false,
                    message: "server error",
                });
            }
        });
    }
    getAllOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.orderUsecase.getAllOrders(req, res);
                return res.status(response.status).send(response.data);
            }
            catch (error) {
                res.status(500).send({
                    success: false,
                    message: "Server Error",
                });
            }
        });
    }
    getOrderAnalytics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.orderUsecase.getOrderAnalytics(req, res);
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
    getDashboardData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.orderUsecase.getDashboardData(req, res);
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
    getInstructorMontlyOrderAnalytics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.orderUsecase.getInstructorMonthlyOrderAnalytics(req, res);
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
exports.default = OrderController;

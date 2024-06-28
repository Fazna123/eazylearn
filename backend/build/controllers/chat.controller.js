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
    constructor(chatUsecase) {
        this.chatUsecase = chatUsecase;
    }
    createNewConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.chatUsecase.createNewConversation(req, res);
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
    createMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.chatUsecase.createMessage(req, res);
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
    getInstructorConversations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log("cntrllr");
                const response = yield this.chatUsecase.getInstructorConversations(req, res);
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
    updateLastMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("cntrllr");
                const response = yield this.chatUsecase.updateLastMessage(req, res);
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
    getAllMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("cntrllr");
                const response = yield this.chatUsecase.getAllMessages(req, res);
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

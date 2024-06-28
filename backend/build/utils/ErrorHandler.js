"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message || 'An error occurred');
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ErrorHandler;

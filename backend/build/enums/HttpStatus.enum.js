"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatus = void 0;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["Success"] = 200] = "Success";
    HttpStatus[HttpStatus["ServerError"] = 500] = "ServerError";
    HttpStatus[HttpStatus["NotFound"] = 404] = "NotFound";
    HttpStatus[HttpStatus["BadRequest"] = 400] = "BadRequest";
})(HttpStatus || (exports.HttpStatus = HttpStatus = {}));

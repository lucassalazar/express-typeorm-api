"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class ResponseUtil {
    static sendResponse(res, message, data, statusCode = http_status_codes_1.StatusCodes.OK, paginationInfo) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
            paginationInfo,
        });
    }
    static sendError(res, message, statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error) {
        return res.status(statusCode).json({
            success: false,
            message,
            error,
        });
    }
}
exports.default = ResponseUtil;

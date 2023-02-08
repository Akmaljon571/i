"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorhandle = void 0;
const ErrorHandle_1 = __importDefault(require("../error/ErrorHandle"));
const errorhandle = (err, req, res, next) => {
    if (err instanceof ErrorHandle_1.default) {
        res.status(err.status).json({
            message: err.message,
            status: err.status,
        });
        return;
    }
    console.log(err);
    res.status(500).json({
        message: "Internal Server Error",
        status: 500,
    });
};
exports.errorhandle = errorhandle;

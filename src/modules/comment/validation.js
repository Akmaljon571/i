"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComment = exports.createComment = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createComment = joi_1.default.object({
    productId: joi_1.default.string().required(),
    comment: joi_1.default.string().required(),
});
exports.updateComment = joi_1.default.object({
    comment: joi_1.default.string(),
});

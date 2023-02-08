"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategory = exports.createCategory = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createCategory = joi_1.default.object({
    title: joi_1.default.string().max(100).required(),
});
exports.updateCategory = joi_1.default.object({
    title: joi_1.default.string().max(100),
});

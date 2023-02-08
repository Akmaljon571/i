"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailSchema = exports.createRegistr = exports.createLogin = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createLogin = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().max(13).required(),
});
exports.createRegistr = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    name: joi_1.default.string().max(50).required(),
    phone: joi_1.default.string().max(13).required(),
    gender: joi_1.default.valid("Erkak", "Ayol").required(),
});
exports.emailSchema = joi_1.default.object({
    emailCode: joi_1.default.number().required(),
});

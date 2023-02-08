"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = __importDefault(require("../../middleWare/validate"));
const multer_1 = require("../../utils/multer");
const users_1 = require("./users");
const validate_2 = require("./validate");
exports.default = (0, express_1.Router)()
    .post("/login", (0, validate_1.default)(validate_2.createLogin), users_1.Login)
    .post("/registr", multer_1.upload.single("rasm"), (0, validate_1.default)(validate_2.createRegistr), users_1.Registr)
    .post("/login/email", (0, validate_1.default)(validate_2.emailSchema), users_1.loginEmail)
    .post("/registr/email", (0, validate_1.default)(validate_2.emailSchema), users_1.registrEmail);

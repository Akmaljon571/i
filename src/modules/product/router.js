"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = __importDefault(require("../../middleWare/validate"));
const verifyToken_1 = __importDefault(require("../../middleWare/verifyToken"));
const multer_1 = require("../../utils/multer");
const product_1 = require("./product");
const validation_1 = require("./validation");
exports.default = (0, express_1.Router)()
    .get("/", verifyToken_1.default, product_1.GET)
    .post("/create", multer_1.upload.array("rasmlar", 2), verifyToken_1.default, (0, validate_1.default)(validation_1.createProduct), product_1.POST)
    .put("/update/:id", multer_1.upload.array("rasmlar"), verifyToken_1.default, (0, validate_1.default)(validation_1.updateProduct), product_1.PUT)
    .delete("/delete/:id", verifyToken_1.default, product_1.DELETE)
    .get("/search/:proName", verifyToken_1.default, product_1.SERACH);

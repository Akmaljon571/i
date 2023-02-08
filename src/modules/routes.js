"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router_1 = __importDefault(require("./users/router"));
const router_2 = __importDefault(require("./category/router"));
const router_3 = __importDefault(require("./subCategory/router"));
const router_4 = __importDefault(require("./product/router"));
const router_5 = __importDefault(require("./comment/router"));
const router_6 = __importDefault(require("./karzinka/router"));
exports.default = (0, express_1.Router)()
    .use("/auth", router_1.default)
    .use("/category", router_2.default)
    .use("/subCategory", router_3.default)
    .use("/product", router_4.default)
    .use("/comment", router_5.default)
    .use("/karzinka", router_6.default);

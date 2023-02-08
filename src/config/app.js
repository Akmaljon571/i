"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const errorhande_1 = require("../middleWare/errorhande");
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const routes_1 = __importDefault(require("../modules/routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
exports.app = app;
const options = {
    explorer: true,
};
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.resolve(__dirname, "..", "uploads")));
app.use(routes_1.default);
app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default, options));
app.use(errorhande_1.errorhandle);
app.all("/*", (_, res) => res.sendStatus(404));

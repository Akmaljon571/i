"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourse = void 0;
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
exports.dataSourse = new typeorm_1.DataSource({
    type: "postgres",
    host: "topsy.db.elephantsql.com",
    port: 5432,
    username: "uxlozqtj",
    database: "uxlozqtj",
    password: "1DM4O5eWh6Qsjv-KSeDXzMsgbGknrY2S",
    entities: [path_1.default.resolve(__dirname, "..", "entities", "*.entite.{ts,js}")],
    migrations: [path_1.default.resolve(__dirname, "..", "migrations", "*.{ts,js}")],
    logging: true,
    synchronize: false,
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("./../config/ormconfig");
const jwt_1 = require("../utils/jwt");
const ErrorHandle_1 = __importDefault(require("../error/ErrorHandle"));
const users_entite_1 = require("../entities/users.entite");
exports.default = async (req, res, next) => {
    try {
        const { acces_token } = req.headers;
        if (typeof acces_token === "string") {
            const userEmail = (0, jwt_1.verify)(acces_token);
            if (typeof userEmail === "string") {
                const user = await ormconfig_1.dataSourse.getRepository(users_entite_1.Users).findOneBy({ user_email: userEmail });
                if (user) {
                    req.userId = user?.user_id;
                    next();
                }
                else {
                    throw new ErrorHandle_1.default("Invalid Token", 401);
                }
            }
            else {
                throw new ErrorHandle_1.default("Not Token", 400);
            }
        }
        else {
            throw new ErrorHandle_1.default("Not Token", 400);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};

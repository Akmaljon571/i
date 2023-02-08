"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRedis = void 0;
const redis_1 = require("redis");
const ErrorHandle_1 = __importDefault(require("../error/ErrorHandle"));
const fetchRedis = async () => {
    try {
        const client = (0, redis_1.createClient)();
        client.on("error", (err) => console.log(err));
        client.on("connect", () => console.log("Connect"));
        await client.connect();
        return client;
    }
    catch (error) {
        console.log(error);
        throw new ErrorHandle_1.default("Error in Redis", 422);
    }
};
exports.fetchRedis = fetchRedis;

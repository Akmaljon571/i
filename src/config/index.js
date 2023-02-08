"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRedis = exports.app = exports.SEKUND = exports.PORT = exports.KEY = exports.dataSourse = void 0;
const app_1 = require("./app");
Object.defineProperty(exports, "app", { enumerable: true, get: function () { return app_1.app; } });
const dotenv_1 = require("./dotenv");
Object.defineProperty(exports, "KEY", { enumerable: true, get: function () { return dotenv_1.KEY; } });
Object.defineProperty(exports, "PORT", { enumerable: true, get: function () { return dotenv_1.PORT; } });
const ormconfig_1 = require("./ormconfig");
Object.defineProperty(exports, "dataSourse", { enumerable: true, get: function () { return ormconfig_1.dataSourse; } });
const redis_1 = require("./redis");
Object.defineProperty(exports, "fetchRedis", { enumerable: true, get: function () { return redis_1.fetchRedis; } });
const SEKUND = Number(dotenv_1.sekund);
exports.SEKUND = SEKUND;
const tekshiruv = () => {
    if (!dotenv_1.PORT) {
        console.log(".env Ichiga portni berin aka!!!");
    }
    if (!dotenv_1.KEY) {
        console.log("env ichiga secret key berin aka!!!");
    }
    if (!SEKUND) {
        console.log("env ichiga SEKUND ni berin aka!!!");
    }
    if (typeof SEKUND !== "number") {
        console.log("env ichidagi kiritgan SEKUNDni number xolatda harf qoshmay berin aka");
    }
};
tekshiruv();

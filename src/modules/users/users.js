"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrEmail = exports.loginEmail = exports.Registr = exports.Login = void 0;
const config_1 = require("../../config");
const users_entite_1 = require("../../entities/users.entite");
const ErrorHandle_1 = __importDefault(require("../../error/ErrorHandle"));
const jwt_1 = require("../../utils/jwt");
const nodemailter_1 = __importDefault(require("../../utils/nodemailter"));
const passwordHash_1 = require("../../utils/passwordHash");
const random_1 = require("../../utils/random");
const redis_1 = __importDefault(require("./redis"));
const Login = async (req, res, next) => {
    try {
        const { email, password } = req.result;
        const client = await (0, config_1.fetchRedis)();
        await (0, redis_1.default)();
        if (typeof email === "string" && typeof password === "string") {
            const cache = await client.get("allLogin");
            if (!cache) {
                const bazaFindUser = await config_1.dataSourse
                    .getRepository(users_entite_1.Users)
                    .findOne({ where: { user_email: email } });
                if (bazaFindUser) {
                    const randomSon = (0, random_1.random)();
                    const newObj = {
                        email,
                        password: (0, passwordHash_1.hash)(password),
                        randomSon,
                    };
                    await client.set("allLogin", JSON.stringify([newObj]));
                    await (0, nodemailter_1.default)(email, randomSon);
                    res.json({
                        message: "Code send Mail",
                        status: 200,
                    });
                }
                else {
                    throw new ErrorHandle_1.default("Not Found", 404);
                }
            }
            else {
                const findUsersInCache = JSON.parse(cache);
                const bazaFindUser = await config_1.dataSourse.getRepository(users_entite_1.Users).findOneBy({ user_email: email });
                if (bazaFindUser) {
                    const uniqueRandom = (0, random_1.random)();
                    const newObject = {
                        email,
                        password,
                        uniqueRandom,
                    };
                    await (0, nodemailter_1.default)(email, uniqueRandom);
                    if (findUsersInCache) {
                        await client.set("allLogin", JSON.stringify([...findUsersInCache, newObject]));
                    }
                    else {
                        await client.set("allLogin", JSON.stringify([newObject]));
                    }
                    res.json({
                        message: "Code send Email",
                        status: 200,
                    });
                }
                else {
                    throw new ErrorHandle_1.default("Not Found", 400);
                }
            }
        }
        else {
            throw new ErrorHandle_1.default("Bad Request", 401);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.Login = Login;
const Registr = async (req, res, next) => {
    try {
        const { name, phone, email, gender, password } = req.result;
        const client = await (0, config_1.fetchRedis)();
        const rasm = req.file;
        await (0, redis_1.default)();
        if (!rasm?.filename) {
            throw new ErrorHandle_1.default("Rasm jonating", 400);
        }
        if (typeof name === "string" &&
            typeof phone === "string" &&
            typeof email === "string" &&
            typeof gender === "string" &&
            typeof password === "string") {
            const bazaFindUser = await config_1.dataSourse.getRepository(users_entite_1.Users).findOneBy({ user_email: email, user_phone: phone });
            if (!bazaFindUser) {
                const randomMail = (0, random_1.random)();
                const newObject = {
                    email,
                    password: (0, passwordHash_1.hash)(password),
                    name,
                    phone,
                    gender: gender === "Erkak" ? true : false,
                    randomMail,
                    rasm: rasm.filename,
                };
                await (0, nodemailter_1.default)(email, randomMail);
                const cacheRegistr = await client.get("allRegistr");
                if (cacheRegistr) {
                    await client.set("allRegistr", JSON.stringify([...JSON.parse(cacheRegistr), newObject]));
                }
                else {
                    await client.set("allRegistr", JSON.stringify([newObject]));
                }
                res.json({
                    message: "Code send Mail",
                    status: 200,
                });
            }
            else {
                throw new ErrorHandle_1.default("User Already exists", 409);
            }
        }
        else {
            throw new ErrorHandle_1.default("Bad Request", 400);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.Registr = Registr;
const loginEmail = async (req, res, next) => {
    try {
        const { emailCode } = req.result;
        const client = await (0, config_1.fetchRedis)();
        const cacheLogin = await client.get("allLogin");
        if (cacheLogin) {
            const allLogin = JSON.parse(cacheLogin);
            if (allLogin.length) {
                const findUser = allLogin.find((e) => e.uniqueRandom == emailCode);
                if (findUser) {
                    const refreshToken = await client.get("refresh");
                    if (!refreshToken) {
                        await client.setEx("refresh", 3600, "1");
                    }
                    const setRefreshToken = await client.get("refresh");
                    res.status(201).json({
                        bearer_token: (0, jwt_1.sign)(findUser.email),
                        refresh_token: refreshToken ?? setRefreshToken,
                    });
                }
                else {
                    throw new ErrorHandle_1.default("Not Found 1", 401);
                }
            }
            else {
                throw new ErrorHandle_1.default("Not Found 2", 401);
            }
        }
        else {
            throw new ErrorHandle_1.default("Not Found 3", 401);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.loginEmail = loginEmail;
const registrEmail = async (req, res, next) => {
    try {
        const { emailCode } = req.result;
        const client = await (0, config_1.fetchRedis)();
        const cacheRegistr = await client.get("allRegistr");
        if (cacheRegistr) {
            const allRegistr = JSON.parse(cacheRegistr);
            if (allRegistr.length) {
                const findUser = allRegistr.find((e) => e.randomMail == emailCode);
                if (findUser) {
                    await config_1.dataSourse
                        .getRepository(users_entite_1.Users)
                        .createQueryBuilder()
                        .insert()
                        .into("users")
                        .values({
                        user_name: findUser?.name,
                        user_phone: findUser?.phone,
                        user_email: findUser?.email,
                        user_pol: findUser?.gender,
                        user_password: findUser?.password,
                        user_img: findUser?.rasm,
                    })
                        .execute();
                    const refreshToken = await client.get("refresh");
                    if (!refreshToken) {
                        await client.setEx("refresh", 3600, "1");
                    }
                    const setRefreshToken = await client.get("refresh");
                    res.status(201).json({
                        bearer_token: (0, jwt_1.sign)(findUser?.email),
                        refresh_token: refreshToken ?? setRefreshToken,
                    });
                }
                else {
                    throw new ErrorHandle_1.default("Not Found", 404);
                }
            }
            else {
                throw new ErrorHandle_1.default("Not Found 2", 404);
            }
        }
        else {
            throw new ErrorHandle_1.default("Not Found 1", 404);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.registrEmail = registrEmail;

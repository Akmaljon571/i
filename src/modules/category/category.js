"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategory = exports.DELETE = exports.PUT = exports.POST = exports.GET = void 0;
const category_entite_1 = require("./../../entities/category.entite");
const config_1 = require("../../config");
const ErrorHandle_1 = __importDefault(require("../../error/ErrorHandle"));
const redis_1 = __importDefault(require("./redis"));
const GET = async (req, res, next) => {
    try {
        const client = await (0, config_1.fetchRedis)();
        const cache = await client.get("allCategory");
        await (0, redis_1.default)();
        if (!cache) {
            const allCategory = await config_1.dataSourse.getRepository(category_entite_1.Category).find();
            await client.set("allCategory", JSON.stringify(allCategory));
            res.json({
                message: "OK",
                status: 200,
                data: allCategory,
            });
        }
        else {
            const allCategory = JSON.parse(cache);
            res.json({
                message: "OK",
                status: 200,
                data: allCategory,
            });
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.GET = GET;
const POST = async (req, res, next) => {
    try {
        const { title } = req.result;
        const client = await (0, config_1.fetchRedis)();
        await (0, redis_1.default)();
        if (!title) {
            throw new ErrorHandle_1.default("Bad Request", 400);
        }
        const newCategory = await config_1.dataSourse
            .getRepository(category_entite_1.Category)
            .createQueryBuilder()
            .insert()
            .into(category_entite_1.Category)
            .values({ cat_title: title })
            .returning("*")
            .execute();
        const cache = await client.get("allCategory");
        if (cache) {
            await client.set("allCategory", JSON.stringify([...JSON.parse(cache), newCategory.raw[0]]));
        }
        res.json({
            message: "Create",
            status: 201,
            data: newCategory.raw[0],
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.POST = POST;
const PUT = async (req, res, next) => {
    try {
        const { title } = req.result;
        const { id } = req.params;
        const client = await (0, config_1.fetchRedis)();
        await (0, redis_1.default)();
        const findCategory = await config_1.dataSourse.getRepository(category_entite_1.Category).findOneBy({ cat_id: id });
        if (findCategory) {
            if (title) {
                const updateCategory = await config_1.dataSourse
                    .getRepository(category_entite_1.Category)
                    .createQueryBuilder()
                    .update()
                    .set({ cat_title: title || findCategory.cat_title })
                    .where({ cat_id: id })
                    .returning("*")
                    .execute();
                const cache = await client.get("allCategory");
                if (cache) {
                    const all = JSON.parse(cache);
                    const update = all.map((e) => (e.cat_id === id ? updateCategory.raw[0] : e));
                    await client.set("allCategory", JSON.stringify(update));
                }
                res.json({
                    message: "Update",
                    status: 200,
                    data: updateCategory.raw[0],
                });
            }
            else {
                res.json({
                    message: "Update",
                    status: 200,
                    data: findCategory,
                });
            }
        }
        else {
            throw new ErrorHandle_1.default("Category Not Found", 404);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.PUT = PUT;
const DELETE = async (req, res, next) => {
    try {
        const { id } = req.params;
        const client = await (0, config_1.fetchRedis)();
        await (0, redis_1.default)();
        const findCategory = await config_1.dataSourse.getRepository(category_entite_1.Category).findOneBy({ cat_id: id });
        if (findCategory) {
            const deleteCategory = await config_1.dataSourse
                .getRepository(category_entite_1.Category)
                .createQueryBuilder()
                .delete()
                .from(category_entite_1.Category)
                .where({ cat_id: id })
                .returning("*")
                .execute();
            const cache = await client.get("allCategory");
            if (cache) {
                const all = JSON.parse(cache);
                const deleted = all.filter((e) => e.cat_id !== id);
                await client.set("allCategory", JSON.stringify(deleted));
            }
            res.json({
                message: "Delete",
                status: 204,
                data: deleteCategory.raw[0],
            });
        }
        else {
            throw new ErrorHandle_1.default("Category Not Found", 404);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.DELETE = DELETE;
const subCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const allSubCategory = await config_1.dataSourse.getRepository(category_entite_1.Category).findOne({
            relations: {
                cat_sub: true,
            },
            where: {
                cat_id: id,
            },
        });
        res.json({
            message: "OK",
            status: 200,
            data: allSubCategory,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.subCategory = subCategory;

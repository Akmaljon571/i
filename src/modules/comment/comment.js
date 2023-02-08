"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.byProduct = exports.DELETE = exports.PUT = exports.POST = exports.GET = void 0;
const ormconfig_1 = require("./../../config/ormconfig");
const config_1 = require("../../config");
const comment_entite_1 = require("../../entities/comment.entite");
const ErrorHandle_1 = __importDefault(require("../../error/ErrorHandle"));
const product_entite_1 = require("../../entities/product.entite");
const redis_1 = __importDefault(require("./redis"));
const GET = async (req, res, next) => {
    try {
        const client = await (0, config_1.fetchRedis)();
        const cache = await client.get("allComment");
        await (0, redis_1.default)();
        if (!cache) {
            const allComment = await ormconfig_1.dataSourse.getRepository(comment_entite_1.Comment).find();
            await client.set("allComment", JSON.stringify(allComment));
            res.json({
                message: "Ok",
                status: 200,
                data: allComment,
            });
        }
        else {
            const allComment = JSON.parse(cache);
            await client.set("allComment", JSON.stringify(allComment));
            res.json({
                message: "Ok",
                status: 200,
                data: allComment,
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
        const { productId, comment } = req.result;
        const { userId } = req;
        const client = await (0, config_1.fetchRedis)();
        const newComment = await ormconfig_1.dataSourse
            .getRepository(comment_entite_1.Comment)
            .createQueryBuilder()
            .insert()
            .into(comment_entite_1.Comment)
            .values({ comment_pro: productId, comment_user: userId, comment })
            .returning("*")
            .execute();
        const cache = await client.get("allComment");
        if (cache) {
            await client.set("allComment", JSON.stringify([...JSON.parse(cache), newComment.raw[0]]));
        }
        res.json({
            message: "Create",
            status: 201,
            data: newComment.raw[0],
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
        const { comment } = req.result;
        const { id } = req.params;
        const client = await (0, config_1.fetchRedis)();
        const findComment = await ormconfig_1.dataSourse.getRepository(comment_entite_1.Comment).findOneBy({ comment_id: id });
        if (findComment) {
            const updateComment = await ormconfig_1.dataSourse
                .getRepository(comment_entite_1.Comment)
                .createQueryBuilder()
                .update()
                .set({ comment: comment || findComment.comment })
                .where({ comment_id: id })
                .returning("*")
                .execute();
            const cache = await client.get("allComment");
            if (cache) {
                const all = JSON.parse(cache);
                const update = all.map((e) => (e.comment_id === id ? updateComment.raw[0] : e));
                await client.set("allComment", JSON.stringify(update));
            }
            res.json({
                message: "Update",
                status: 200,
                data: updateComment.raw[0],
            });
        }
        else {
            throw new ErrorHandle_1.default("Comment Not Found", 404);
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
        const findComment = await ormconfig_1.dataSourse.getRepository(comment_entite_1.Comment).findOneBy({ comment_id: id });
        if (findComment) {
            const deleteComment = await ormconfig_1.dataSourse
                .getRepository(comment_entite_1.Comment)
                .createQueryBuilder()
                .delete()
                .from(comment_entite_1.Comment)
                .where({ comment_id: id })
                .returning("*")
                .execute();
            const cache = await client.get("allComment");
            if (cache) {
                const all = JSON.parse(cache);
                const deleted = all.filter((e) => e.comment_id !== id);
                await client.set("allComment", JSON.stringify(deleted));
            }
            res.json({
                message: "Delete",
                status: 204,
                data: deleteComment.raw[0],
            });
        }
        else {
            throw new ErrorHandle_1.default("Comment Not Found", 404);
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.DELETE = DELETE;
const byProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const productBy = await ormconfig_1.dataSourse.getRepository(product_entite_1.Product).findOne({
            relations: {
                pro_comment: true,
            },
            where: {
                pro_id: id,
            },
        });
        res.json({
            message: "OK",
            status: 200,
            data: productBy,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.byProduct = byProduct;

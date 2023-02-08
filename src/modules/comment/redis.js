"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
exports.default = async () => {
    const client = await (0, config_1.fetchRedis)();
    if (typeof config_1.SEKUND === "number") {
        setTimeout(async () => {
            const cacheComment = await client.get("allComment");
            const allComment = JSON.parse(cacheComment);
            if (allComment && allComment.length) {
                await client.del("allComment");
            }
        }, config_1.SEKUND);
    }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
exports.default = async () => {
    const client = await (0, config_1.fetchRedis)();
    if (typeof config_1.SEKUND === "number") {
        setTimeout(async () => {
            const cacheCategory = await client.get("allCategory");
            const allCategory = JSON.parse(cacheCategory);
            if (allCategory && allCategory.length) {
                await client.del("allCategory");
            }
        }, config_1.SEKUND);
    }
};

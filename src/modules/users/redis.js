"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
exports.default = async () => {
    const client = await (0, config_1.fetchRedis)();
    if (typeof config_1.SEKUND === "number") {
        setTimeout(async () => {
            const cacheLogin = await client.get("allLogin");
            const cacheRegist = await client.get("allRegistr");
            const allLogin = JSON.parse(cacheLogin);
            const allRegistr = JSON.parse(cacheRegist);
            if (allLogin && allLogin.length) {
                const newLogin = allLogin.filter((e) => e.email != allLogin[0].email);
                await client.set("allLogin", JSON.stringify(newLogin));
            }
            if (allRegistr && allRegistr.length) {
                const newRegistr = allRegistr.filter((e) => e.email != allRegistr[0].email);
                await client.set("allRegistr", JSON.stringify(newRegistr));
            }
        }, config_1.SEKUND);
    }
};

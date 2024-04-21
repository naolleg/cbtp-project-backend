"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userSchema = {
    login: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string()
    }),
};
exports.default = userSchema;

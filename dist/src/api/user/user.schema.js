"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userSchema = {
    login: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string()
    }),
    registerEmployee: zod_1.z.object({
        healthStationId: zod_1.z.number(),
        email: zod_1.z.string().email(),
        phone: zod_1.z.string().max(14),
        password: zod_1.z.string().min(8).max(20),
        //profile
        firstName: zod_1.z.string(),
        middleName: zod_1.z.string(),
        lastName: zod_1.z.string(),
        sex: zod_1.z.enum(['MALE', 'FEMALE']),
        imageUrl: zod_1.z.string(),
        //manager, reception and hp related
        title: zod_1.z.string(),
        position: zod_1.z.string()
    }),
};
exports.default = userSchema;

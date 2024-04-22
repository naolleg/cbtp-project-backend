"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userSchema = {
    login: zod_1.z.object({
        username: zod_1.z.string(),
        password: zod_1.z.string()
    }),
    registerEmployee: zod_1.z.object({
        phonenumber: zod_1.z.string().max(14),
        password: zod_1.z.string().min(8).max(20),
        //profile
        firstname: zod_1.z.string(),
        middlename: zod_1.z.string(),
        lastname: zod_1.z.string(),
        gender: zod_1.z.enum(['MALE', 'FEMALE']),
        image_url: zod_1.z.string(),
        //manager, reception and hp related
        position: zod_1.z.string()
    }),
    updateEmployee: zod_1.z.object({
        phonenumber: zod_1.z.string().max(14),
        password: zod_1.z.string().min(8).max(20),
        //profile
        firstname: zod_1.z.string(),
        middlename: zod_1.z.string(),
        lastname: zod_1.z.string(),
        gender: zod_1.z.enum(['MALE', 'FEMALE']),
        image_url: zod_1.z.string(),
        //manager, reception and hp related
        position: zod_1.z.string()
    }),
    registerMother: zod_1.z.object({
        phonenumber: zod_1.z.string().max(14),
        password: zod_1.z.string().min(8).max(20),
        firstname: zod_1.z.string(),
        middlename: zod_1.z.string(),
        lastname: zod_1.z.string(),
        gender: zod_1.z.enum(['MALE', 'FEMALE']),
        image_url: zod_1.z.string(),
        //mother related
        date_of_birth: zod_1.z.string(),
    }),
    updateMother: zod_1.z.object({
        phonenumber: zod_1.z.string().max(14),
        password: zod_1.z.string().min(8).max(20),
        firstname: zod_1.z.string(),
        middlename: zod_1.z.string(),
        lastname: zod_1.z.string(),
        gender: zod_1.z.enum(['MALE', 'FEMALE']),
        image_url: zod_1.z.string(),
        //mother related
        date_of_birth: zod_1.z.string(),
    }),
};
exports.default = userSchema;

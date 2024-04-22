"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = __importDefault(require("../user.schema"));
const prisma_js_1 = require("../../../config/prisma.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const employeeController = {
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        user_schema_1.default.registerEmployee.parse(req.body);
        //check if the employye exist before
        const isEmployeeExist = yield prisma_js_1.prisma.user.findFirst({ where: {
                OR: [
                    { username: req.body.username },
                ]
            } });
        if (isEmployeeExist) {
            return res.status(404).json({ error: 'News not found' });
        }
        req.body.password = bcrypt_1.default.hashSync(req.body.password, 10);
        //create the employee
        const newUser = yield prisma_js_1.prisma.user.create({
            data: {
                username: req.body.username,
                password: req.body.password,
            }
        });
    })
};
req.body.phone,
    role;
req.body.role,
    healthStationId;
req.body.healthStationId,
    profile;
{
    create: {
        firstName: req.body.firstName,
            middleName;
        req.body.middleName,
            lastName;
        req.body.lastName,
            imageUrl;
        req.body.imageUrl,
            sex;
        req.body.sex;
    }
}
proProfile: {
    create: {
        healthStationId: req.body.healthStationId,
            position;
        req.body.position,
            title;
        req.body.title;
    }
}
include: {
    profile: true,
        proProfile;
    true;
}
;
res.status(201).json(newUser);

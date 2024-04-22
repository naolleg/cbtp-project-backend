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
            return res.status(404).json({ error: 'user not found' });
        }
        req.body.password = bcrypt_1.default.hashSync(req.body.password, 10);
        //create the employee
        const newUser = yield prisma_js_1.prisma.user.create({
            data: {
                username: req.body.username,
                password: req.body.password,
                role: req.body.role,
                phonenumber: req.body.phonenumber,
                profiles: {
                    create: {
                        firstname: req.body.firstname,
                        middlename: req.body.middlename,
                        lastname: req.body.lastname,
                        image_url: req.body.image_url,
                        gender: req.body.gender,
                        position: req.body.position
                    }
                },
            },
            include: {
                profiles: true,
            }
        });
        res.status(201).json(newUser);
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        req.userId = +req.params.id;
        user_schema_1.default.updateEmployee.parse(req.body);
        const user = yield prisma_js_1.prisma.user.findFirst({ where: { id: +req.userId } });
        if (!user) {
            return res.status(404).json("user not found");
        }
        const updatedUser = yield prisma_js_1.prisma.user.update({ where: { id: +req.userId }, data: {
                profiles: {
                    update: {
                        firstname: req.body.firstname,
                        middlename: req.body.middlename,
                        lastname: req.body.lastname,
                        image_url: req.body.image_url,
                        gender: req.body.gender,
                        position: req.body.position
                    }
                },
            },
            include: {
                profiles: true,
            }
        });
        res.status(200).json(updatedUser);
    }),
    delete: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        req.userId = +req.params.id;
        const user = yield prisma_js_1.prisma.user.findFirst({ where: { id: +req.userId } });
        if (!user) {
            // return  res.status(404).json("user not found");
        }
        const deletedUser = yield prisma_js_1.prisma.user.delete({ where: { id: +req.userId } });
        res.status(200).json({
            message: "sucessfully deleted",
            sucess: true
        });
    }),
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const employee = yield prisma_js_1.prisma.user.findMany({ where: {
                NOT: { role: "MOTHER" }
            } });
        res.status(200).json(employee);
    }),
    getSingle: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        req.userId = +req.params.id;
        const user = yield prisma_js_1.prisma.user.findFirst({ where: { id: +req.userId } });
        if (!user) {
            return res.status(404).json("user not found");
        }
        res.status(200).json(user);
    }),
};
exports.default = employeeController;

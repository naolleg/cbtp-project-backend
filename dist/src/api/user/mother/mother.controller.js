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
// import motherSchema from "./mother.schema.js";
const prisma_js_1 = require("../../../config/prisma.js");
const user_schema_1 = __importDefault(require("../user.schema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const motherController = {
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        user_schema_1.default.registerMother.parse(req.body);
        //check if the employye exist before
        const isMotherExist = yield prisma_js_1.prisma.user.findFirst({ where: {
                OR: [
                    { username: req.body.username },
                ]
            } });
        if (isMotherExist) {
            res.status(404).json({ error: 'user exists' });
        }
        req.body.password = bcrypt_1.default.hashSync(req.body.password, 10);
        //create the employee
        const newMother = yield prisma_js_1.prisma.user.create({
            data: {
                username: req.body.username,
                password: req.body.password,
                role: "MOTHER",
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
                mothers: {
                    create: {
                        date_of_birth: req.body.date_of_birth,
                    }
                }
            },
            include: {
                profiles: true,
                mothers: true
            }
        });
        res.status(201).json(newMother);
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        req.mId = +req.params.id;
        user_schema_1.default.updateMother.parse(req.body);
        const isMother = yield prisma_js_1.prisma.user.findFirst({
            where: {
                AND: [
                    { id: +req.mId }, { role: "MOTHER" }
                ]
            }
        });
        if (!isMother) {
            return res.status(404).json({ error: 'user not found' });
        }
        //update the user info
        const updatedMother = yield prisma_js_1.prisma.user.update({
            where: {
                id: +req.mId
            },
            data: {
                profiles: {
                    update: {
                        firstName: req.body.firstName,
                        middleName: req.body.middleName,
                        lastName: req.body.lastName,
                        imageUrl: req.body.imageUrl,
                        sex: req.body.sex
                    }
                },
                motherProfile: {
                    update: {
                        birthdate: new Date(req.body.birthdate),
                        bloodType: req.body.bloodType,
                    }
                }
            }
        });
        res.status(200).json(updatedMother);
    }),
    delete: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        req.mId = +req.params.id;
        user_schema_1.default.updateMother.parse(req.body);
        const isMother = yield prisma_js_1.prisma.user.findFirst({
            where: {
                AND: [
                    { id: +req.mId }, { role: "MOTHER" }
                ]
            }
        });
        if (!isMother) {
            return res.status(404).json({ error: 'user not found' });
        }
        //start deleting
        const isDeleted = yield prisma_js_1.prisma.user.delete({ where: {
                id: +req.mId
            } });
        res.status(200).json({
            message: "sucessfully deleted",
            sucess: true
        });
    }),
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const allMothers = yield prisma_js_1.prisma.user.findMany({
            where: { role: "MOTHER" }
        });
        res.status(200).json(allMothers);
    }),
    getSingle: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        req.mId = +req.params.id;
        const isMother = yield prisma_js_1.prisma.user.findFirst({
            where: {
                AND: [
                    { id: +req.mId }, { role: "MOTHER" }
                ]
            }
        });
        if (!isMother) {
            return res.status(404).json({ error: 'user not found' });
        }
        res.status(200).json(isMother);
    }),
};
exports.default = motherController;

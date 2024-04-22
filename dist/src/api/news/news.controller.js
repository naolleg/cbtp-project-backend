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
const news_schema_js_1 = __importDefault(require("./news.schema.js"));
const prisma_js_1 = require("../../config/prisma.js");
const newsController = {
    //create news
    createnew: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        news_schema_js_1.default.createnew.parse(req.body);
        console.log("assds");
        const theNewNews = yield prisma_js_1.prisma.news.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                publication_date: new Date(),
                image_url: req.body.image_url,
                adminId: req.body.adminId
            }
        });
        res.status(200).json(theNewNews);
    }),
    //get public news
    getNews: (req, res, nex) => __awaiter(void 0, void 0, void 0, function* () {
        const news = yield prisma_js_1.prisma.news.findMany({
            orderBy: {
                publication_date: "desc"
            },
            include: {
                admin: {
                    include: {}
                }
            }
        });
        return res.status(200).json(news);
    }),
    //update news
    updateNews: (req, res, nex) => __awaiter(void 0, void 0, void 0, function* () {
        req.newsId = +req.params.id;
        news_schema_js_1.default.updateNews.parse(req.body);
        const foundNews = yield prisma_js_1.prisma.news.findFirst({
            where: {
                id: +req.newsId
            }
        });
        if (!foundNews) {
            return res.status(404).json({ error: 'News not found' });
        }
        // Update the news using req.body
        const updatedNews = yield prisma_js_1.prisma.news.update({
            data: {
                title: req.body.title,
                description: req.body.description,
                publication_date: new Date(),
                image_url: req.body.image_url,
                adminId: req.body.adminId
            },
            where: {
                id: foundNews.id
            }
        });
        res.status(200).json(updatedNews);
    }),
};
exports.default = newsController;

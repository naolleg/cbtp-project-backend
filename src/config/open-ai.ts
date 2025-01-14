import { Configuration, OpenAI } from 'openai';
import dotenv from "dotenv"
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// module.exports= openai;
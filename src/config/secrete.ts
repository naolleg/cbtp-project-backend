import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8888;
const DATABASE_URL = process.env.DATABASE_URL;

export { PORT, DATABASE_URL };
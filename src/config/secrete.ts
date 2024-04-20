import dotenv from 'dotenv';
dotenv.config({path: '.env'});

export const PORT = process.env.PORT || 8888;
export const DATABASE_URL = process.env.DATABASE_URL;
export const SECRET = process.env.JWT_SECRET

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import appRoute from './src/route/';
import { PORT } from './src/config/secrete';
import { prisma } from './src/config/prisma';

const app = express();
dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(appRoute);
// app.get('/',async (req: Request,res: Response)=>{
//   const admin = await prisma.admins.
  

// })

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import appRoute from './src/route/';
import { PORT } from './src/config/secrete';
import { prisma } from './src/config/prisma';
import cors from 'cors'

const app = express();

dotenv.config();
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log("sfbsvdfvdfead");

// Routes
app.use(appRoute);
// app.get('/',async (req: Request,res: Response)=>{
//   const admin = await prisma.admins.
  

// })

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
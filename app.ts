import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import appRoute from './src/route/';
import { PORT } from './src/config/secrete';
import { prisma } from './src/config/prisma';
import cors from 'cors'
import { errorMiddleware } from './src/middleware/error';


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
app.use(errorMiddleware);
app.use(express.static("public"));


// Routes

app.use("/api",appRoute);
app.get('/',(req,res)=>{
  res.send("app working");
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
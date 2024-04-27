
import {prisma} from '../../config/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {Request, Response } from 'express'
import { SECRET } from '../../config/secrete.js'
import { STATUS_CODES } from 'http'
import adminSchema from './adminschema.js'
import { generateOTP } from '../../../util/otp.js';
import { error } from 'console'

const adminController = {
//     loginAdmin: async (req: Request, res: Response, next: NextFunction) => {
// const admin=await prisma.admins.
// },};
// export default adminController;
registerAdmin:async (req:Request,res:Response)=>{
    adminSchema.registerAdmin.parse(req.body);
    //check if the email or phone used befor
    const isAdminExist= await prisma.admins.findFirst({where:{
       OR:[
          {email: req.body.email},
          {phone:req.body.phone}
       ]
     
    }});
    if(isAdminExist){
     return  res.status(404).json({ error: 'admin does not exist' });
    }
    // create the admin
    const otp= generateOTP();
    const password = bcrypt.hashSync(req.body.password, 10);
    const newAdmin = await prisma.admins.create({
       data: {
          email: req.body.email,
          phone: req.body.phone,
          password: password,
          role:"ADMIN",
          otp: otp,
          profile: {
             create: {
                firstName: req.body.firstName,
                middleName: req.body.middleName,
                lastName: req.body.lastName,
                imageUrl:req.body.imageUrl
             }
          }
       },
       include: {
          profile: true
       }
       
    });
    return res.json(newAdmin);
},
 loginAdmin: async (req: Request, res: Response) => {
    adminSchema.login.parse(req.body);
    const admin = await prisma.admins.findFirst({ where: { email: req.body.email } });
    if (!admin) {
        return res.status(400).json({ error: 'email not found' });
    }
    const isMatch = bcrypt.compareSync(req.body.password, admin.password);
    if (!isMatch) {
       return res.status(400).json({ error: 'password does not match' });
    }
    const adminProfiles = await prisma.adminProfiles.findFirst({ where: { adminId: admin.id } });
    // Create token
    const payload = {
       id: admin.id,
       role: admin.role,
       firstName: adminProfiles?.firstName
    };
    const token = jwt.sign(payload, SECRET!);
    return res.status(200).json({
       token,
       message: "Login successfully"
    });
 },
 myInfo: async (req: Request, res: Response) =>{
    console.log(req.admins)
    const admin = await prisma.admins.findFirst({
       where:{id:req.admins!.id},
       include: {
          _count: true,
          profile:true,
       }
    });
    res.status(200).json(admin);
 }

}


export default adminController
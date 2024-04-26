import express from 'express';
import { User ,Role,Admins} from '@prisma/client';
declare module 'express' {
  export interface Request{
    user?:User;
    role?: Role;
    admins:Admins;
    // news?: News;
    // Vaccine?: Vaccine;
    // registeredBy: number;
    userId?: number;
    newsId: number;
    vaccineId: number;
    // hsId: number;
    mId: number;
    // childId: number;
  }
}
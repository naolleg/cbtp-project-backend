import express from 'express';

declare module 'express' {
  export interface Request {
    // user?: User;
    // admin?: Admins;
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
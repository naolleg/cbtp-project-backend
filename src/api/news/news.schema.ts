import { z } from 'zod';

const newsSchema = {
   //register admin
   createnew: z.object({
      title: z.string(),
      publication_date: z.date(),
      description: z.string(),
      image_url: z.string()
   }),
 
};

export default newsSchema;
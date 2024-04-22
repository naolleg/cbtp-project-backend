
import { z } from 'zod';


const newsSchema = {
  //register admin
  createnew: z.object({
  title: z.string(),
  description: z.string(),
  image_url: z.string()
}),
updateNews: z.object({
  title: z.string(),
  description: z.string(),
  image_url: z.string()
}),
getsingleNews:z.object({
  title: z.string(),
  description: z.string(),
  image_url: z.string()
}),
}
export default newsSchema;


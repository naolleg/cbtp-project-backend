
import {z } from "zod";

const vaccineSchema={

register:z.object({
v_name:z.string(),
description:z.string(),
ageRange:z.string(),


}),

}
export default vaccineSchema;
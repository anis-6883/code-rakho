import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../init";

export const usersRouter = createTRPCRouter({
  greet: publicProcedure
    .input(v => {
      const schema = z.object({
        message: z.string()
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        throw result.error;
      }
      return result.data;
    })
    .query(params => {
      return {
        hello: `Hello ${params.input.message}`
      };
    })
});

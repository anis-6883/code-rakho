import dbConnect from "@/config/database";
import User, { IUser } from "@/model/User";
import { z } from "zod";
import { publicProcedure, router } from "./index";

export const appRouter = router({
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
    }),
  createUser: publicProcedure
    .input(v => {
      const schema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        throw result.error;
      }
      return result.data;
    })
    .mutation(async params => {
      await dbConnect();
      const user: IUser = await User.create({
        ...params.input,
        isAdmin: false
      });

      return {
        user
      };
    }),

  getUser: publicProcedure.query(async () => {
    await dbConnect();
    const users: IUser[] = await User.aggregate([
      {
        $project: {
          name: 1,
          email: 1,
          isAdmin: 1,
          _id: {
            $toString: "$_id"
          }
        }
      }
    ]);

    return users;
  })
});

export type AppRouter = typeof appRouter;

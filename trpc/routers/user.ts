import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../init";


export const usersRouter = createTRPCRouter({
  greet: publicProcedure
    .input(
      z.object({
        message: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        hello: `Hello ${input.message}`,
      };
    }),

  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        post: z.object({
          title: z.string(),
          content: z.string(),
          published: z.boolean(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          posts: {
            create: {
              title: input.post.title,
              content: input.post.content,
              published: input.post.published,
            },
          },
        },
        include: {
          posts: true,
        },
      });

      return user;
    }),
    getAllUsers: publicProcedure.query(async () => {
      const users = await prisma.user.findMany({
        include: {
          posts: true,
        },
      });
      return users;
    }),
});
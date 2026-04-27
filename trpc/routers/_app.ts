import { createTRPCRouter } from "../init";
import { usersRouter } from "./user";

export const appRouter = createTRPCRouter({
  users: usersRouter
});

export type AppRouter = typeof appRouter;

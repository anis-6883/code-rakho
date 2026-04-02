import { cache } from 'react';
import 'server-only';
import { createTRPCContext } from './context';
import { createCallerFactory } from './init';
import { appRouter } from './routers/_app';

const createCaller = createCallerFactory(appRouter);

export const serverTRPC = cache(async () => {
  const ctx = await createTRPCContext();
  return createCaller(ctx);
});
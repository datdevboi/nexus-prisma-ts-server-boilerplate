import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { Prisma } from "./generated/prisma-client";

export interface Context {
  prisma: Prisma;
  request: ExpressContext;
}

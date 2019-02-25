import { ApolloServer } from "apollo-server-express";
import express from "express";
import { makePrismaSchema } from "nexus-prisma";
import path from "path";
import datamodelInfo from "./generated/nexus-prisma";
import { prisma } from "./generated/prisma-client";
import * as allTypes from "./resolvers";
import cookieParser = require("cookie-parser");

const schema = makePrismaSchema({
  // Provide all the GraphQL types we've implemented
  types: allTypes,

  // Configure the interface to Prisma
  prisma: {
    datamodelInfo,
    client: prisma
  },

  // Specify where Nexus should put the generated files
  outputs: {
    schema: path.join(__dirname, "./generated/schema.graphql"),
    typegen: path.join(__dirname, "./generated/nexus.ts")
  }

  // Configure nullability of input arguments: All arguments are non-nullable by default
  // nonNullDefaults: {
  //   input: false,
  //   output: false
  // }

  // Configure automatic type resolution for the TS representations of the associated types
  //   typegenAutoConfig: {
  //     sources: [
  //       {
  //         source: path.join(__dirname, "./types.ts"),
  //         alias: "types"
  //       }
  //     ]
  //   }
});

const app = express();

app.use(cookieParser());

const server = new ApolloServer({
  schema,
  // middlewares: [permissions],
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log(`Server is running on http://localhost:4000`);
});

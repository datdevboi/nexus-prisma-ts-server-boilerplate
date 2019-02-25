import { prismaObjectType } from "nexus-prisma";

export const User = prismaObjectType({
  name: "User",
  definition(t) {
    t.implements("Node");
    t.prismaFields(["email", "password"]);
  }
});

export const Mutation = prismaObjectType({
  name: "Mutation",
  definition(t) {
    t.prismaFields(["*"]);
    // t.field("register", {
    //   type: "String",
    //   args: {
    //     email: stringArg(),
    //     password: stringArg()
    //   },
    //   resolve: (parent, args, ctx) => {
    //     return "register";
    //   }
    // });
  }
});

export const Query = prismaObjectType({
  name: "Query",
  definition(t) {
    t.prismaFields(["*"]);
    // t.field("me", {
    //   type: "String",
    //   resolve: () => {
    //     return "hi";
    //   }
    // });
  }
});

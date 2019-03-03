import { prismaObjectType } from "nexus-prisma";
import { mutationType, queryType, stringArg } from "nexus/dist";

export const User = prismaObjectType({
  name: "User",
  definition(t) {
    t.implements("Node");
    t.prismaFields(["email", "password"]);
  }
});

export const UserMutations = mutationType({
  definition(t) {
    t.field("register", {
      type: User,
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true })
      },
      resolve(root, { email, password }, context, info) {
        return context.prisma.createUser({
          email,
          password
        });
      }
    });
  }
});

export const UserQuery = queryType({
  definition(t) {
    t.field("login", {
      type: User,
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true })
      },
      resolve(parent, { email, password }, ctx) {
        return ctx.prisma.user({
          email
        });
      }
    });
  }
});

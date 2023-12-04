import { prisma } from ".";

import type { User, Prisma } from "@prisma/client";

const DEFAULT_USERS: Prisma.UserCreateInput[] = [
  {
    email: 'ivoprovensi1@gmail.com',
    firstName: 'ivo',
    username: 'ivopr',
    id: "12345aqw"
  },
];

(async () => {
  try {
    await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: {
            email: user.email,
          },
          update: {
            ...user,
          },
          create: {
            ...user,
          },
        })
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
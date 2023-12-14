"use server";
import { prisma } from "database";

export async function activateUser(activationId: string) {
  try {
    const activation = await prisma.userActivation.findFirst({
      where: {
        id: activationId,
      },
      include: {
        user: true,
      },
    });

    if (!activation) {
      return "invalid-activation-code";
    }

    if (activation.used) {
      return "account-already-activated";
    }

    await prisma.userActivation.update({
      where: {
        id: activationId,
      },
      data: {
        used: true,
        user: {
          update: {
            status: "ACTIVE",
          },
        },
      },
    });

    return "user-activated";
  } catch {
    return "unknown-error";
  }
}

"use server";
import { prisma } from "@labioquim/qsar-database";

export async function testPrisma() {
  return prisma.user.findMany();
}

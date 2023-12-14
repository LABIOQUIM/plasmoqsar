/*
  Warnings:

  - You are about to drop the column `ec50` on the `descriptors` table. All the data in the column will be lost.
  - You are about to drop the column `pec50` on the `descriptors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "descriptors" DROP COLUMN "ec50",
DROP COLUMN "pec50",
ADD COLUMN     "results" TEXT[];

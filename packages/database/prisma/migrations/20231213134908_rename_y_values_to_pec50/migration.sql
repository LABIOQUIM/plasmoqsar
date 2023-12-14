/*
  Warnings:

  - You are about to drop the column `y_values` on the `descriptors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "descriptors" DROP COLUMN "y_values",
ADD COLUMN     "pec50" TEXT[];

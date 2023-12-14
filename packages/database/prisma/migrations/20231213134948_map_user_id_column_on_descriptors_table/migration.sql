/*
  Warnings:

  - You are about to drop the column `userId` on the `descriptors` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `descriptors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "descriptors" DROP CONSTRAINT "descriptors_userId_fkey";

-- AlterTable
ALTER TABLE "descriptors" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "descriptors" ADD CONSTRAINT "descriptors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "USER_STATUS" AS ENUM ('ACTIVE', 'AWAITING_ACTIVATION', 'INACTIVE');

-- AlterTable
ALTER TABLE "descriptors" ADD COLUMN     "ec50" TEXT[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" "USER_STATUS" NOT NULL DEFAULT 'AWAITING_ACTIVATION';

-- CreateTable
CREATE TABLE "user_activations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_activations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_activations_id_key" ON "user_activations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_activations_user_id_key" ON "user_activations"("user_id");

-- AddForeignKey
ALTER TABLE "user_activations" ADD CONSTRAINT "user_activations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

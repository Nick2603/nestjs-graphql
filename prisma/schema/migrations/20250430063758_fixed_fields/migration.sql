/*
  Warnings:

  - You are about to drop the column `profileId` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "profileId",
ADD COLUMN     "profile_id" TEXT;

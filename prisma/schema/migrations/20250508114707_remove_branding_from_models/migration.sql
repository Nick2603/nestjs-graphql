/*
  Warnings:

  - You are about to drop the column `brand` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `brand` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `brand` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `brand` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "articles" DROP COLUMN "brand";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "brand";

-- AlterTable
ALTER TABLE "user_roles" DROP COLUMN "brand";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "brand";

-- DropEnum
DROP TYPE "ArticleBrand";

-- DropEnum
DROP TYPE "ProfileBrand";

-- DropEnum
DROP TYPE "UserBrand";

-- DropEnum
DROP TYPE "UserRoleBrand";

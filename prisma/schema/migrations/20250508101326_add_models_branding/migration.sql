-- CreateEnum
CREATE TYPE "ArticleBrand" AS ENUM ('Article');

-- CreateEnum
CREATE TYPE "ProfileBrand" AS ENUM ('Profile');

-- CreateEnum
CREATE TYPE "UserRoleBrand" AS ENUM ('UserRole');

-- CreateEnum
CREATE TYPE "UserBrand" AS ENUM ('User');

-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "brand" "ArticleBrand" NOT NULL DEFAULT 'Article';

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "brand" "ProfileBrand" NOT NULL DEFAULT 'Profile';

-- AlterTable
ALTER TABLE "user_roles" ADD COLUMN     "brand" "UserRoleBrand" NOT NULL DEFAULT 'UserRole';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "brand" "UserBrand" NOT NULL DEFAULT 'User';

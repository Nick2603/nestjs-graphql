-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('USER', 'MANAGER', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role_ids" TEXT[];

-- CreateTable
CREATE TABLE "user_roles" (
    "id" TEXT NOT NULL,
    "title" "RoleEnum" NOT NULL,
    "user_ids" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_User_Role" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_User_Role_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_title_key" ON "user_roles"("title");

-- CreateIndex
CREATE INDEX "_User_Role_B_index" ON "_User_Role"("B");

-- AddForeignKey
ALTER TABLE "_User_Role" ADD CONSTRAINT "_User_Role_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_Role" ADD CONSTRAINT "_User_Role_B_fkey" FOREIGN KEY ("B") REFERENCES "user_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

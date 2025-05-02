/*
  Warnings:

  - You are about to drop the `_User_Role` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `article_ids` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_User_Role" DROP CONSTRAINT "_User_Role_A_fkey";

-- DropForeignKey
ALTER TABLE "_User_Role" DROP CONSTRAINT "_User_Role_B_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "article_ids" TEXT NOT NULL;

-- DropTable
DROP TABLE "_User_Role";

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "genres" TEXT[],
    "author_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_user_role" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_user_role_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_user_role_B_index" ON "_user_role"("B");

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_role" ADD CONSTRAINT "_user_role_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_role" ADD CONSTRAINT "_user_role_B_fkey" FOREIGN KEY ("B") REFERENCES "user_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `medium` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `semester_id` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the `_GroupToWork` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Work" DROP CONSTRAINT "Work_semester_id_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToWork" DROP CONSTRAINT "_GroupToWork_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToWork" DROP CONSTRAINT "_GroupToWork_B_fkey";

-- AlterTable
ALTER TABLE "Work" DROP COLUMN "medium",
DROP COLUMN "semester_id",
ADD COLUMN     "group_id" TEXT;

-- DropTable
DROP TABLE "_GroupToWork";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

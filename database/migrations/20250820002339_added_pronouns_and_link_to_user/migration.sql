/*
  Warnings:

  - Added the required column `link` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pronouns` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "pronouns" TEXT NOT NULL;

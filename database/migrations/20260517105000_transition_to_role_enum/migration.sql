-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'STAFF', 'ADMIN');

-- AlterTable
-- First add the column as nullable or with a default
ALTER TABLE "User" ADD COLUMN "role" "Role" NOT NULL DEFAULT 'STUDENT';

-- Update the new column based on the old boolean
UPDATE "User" SET "role" = 'ADMIN' WHERE "admin" = true;
UPDATE "User" SET "role" = 'STUDENT' WHERE "admin" = false;

-- Drop the old column
ALTER TABLE "User" DROP COLUMN "admin";

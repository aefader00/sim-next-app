-- CreateEnum
CREATE TYPE "GradeValue" AS ENUM ('P', 'NC', 'INC', 'W');

-- CreateTable
CREATE TABLE "SemesterGrade" (
    "id" TEXT NOT NULL,
    "grade" "GradeValue" NOT NULL,
    "userId" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,

    CONSTRAINT "SemesterGrade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SemesterGrade_semesterId_idx" ON "SemesterGrade"("semesterId");

-- CreateIndex
CREATE UNIQUE INDEX "SemesterGrade_userId_semesterId_key" ON "SemesterGrade"("userId", "semesterId");

-- AddForeignKey
ALTER TABLE "SemesterGrade" ADD CONSTRAINT "SemesterGrade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SemesterGrade" ADD CONSTRAINT "SemesterGrade_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE CASCADE ON UPDATE CASCADE;

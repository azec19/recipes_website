/*
  Warnings:

  - Added the required column `Difficultie` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Difficulties" AS ENUM ('EASY', 'MEDIUM', 'TECHNICAL', 'HARD', 'IMPOSSIBLE');

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "Difficultie" "Difficulties" NOT NULL;

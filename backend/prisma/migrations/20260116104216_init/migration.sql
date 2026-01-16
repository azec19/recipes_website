/*
  Warnings:

  - Changed the column `mood` on the `Recipe` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterTable

ALTER TABLE "Recipe"
  ALTER COLUMN "mood" TYPE "Mood"[]
  USING ARRAY[mood];

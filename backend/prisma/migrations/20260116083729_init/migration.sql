/*
  Warnings:

  - Changed the type of `preparation_time` on the `Recipe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cooking_time` on the `Recipe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "preparation_time",
ADD COLUMN     "preparation_time" INTEGER NOT NULL,
DROP COLUMN "cooking_time",
ADD COLUMN     "cooking_time" INTEGER NOT NULL;

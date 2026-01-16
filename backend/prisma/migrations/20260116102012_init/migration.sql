/*
  Warnings:

  - You are about to drop the column `calorie` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `cooking_time` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `preparation_time` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `Calorie` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Cooking_time` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Photo` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Preparation_time` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Quantity` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "calorie",
DROP COLUMN "cooking_time",
DROP COLUMN "photo",
DROP COLUMN "preparation_time",
DROP COLUMN "quantity",
ADD COLUMN     "Calorie" TEXT NOT NULL,
ADD COLUMN     "Cooking_time" INTEGER NOT NULL,
ADD COLUMN     "Photo" TEXT NOT NULL,
ADD COLUMN     "Preparation_time" INTEGER NOT NULL,
ADD COLUMN     "Quantity" TEXT NOT NULL;

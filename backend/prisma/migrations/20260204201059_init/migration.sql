/*
  Warnings:

  - You are about to drop the column `Name` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `Quantity` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `Type` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `Unit` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `Autor` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `Calorie` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `Cooking_time` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `Date` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `Difficultie` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `Instructions` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `Photo` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `Preparation_time` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `Quantity` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `Tools` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `_IngredientToRecipe` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `autor` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calorie` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cooking_time` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficultie` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructions` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preparation_time` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_IngredientToRecipe" DROP CONSTRAINT "_IngredientToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToRecipe" DROP CONSTRAINT "_IngredientToRecipe_B_fkey";

-- DropIndex
DROP INDEX "Ingredient_Name_key";

-- DropIndex
DROP INDEX "Recipe_Name_key";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "Name",
DROP COLUMN "Quantity",
DROP COLUMN "Type",
DROP COLUMN "Unit",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "type" "Types" NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "Autor",
DROP COLUMN "Calorie",
DROP COLUMN "Cooking_time",
DROP COLUMN "Date",
DROP COLUMN "Description",
DROP COLUMN "Difficultie",
DROP COLUMN "Instructions",
DROP COLUMN "Name",
DROP COLUMN "Photo",
DROP COLUMN "Preparation_time",
DROP COLUMN "Quantity",
DROP COLUMN "Tools",
ADD COLUMN     "autor" TEXT NOT NULL,
ADD COLUMN     "calorie" TEXT NOT NULL,
ADD COLUMN     "cooking_time" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "difficultie" "Difficulties" NOT NULL,
ADD COLUMN     "instructions" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL,
ADD COLUMN     "preparation_time" INTEGER NOT NULL,
ADD COLUMN     "quantity" TEXT NOT NULL,
ADD COLUMN     "tools" TEXT[];

-- DropTable
DROP TABLE "_IngredientToRecipe";

-- CreateTable
CREATE TABLE "StockIngredient" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" "Units" NOT NULL,

    CONSTRAINT "StockIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "recipeId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" "Units" NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("recipeId","ingredientId")
);

-- CreateIndex
CREATE UNIQUE INDEX "StockIngredient_ingredientId_key" ON "StockIngredient"("ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeIngredient_recipeId_key" ON "RecipeIngredient"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeIngredient_ingredientId_key" ON "RecipeIngredient"("ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_name_key" ON "Recipe"("name");

-- AddForeignKey
ALTER TABLE "StockIngredient" ADD CONSTRAINT "StockIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

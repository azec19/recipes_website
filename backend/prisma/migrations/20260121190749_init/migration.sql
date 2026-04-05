-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('CHILL', 'PARTY', 'BEFORE', 'MAIN_DISHES', 'DESERT');

-- CreateEnum
CREATE TYPE "Types" AS ENUM ('FECULENT', 'LEGUME', 'FRUIT', 'LAITIER', 'VIANDE', 'POISSON', 'MATIERE_GRASSE', 'EPICE', 'LIQUIDE', 'AUTRE');

-- CreateEnum
CREATE TYPE "Units" AS ENUM ('KG', 'GR', 'L', 'CL', 'DL', 'UNITE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Type" "Types" NOT NULL,
    "Quantity" DOUBLE PRECISION NOT NULL,
    "Unit" "Units" NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Autor" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Instructions" TEXT NOT NULL,
    "mood" "Mood"[],
    "Preparation_time" INTEGER NOT NULL,
    "Cooking_time" INTEGER NOT NULL,
    "Quantity" TEXT NOT NULL,
    "Photo" TEXT NOT NULL,
    "Tools" TEXT[],
    "Calorie" TEXT NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IngredientToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_IngredientToRecipe_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_Name_key" ON "Ingredient"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_Name_key" ON "Recipe"("Name");

-- CreateIndex
CREATE INDEX "_IngredientToRecipe_B_index" ON "_IngredientToRecipe"("B");

-- AddForeignKey
ALTER TABLE "_IngredientToRecipe" ADD CONSTRAINT "_IngredientToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToRecipe" ADD CONSTRAINT "_IngredientToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

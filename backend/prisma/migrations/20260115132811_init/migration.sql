-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('CHILL', 'PARTY', 'BEFORE', 'MAIN_DISHES', 'DESERT');

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "Quantity" DOUBLE PRECISION NOT NULL,
    "Unit" TEXT NOT NULL,
    "recipeId" INTEGER,

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
    "mood" "Mood" NOT NULL,
    "preparation_time" TEXT NOT NULL,
    "cooking_time" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "Tools" TEXT[],
    "calorie" TEXT NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_Name_key" ON "Ingredient"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_Name_key" ON "Recipe"("Name");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

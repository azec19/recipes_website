import { prisma } from './prisma.js'

export async function createRecipeIngredient(recipeId, ingredientId, quantity, unit) {
    // Create a new ingredient
    const Recipeingredient = await prisma.RecipeIngredient.create({
        data: {
            recipeId: recipeId,
            ingredientId: ingredientId,
            quantity: quantity,
            unit: unit
        },
        include: {
            ingredient: true,
        },
    })
    return Recipeingredient
}

export async function deleteRecipeIngredient(id_) {
    // Create a new ingredient
    const ingredient = await prisma.RecipeIngredient.delete({
        where: {
            id: id_
        },
        include: {
            ingredient: true,
        },
    })
    return ingredient
}

export async function updateRecipeIngredient(id_, recipeId, ingredientId, quantity, unit) {
    // Create a new ingredient

    const ingredient = await prisma.RecipeIngredient.update({
        where: {
            id: id_,
        },
        data: {
            recipeId: recipeId,
            ingredientId: ingredientId,
            quantity: quantity,
            unit: unit
        },
        include: {
            ingredient: true,
        },
    })
    return ingredient
}


export async function GetAllRecipeIngredient() {
    // Fetch all ingredients
    return await prisma.RecipeIngredient.findMany({
        include: {
            ingredient: true,
        },
    });
}

export async function findByRecipe(recipeId, ingredientId) {
    // Fetch ingredients with right name
    return await prisma.RecipeIngredient.findUnique({
        where: {
            recipeId: recipeId,
            ingredientId: ingredientId
        },
        include: {
            ingredient: true,
        },
    })
}

export async function findById(id_) {
    // Fetch ingredients with right name
    return await prisma.RecipeIngredient.findUnique({
        where: {
            id: id_
        },
        include: {
            ingredient: true,
        },
    })
}




const ingredientRepository = { findById, findByRecipe, createRecipeIngredient, GetAllRecipeIngredient, deleteRecipeIngredient, updateRecipeIngredient };
export default ingredientRepository;

import { prisma } from './prisma.js'

export async function createRecipeIngredient(recipeId, ingredientId, quantity, unit) {
    // Create a new ingredient
    
    const Recipeingredient = await prisma.recipeIngredient.create({
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

export async function deleteRecipeIngredient(recipeId, ingredientId) {
    // Create a new ingredient
    const ingredient = await prisma.recipeIngredient.delete({
        where: {
            recipeId: recipeId,
            ingredientId: ingredientId,
        },
        include: {
            ingredient: true,
        },
    })
    return ingredient
}

export async function updateRecipeIngredient(recipeId, ingredientId, quantity, unit) {
    // Create a new ingredient

    const ingredient = await prisma.recipeIngredient.update({
        where: {
            recipeId_ingredientId: {
                recipeId: recipeId,
                ingredientId: ingredientId
            }
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
    return await prisma.recipeIngredient.findMany({
        include: {
            ingredient: true,
        },
    });
}

export async function findByRecipe(recipeId, ingredientId) {
    // Fetch ingredients with right name
    return await prisma.recipeIngredient.findUnique({
        where: {
            recipeId_ingredientId: {
                recipeId: recipeId,
                ingredientId: ingredientId
            }
        },
        include: {
            ingredient: true,
        },
    })
}

export async function findById(ingredientId, recipeId) {
    // Fetch ingredients with right name
    return await prisma.recipeIngredient.findUnique({
        where: {
            recipeId: recipeId,
            ingredientId: ingredientId,
        },
        include: {
            ingredient: true,
        },
    })
}




const ingredientRepository = { findById, findByRecipe, createRecipeIngredient, GetAllRecipeIngredient, deleteRecipeIngredient, updateRecipeIngredient };
export default ingredientRepository;

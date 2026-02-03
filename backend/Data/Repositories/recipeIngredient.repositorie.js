import { prisma } from './prisma.js'

export async function createRecipeIngredient(recipeID, ingredientID, quantity, unit) {
    // Create a new ingredient
    const Recipeingredient = await prisma.RecipeIngredient.create({
        data: {
            recipeId: recipeID,
            ingredientId: ingredientID,
            quantity: quantity,
            unit: unit
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
    })
    return ingredient
}

export async function updateRecipeIngredient(id_, recipeID, ingredientID, quantity, unit) {
    // Create a new ingredient
    
    const ingredient = await prisma.RecipeIngredient.update({
        where: {
            id: id_,
        },
        data: {
            recipeId: recipeID,
            ingredientId: ingredientID,
            quantity: quantity,
            unit: unit
        }
    })
    return ingredient
}


export async function GetAllRecipeIngredient() {
    // Fetch all ingredients
    return await prisma.RecipeIngredient.findMany();
}

export async function findByRecipe(recipeID, ingredientID) {
    // Fetch ingredients with right name
    return await prisma.RecipeIngredient.findUnique({
        where: {
            recipeID: recipeID,
            ingredientID: ingredientID
        },
    })
}

export async function findById(id_) {
    // Fetch ingredients with right name
    return await prisma.RecipeIngredient.findUnique({
        where: {
            id: id_
        },
    })
}




    const ingredientRepository = {findById, findByRecipe, createRecipeIngredient, GetAllRecipeIngredient, deleteRecipeIngredient, updateRecipeIngredient };
    export default ingredientRepository;

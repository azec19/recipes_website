import { prisma } from './prisma.js'

export async function createStockIngredient(ingredientId, user_name, quantity, unit) {
    // Create a new ingredient
    const ingredient = await prisma.StockIngredient.create({
        data: {
            ingredientId: ingredientId,
            user: user_name,
            quantity: quantity,
            unit: unit,
        }, include: {
            ingredient: true,
        },
    })
    return ingredient
}

export async function deleteStockIngredient(ingredientId,user_name ) {
    // Create a new ingredient
    const ingredient = await prisma.StockIngredient.delete({
        where: {
            id: ingredientId,
            user: user_name,
        }, include: {
            ingredient: true,
        },
    })
    return ingredient
}

export async function updateStockIngredient(id_, ingredientId, user_name, quantity, unit) {
    const ingredient = await prisma.StockIngredient.update({
        where: {
            id: id_,
            user: user_name,
        },
        data: {
            ingredientId: ingredientId,
            quantity: quantity,
            unit: unit
        }, include: {
            ingredient: true,
        },
    })
    return ingredient
}


export async function GetAllStockIngredient(user_name) {
    // Fetch all ingredients
    return await prisma.StockIngredient.findMany({
        where: {
            user: user_name
        },
        include: {
            ingredient: true,
        },
    });
}

export async function findById(id_, user_name) {
    // Fetch ingredients with right name
    return await prisma.StockIngredient.findUnique({
        where: {
            id: id_,
            user: user_name
        },
        include: {
            ingredient: true,
        },
    })
}

export async function findByIngredientID(IngredientID, user_name) {
    // Fetch ingredients with right name
    return await prisma.StockIngredient.findUnique({
        where: {
            ingredientId: IngredientID,
            user: user_name
        },
        include: {
            ingredient: true,
        },
    })
}


const ingredientRepository = { findById, findByIngredientID, createStockIngredient, GetAllStockIngredient, deleteStockIngredient, updateStockIngredient };
export default ingredientRepository;

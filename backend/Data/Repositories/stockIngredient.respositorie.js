import { prisma } from './prisma.js'

export async function createStockIngredient(ingredientId, quantity, unit) {
    // Create a new ingredient
    const ingredient = await prisma.StockIngredient.create({
        data: {
            ingredientId: ingredientId,
            quantity: quantity,
            unit: unit,
        }, include: {
            ingredient: true,
        },
    })
    return ingredient
}

export async function deleteStockIngredient(ingredientId) {
    // Create a new ingredient
    const ingredient = await prisma.StockIngredient.delete({
        where: {
            id: ingredientId
        }, include: {
            ingredient: true,
        },
    })
    return ingredient
}

export async function updateStockIngredient(id_, ingredientId, quantity, unit) {
    const ingredient = await prisma.StockIngredient.update({
        where: {
            id: id_,
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


export async function GetAllStockIngredient() {
    // Fetch all ingredients
    return await prisma.StockIngredient.findMany({
        include: {
            ingredient: true,
        },
    });
}

export async function findById(id_) {
    // Fetch ingredients with right name
    return await prisma.StockIngredient.findUnique({
        where: {
            id: id_
        },
        include: {
            ingredient: true,
        },
    })
}

export async function findByIngredientID(IngredientID) {
    // Fetch ingredients with right name
    return await prisma.StockIngredient.findUnique({
        where: {
            ingredientId: IngredientID
        },
        include: {
            ingredient: true,
        },
    })
}


const ingredientRepository = { findById, findByIngredientID, createStockIngredient, GetAllStockIngredient, deleteStockIngredient, updateStockIngredient };
export default ingredientRepository;

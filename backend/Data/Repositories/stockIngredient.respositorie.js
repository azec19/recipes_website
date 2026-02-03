import { prisma } from './prisma.js'

export async function createStockIngredient(ingerdientID, quantity, unit) {
    // Create a new ingredient
    const ingredient = await prisma.StockIngredient.create({
        data: {
            ingredientID: ingerdientID,
            Quantity: quantity,
            Unit: unit,
        },
    })
    return ingredient
}

export async function deleteStockIngredient(ingredientID) {
    // Create a new ingredient
    const ingredient = await prisma.StockIngredient.delete({
        where: {
            ingredientID: ingredientID
        },
    })
    return ingredient
}

export async function updateStockIngredient(ingerdientID, quantity, unit) {
    // Create a new ingredient
    
    const ingredient = await prisma.StockIngredient.update({
        where: {
            id: ingerdientID,
        },
        data: {
            Quantity: quantity,
            Unit: unit
        }
    })
    return ingredient
}


export async function GetAllStockIngredient() {
    // Fetch all ingredients
    return await prisma.StockIngredient.findMany();
}

export async function findById(id_) {
    // Fetch ingredients with right name
    return await prisma.StockIngredient.findUnique({
        where: {
            id: id_
        },
    })
}

export async function findByIngredientID(IngredientID) {
    // Fetch ingredients with right name
    return await prisma.StockIngredient.findUnique({
        where: {
            ingredientID: IngredientID
        },
    })
}


    const ingredientRepository = {findById, findByIngredientID, createStockIngredient, GetAllStockIngredient, deleteStockIngredient, updateStockIngredient };
    export default ingredientRepository;

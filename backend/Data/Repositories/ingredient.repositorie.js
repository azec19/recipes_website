import { prisma } from './prisma.js'

export async function createIngredient(name, type, quantity, unit) {
    // Create a new ingredient
    const ingredient = await prisma.ingredient.create({
        data: {
            Name: name,
            Type: type,
            Quantity: quantity,
            Unit: unit,
            
        },
    })
    return ingredient
}

export async function deleteIngredient(name) {
    // Create a new ingredient
    const ingredient = await prisma.ingredient.delete({
        where: {
            Name: name
        },
    })
    return ingredient
}

export async function updateIngredient(name, type, quantity, unit) {
    // Create a new ingredient
    const ingredient = await prisma.ingredient.update({
        where: {
          Name: name,
        },
        data: {
          Type: type,
          Quantity: quantity,
          Unit: unit
        }
    })
    return ingredient
}


export async function GetAllIngredient() {
    // Fetch all ingredients
    return await prisma.ingredient.findMany();
}

export async function findByName(name) {
    // Fetch ingredients with right name
    return await prisma.ingredient.findUnique({
        where: {
          Name: name,
        },
    })
}

export async function findByType(type) {
    // Fetch ingredients with right type
    return await prisma.ingredient.findMany({
        where: {
          Type: type
        },
    })
}

const ingredientRepository = {findByType, findByName, createIngredient, GetAllIngredient, deleteIngredient, updateIngredient};
export default ingredientRepository;

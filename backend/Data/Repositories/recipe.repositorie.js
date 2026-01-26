import { diff } from 'node:util';
import { prisma } from './prisma.js'

export async function GetAllRecipe() {
    // Fetch all recipes
    return await prisma.recipe.findMany({
        include: {
            Ingredients: true
        }
    }
    );
}

export async function CreateRecipe(name, date, autor, description, instructions, ingredients, mood, preparationTime, cookingTime, quantity, difficultie, photo, tools, calorie) {
    // Create a new recipe
    
    const recipe = await prisma.recipe.create({
        data: {
            Name: name,
            Date: date,
            Autor: autor,
            Description: description,
            Instructions: instructions,
            Ingredients: { connectOrCreate: ingredients },
            mood: mood,
            Preparation_time: preparationTime,
            Cooking_time: cookingTime,
            Quantity: quantity,
            Difficultie: difficultie,
            Photo: photo,
            Tools: tools,
            Calorie: calorie
        },
    })
    return recipe
}

export async function findByName(name) {
    // Fetch recipes with right name
    
    const temp = await prisma.recipe.findFirst({
        where: {
            Name: {
                contains: name,
                mode: 'insensitive'
            },
        },
        include: {
            Ingredients: true
        }
    })
    return temp;
    
}


export async function UpdateRecipe(id_, name, date, autor, description, instructions, ingredients, Mood, preparationTime, cookingTime, quantity, difficultie, photo, tools, calorie) {
    // Create a new recipe

    const recipe = await prisma.recipe.update({
        where: {
            id: id_,
        },
        data: {
            Name: name,
            Date: date,
            Autor: autor,
            Description: description,
            Instructions: instructions,
            Ingredients: { connectOrCreate: ingredients },
            mood: Mood,
            Preparation_time: preparationTime,
            Cooking_time: cookingTime,
            Quantity: quantity,
            Difficultie: difficultie,
            Photo: photo,
            Tools: tools,
            Calorie: calorie
        }
    })
    return recipe
}

export async function DeleteRecipe(name) {
    // Create a new recipe
    const recipe = await prisma.recipe.delete({
        where: {
            Name: name
        },
    })
    return recipe
}

export async function findById(id_) {
    // Fetch recipe with right name
    return await prisma.recipe.findUnique({
        where: {
            id: id_
        },
        include: {
            Ingredients: true
        }
    })
}

export async function findByAutor(autor) {
    // Fetch recipes with right ID
    return await prisma.recipe.findMany({
        where: {
            Autor: {
                contains: autor,
                mode: 'insensitive'
            },
        },
        include: {
            Ingredients: true
        }
    })
}


const recipeRepository = {
    GetAllRecipe,
    CreateRecipe,
    findByName,
    UpdateRecipe,
    DeleteRecipe,
    findById,
    findByAutor,
}
export default recipeRepository;

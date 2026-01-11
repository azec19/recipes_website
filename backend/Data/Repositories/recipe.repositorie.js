import { prisma } from './prisma.js'

export async function createrecipe(name, date, autor, description, instructions, ingredients, mood, preparationTime, cookingTime, quantity, photo, tools, calorie) {
    // Create a new recipe
    const recipe = await prisma.recipe.create({
        data: {
            Name: name,
            Date: date,
            Autor: autor,
            Description: description,
            Intructions: instructions,
            Ingredients: ingredients,
            Mood: mood,
            PreparationTime: preparationTime, 
            CookingTime: cookingTime, 
            Quantity: quantity, 
            Photo: photo, 
            Tools: tools,
            Calorie: calorie {
        },
    })
    return recipe
}

export async function deleterecipe(name) {
    // Create a new recipe
    const recipe = await prisma.recipe.delete({
        where: {
          Name: Name
        },
    })
    return recipe
}

export async function updaterecipe(name, date, autor, description, instructions, ingredients, mood, preparationTime, cookingTime, quantity, photo, tools, calorie) {
    // Create a new recipe
    const recipe = await prisma.recipe.update({
        where: {
          Name: name
        },
        data: {
            Date: date,
            Autor: autor,
            Description: description,
            Intructions: instructions,
            Ingredients: ingredients,
            Mood: mood,
            PreparationTime: preparationTime, 
            CookingTime: cookingTime, 
            Quantity: quantity, 
            Photo: photo, 
            Tools: tools,
            Calorie: calorie        }
    })
    return recipe
}


export async function GetAllrecipe() {
    // Fetch all recipes
    return await prisma.recipe.findMany();
}

export async function findByName(name) {
    // Fetch recipes with right ID
    return await prisma.recipe.findUnique({
        where: {
          Name: name,
        },
    })
}

export async function findByAutor(Autor) {
    // Fetch recipes with right ID
    return await prisma.recipe.findMany({
        where: {
          Autor: autor
        },
    })
}

export async function findByMood(mood) {
    // Fetch recipes with right ID
    return await prisma.recipe.findMany({
        where: {
          Mood: mood
        },
    })
}


const recipeRepository = {findByMood, findByName, findByAutor, createrecipe, GetAllrecipe, deleterecipe, updaterecipe};
export default recipeRepository;

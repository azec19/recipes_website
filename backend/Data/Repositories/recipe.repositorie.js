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

export async function CreateRecipe(name, date, autor, description, instructions, ingredients, Mood, preparationTime, cookingTime, quantity, photo, tools, calorie) {
    // Create a new recipe
    const recipe = await prisma.recipe.create({
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
            Photo: photo,
            Tools: tools,
            Calorie: calorie
        },
    })
    return recipe
}

export async function findByName(name) {
    // Fetch recipes with right name
    return await prisma.recipe.findUnique({
        where: {
            Name: name,
        },
    })
}

export async function UpdateRecipe(name, date, autor, description, instructions, ingredients, Mood, preparationTime, cookingTime, quantity, photo, tools, calorie) {
    // Create a new recipe
    console.log(ingredients);
    
    const recipe = await prisma.recipe.update({
        where: {
            Name: name
        },
        data: {
            Date: date,
            Autor: autor,
            Description: description,
            Instructions: instructions,
            Ingredients: { connectOrCreate: ingredients },
            mood: Mood,
            Preparation_time: preparationTime,
            Cooking_time: cookingTime,
            Quantity: quantity,
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


export async function findByAutor(autor) {
    // Fetch recipes with right ID
    return await prisma.recipe.findMany({
        where: {
            Autor: autor
        },
    })
}


const recipeRepository = {
    GetAllRecipe,
    CreateRecipe,
    findByName,
    UpdateRecipe,
    DeleteRecipe,
    findByAutor,
}
export default recipeRepository;

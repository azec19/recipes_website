import { prisma } from './prisma.js'

export async function GetAllRecipe() {
    // Fetch all recipes
    return await prisma.recipe.findMany({
        include: {
            ingredients: {
                include: { ingredient: true } // Grâce à la relation, Prisma fait la jointure tout seul
            }
        }
    }
    );
}

export async function CreateRecipe(name, date, autor, description, instructions, recipeingredients, mood, preparationTime, cookingTime, quantity, difficultie, photo, tools, calorie) {
    // Create a new recipe

    const recipe = await prisma.recipe.create({
        data: {
            name: name,
            date: date,
            autor: autor,
            description: description,
            instructions: instructions,
            ingredients: { connectOrCreate: recipeingredients },
            mood: mood,
            preparation_time: preparationTime,
            cooking_time: cookingTime,
            quantity: quantity,
            difficultie: difficultie,
            photo: photo,
            tools: tools,
            calorie: calorie
        },
    })
    return recipe
}

export async function findByName(name) {
    // Fetch recipes with right name

    const temp = await prisma.recipe.findFirst({
        where: {
            name: {
                contains: name,
                mode: 'insensitive'
            },
        },
        include: {
            ingredients: {
                include: { ingredient: true } // Grâce à la relation, Prisma fait la jointure tout seul
            }
        }
    })
    return temp;

}


export async function UpdateRecipe(id_, name, date, autor, description, instructions, recipeingredients, Mood, preparationTime, cookingTime, quantity, difficultie, photo, tools, calorie) {
    // Create a new recipe

    const recipe = await prisma.recipe.update({
        where: {
            id: id_,
        },
        data: {
            name: name,
            date: date,
            autor: autor,
            description: description,
            instructions: instructions,
            ingredients: { connectOrCreate: recipeingredients },
            mood: Mood,
            preparation_time: preparationTime,
            cooking_time: cookingTime,
            quantity: quantity,
            difficultie: difficultie,
            photo: photo,
            tools: tools,
            calorie: calorie
        }
    })
    return recipe
}

export async function DeleteRecipe(name) {
    // Create a new recipe
    return await prisma.recipe.delete({
        where: {
            name: name
        },
    })
}

export async function findById(id_) {
    // Fetch recipe with right name
    return await prisma.recipe.findUnique({
        where: {
            id: id_
        },
        include: {
            ingredients: {
                include: { ingredient: true } // Grâce à la relation, Prisma fait la jointure tout seul
            }
        }
    })
}

export async function findByAutor(autor) {
    // Fetch recipes with right ID
    return await prisma.recipe.findMany({
        where: {
            autor: {
                contains: autor,
                mode: 'insensitive'
            },
        },
        include: {
            ingredients: {
                include: { ingredient: true } // Grâce à la relation, Prisma fait la jointure tout seul
            }
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

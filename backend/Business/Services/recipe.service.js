import recipeDAO from '../../Data/Repositories/recipe.repositorie.js'
import ingredientDAO from '../../Data/Repositories/ingredient.repositorie.js'
import recipeingredientService from './recipeIngredient.service.js'

export async function getAllRecipe() {
    const recipes = await recipeDAO.GetAllRecipe();
    if (!recipes) {
        throw new Error("No recipes found");
    }
    return recipes;
};


export async function createRecipe(name,
    date,
    autor,
    description,
    instructions,
    ingredients,
    mood,
    preparation_time,
    cooking_time,
    quantity,
    difficultie,
    photo,
    tools,
    calorie,) {

    const existing = await recipeDAO.findByName(name);
    if (existing) {
        throw new Error("Recipe already exists");
    }


    
    const date_ = new Date(date)
    if (date_ == "Invalid Date")
        throw new Error("Date is invalid");

    const recipe = await recipeDAO.CreateRecipe(name,
        date_,
        autor,
        description,
        instructions,
        [],
        mood,
        parseInt(preparation_time),
        parseInt(cooking_time),
        quantity,
        difficultie,
        photo,
        tools,
        calorie,);

    const Recipeingredients = ingredients.map(async i => (
        await recipeingredientService.createRecipeIngredient(recipe.id, i.ingredient.name, i.ingredient.type, i.quantity, i.unit)
    ));

    return await recipeDAO.UpdateRecipe(recipe.id, null, null, null, null, null, Recipeingredients, null, null, null, null, null,null, null,null)

};

export async function getRecipeByName(name) {
    const recipe = await recipeDAO.findByName(name);
    if (!recipe) {
        throw new Error("Recipe not found");
    }
    return recipe;
};

export async function getRecipeByFullTextSearch(text) {
    const ingredients = await ingredientDAO.FullTextSearch(text);
    if (!ingredients) {
        throw new Error("Ingredient not found");
    }
    return ingredients;
};

export async function updateRecipe(id,
    name,
    date,
    autor,
    description,
    instructions,
    ingredients,
    mood,
    preparation_time,
    cooking_time,
    quantity,
    difficultie,
    photo,
    tools,
    calorie,) {
    const recipe = await recipeDAO.findById(id);
    if (!recipe) {
        throw new Error("Recipe doesn't exist");
    }

    let Recipeingredients = []
    if (Ingredients) {
        recipe.ingredients.forEach(async (ingredient) => 
        await recipeingredientService.deleteRecipeIngredient(ingredient.ingredientId, ingredient.recipeId))

        Recipeingredients = ingredients.map(async i => (
        await recipeingredientService.createRecipeIngredient(recipe.id, i.ingredient.name, i.ingredient.type, i.quantity, i.unit)
    ));
    const date_ = new Date(date)
    if (date_ == "Invalid Date")
        throw new Error("Date is invalid");
    }
    name = name ? name : recipe.name
    date = date ? date : recipe.date
    autor = autor ? autor : recipe.autor
    description = description ? description : recipe.description
    instructions = instructions ? instructions : recipe.instructions
    Recipeingredients = Recipeingredients.lenght === 0 ? recipe.ingredients : Recipeingredients
    mood = mood ? mood : recipe.mood
    preparation_time = preparation_time ? preparation_time : recipe.preparation_time
    cooking_time = cooking_time ? cooking_time : recipe.cooking_time
    quantity = quantity ? quantity : recipe.quantity
    difficultie = difficultie ? difficultie : recipe.difficultie
    photo = photo ? photo : recipe.photo
    tools = tools ? tools : recipe.tools
    calorie = calorie ? calorie : recipe.calorie

    return recipeDAO.UpdateRecipe(id, name,
        date,
        autor,
        description,
        instructions,
        Recipeingredients,
        mood,
        preparation_time,
        cooking_time,
        quantity,
        difficultie,
        photo,
        tools,
        calorie,);
};

export async function deleteRecipe(name) {
    const recipe = await recipeDAO.findByName(name);
    if (!recipe) {
        throw new Error("Recipe doesn't exist");
    }
    return recipeDAO.DeleteRecipe(name);
};

export async function getRecipeByAutor(autor) {
    const recipe = await recipeDAO.findByAutor(autor);
    if (!recipe) {
        throw new Error("Recipe not found");
    }
    return recipe;
}

export async function getRecipeByMood(mood_) {
    const recipes = await recipeDAO.GetAllRecipe();
    var result = []
    recipes.forEach(recipe => {
        if ((recipe.mood).includes(mood_))
            result.push(recipe)
    });
    return result
}

export async function getRecipesByPreparationTime(time) {
    const recipes = await recipeDAO.GetAllRecipe();
    var result = []
    recipes.forEach(recipe => {
        if (recipe.Preparation_time <= time)
            result.push(recipe)
    });
    return result
}

export async function getRecipesByCookingTime(time) {
    const recipes = await recipeDAO.GetAllRecipe();
    var result = []
    recipes.forEach(recipe => {
        if (recipe.Cooking_time <= time)
            result.push(recipe)
    });
    return result
}

// check in a list of ingredient object if an ingredient string is included
// function SearchIngredientByName(IngredientsList, Ingredient) {
//     for (const ingredient of IngredientsList) {
//         if (recipeingredientService.getRecipeIngredientById ingredient.Name === Ingredient.Name) {
//             return true;
//         }
//     }
//     return false

// }

// la liste d'ingredients, tu sais pas trop ce qu'il y a dedans. Faudra donc faire la fonction quand tu sauras.
// export async function getRecipesByIngredients(ingredients) {

//     const recipes = await recipeDAO.GetAllRecipe();
//     var result = []
//     recipes.forEach(recipe => {
//         var flag = true
//         ingredients.forEach(ingredient => {
//             flag = flag && SearchIngredientByName(recipe.Ingredients, ingredient)
//         });
//         if (flag)
//             result.push(recipe)
//     });
//     return result
// }






const recipeService = {
    getAllRecipe,
    createRecipe,
    getRecipeByName,
    updateRecipe,
    deleteRecipe,
    getRecipeByAutor,
    getRecipeByMood,
    getRecipesByPreparationTime,
    getRecipesByCookingTime,
    // getRecipesByIngredients
}

export default recipeService;

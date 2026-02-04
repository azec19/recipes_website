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


export async function createRecipe(Name,
    date,
    Autor,
    Description,
    Instructions,
    Ingredients,
    mood,
    Preparation_time,
    Cooking_time,
    Quantity,
    Difficultie,
    Photo,
    Tools,
    Calorie,) {

    const existing = await recipeDAO.findByName(Name);
    if (existing) {
        throw new Error("Recipe already exists");
    }


    const date_ = new Date(date)
    if (date_ == "Invalid Date")
        throw new Error("Date is invalid");

    const recipe = await recipeDAO.CreateRecipe(Name,
        date_,
        Autor,
        Description,
        Instructions,
        [],
        mood,
        parseInt(Preparation_time),
        parseInt(Cooking_time),
        Quantity,
        Difficultie,
        Photo,
        Tools,
        Calorie,);

    const Recipeingredients = Ingredients.map(async i => (
        await recipeingredientService.createRecipeIngredient(recipe.id, i.name, i.type, i.quantity, i.unit)
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
    Name,
    Date,
    Autor,
    Description,
    Instructions,
    Ingredients,
    mood,
    Preparation_time,
    Cooking_time,
    Quantity,
    Difficultie,
    Photo,
    Tools,
    Calorie,) {
    const recipe = await recipeDAO.findById(id);
    if (!recipe) {
        throw new Error("Recipe doesn't exist");
    }

    let Recipeingredients = []
    if (Ingredients) {
        Recipeingredients = Ingredients.map(async i => (
        await recipeingredientService.createRecipeIngredient(recipe.id, i.name, i.type, i.quantity, i.unit)
    ));
    }
    Name = Name ? Name : recipe.Name
    Date = Date ? Date : recipe.Date
    Autor = Autor ? Autor : recipe.Autor
    Description = Description ? Description : recipe.Description
    Instructions = Instructions ? Instructions : recipe.Instructions
    ingredientsConnectOrCreate = ingredientsConnectOrCreate.lenght === 0 ? recipe.Ingredients : ingredientsConnectOrCreate
    mood = mood ? mood : recipe.mood
    Preparation_time = Preparation_time ? Preparation_time : recipe.Preparation_time
    Cooking_time = Cooking_time ? Cooking_time : recipe.Cooking_time
    Quantity = Quantity ? Quantity : recipe.Quantity
    Difficultie = Difficultie ? Difficultie : recipe.Difficultie
    Photo = Photo ? Photo : recipe.Photo
    Tools = Tools ? Tools : recipe.Tools
    Calorie = Calorie ? Calorie : recipe.Calorie

    return recipeDAO.UpdateRecipe(id, Name,
        Date,
        Autor,
        Description,
        Instructions,
        ingredientsConnectOrCreate,
        mood,
        Preparation_time,
        Cooking_time,
        Quantity,
        Difficultie,
        Photo,
        Tools,
        Calorie,);
};

export async function deleteRecipe(name) {
    const existing = await recipeDAO.findByName(name);
    if (!existing) {
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

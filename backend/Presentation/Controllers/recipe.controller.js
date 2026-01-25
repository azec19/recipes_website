import { log } from 'node:console';
import recipeService from '../../Business/Services/recipe.service.js'

export async function getAllRecipe(req, res) {
    try {
        const recipes = await recipeService.getAllRecipe();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export async function createRecipe(req, res) {
    
    try {
        const newrecipe = await recipeService.createRecipe(
            req.body.Name,
            req.body.Date,
            req.body.Autor,
            req.body.Description,
            req.body.Instructions,
            req.body.Ingredients,
            req.body.Mood,
            req.body.Preparation_time,
            req.body.Cooking_time,
            req.body.Quantity,
            req.body.Difficultie,
            req.body.Photo,
            req.body.Tools,
            req.body.Calorie,);
        res.status(201).json(newrecipe);
    } catch (error) {
        res.status(400).json({ message: error.message + " : " + req.body.Name});
    }
};

export async function getRecipeByName(req, res) {
    try {
        const name = req.params.name;
        if (name) {
            const recipe = await recipeService.getRecipeByName(name);
            res.status(200).json(recipe);
        }
        else {
            res.status(404).json({ message: "invalid name in the request" });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export async function updateRecipe(req, res) {
    try {
        const newrecipe = await recipeService.updateRecipe(
            req.body.id,
            req.body.Name,
            req.body.Date,
            req.body.Autor,
            req.body.Description,
            req.body.Instructions,
            req.body.Ingredients,
            req.body.Mood,
            req.body.Preparation_time,
            req.body.Cooking_time,
            req.body.Quantity,
            req.body.Difficultie,
            req.body.Photo,
            req.body.Tools,
            req.body.Calorie,);
        res.status(201).json(newrecipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export async function deleteRecipe(req, res) {
    try {
        const newrecipe = await recipeService.deleteRecipe(req.params.name);
        res.status(201).json(newrecipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



export async function getRecipeByAutor(req, res) {
    try {
        const autor = req.params.autor;
        if (autor) {
            const recipe = await recipeService.getRecipeByAutor(autor);
            res.status(200).json(recipe);
        }
        else {
            res.status(404).json({ message: "invalid autor in the request" });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export async function getRecipeByMood(req, res) {
    try {
        const mood = req.params.mood;
        if (mood) {
            const recipe = await recipeService.getRecipeByMood(mood);
            res.status(200).json(recipe);
        }
        else {
            res.status(404).json({ message: "invalid mood in the request" });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export async function getRecipesByPreparationTime(req, res) {
    try {
        const preparation_time = parseInt(req.params.time);
        if (!isNaN(preparation_time)) {
            const recipe = await recipeService.getRecipesByPreparationTime(preparation_time);
            res.status(200).json(recipe);
        }
        else {
            res.status(404).json({ message: "invalid time in the request" });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export async function getRecipesByCookingTime(req, res) {
    try {
        const cooking_time = parseInt(req.params.time);
        if (!isNaN(cooking_time)) {
            const recipe = await recipeService.getRecipesByCookingTime(cooking_time);
            res.status(200).json(recipe);
        }
        else {
            res.status(404).json({ message: "invalid time in the request" });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export async function getRecipesByIngredients(req, res) {
    try {
        const ingredients = req.body;
        const recipe = await recipeService.getRecipesByIngredients(ingredients);
        res.status(200).json(recipe);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}



const recipeController = {
    getAllRecipe,
    createRecipe,
    getRecipeByName,
    updateRecipe,
    deleteRecipe,
    getRecipeByAutor,
    getRecipeByMood,
    getRecipesByPreparationTime,
    getRecipesByCookingTime,
    getRecipesByIngredients
};
export default recipeController;
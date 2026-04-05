import RecipeingredientService from '../../Business/Services/recipeIngredient.service.js'

export async function getRecipeIngredientById(req, res) {
    try {
        const ingredients = await RecipeingredientService.getRecipeIngredientById(req.params.id);
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
};

export async function getAllRecipeIngredient(req, res) {
    try {
        const ingredients = await RecipeingredientService.getAllRecipeIngredient();
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
};

export async function createRecipeIngredient(req, res) {
    try {
        const newingredient = await RecipeingredientService.createRecipeIngredient(req.body.recipeID, req.body.name, req.body.type , req.body.quantity, req.body.unit);
        res.status(201).json(newingredient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export async function deleteRecipeIngredient(req, res) {
    
    try {
        const newingredient = await RecipeingredientService.deleteRecipeIngredient(req.body.id, req.body.recipeId);
        res.status(201).json(newingredient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export async function updateRecipeIngredient(req, res) {
    try {
            const newingredient = await RecipeingredientService.updateRecipeIngredient(req.body.id, req.body.recipeID, req.body.ingredientID, req.body.quantity, req.body.unit);
            res.status(201).json(newingredient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const ingredientController = {getRecipeIngredientById, createRecipeIngredient, getAllRecipeIngredient, deleteRecipeIngredient, updateRecipeIngredient };
export default ingredientController;
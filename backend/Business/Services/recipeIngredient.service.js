import RecipeIngredientDAO from '../../Data/Repositories/recipe.repositorie.js'

export async function getRecipeIngredientById(id_) {
    const recipeingredient = await RecipeIngredientDAO.findById(id_);
    if (!recipeingredient) {
        throw new Error("RecipeIngredient not found");
    }
    return recipeingredient;
};

export async function getAllRecipeIngredient() {
    const recipeingredients = await RecipeIngredientDAO.GetAllRecipeIngredient();
    if (!recipeingredients) {
        throw new Error("RecipeIngredient not found");
    }
    return recipeingredients;
};

export async function createRecipeIngredient(recipeID, ingredientID, quantity, unit){
    const existing = await RecipeIngredientDAO.findByRecipe(recipeID, ingredientID);
    if (existing) {
        return existing
    }
    return RecipeIngredientDAO.createRecipeIngredient(recipeID, ingredientID, quantity, unit);
};

export async function deleteRecipeIngredient(id){
    const existing = await RecipeIngredientDAO.findById(id);
    if (!existing) {
        throw new Error("RecipeIngredient doesn't exist");
    }
    return RecipeIngredientDAO.deleteRecipeIngredient(id);
};

export async function updateRecipeIngredient(id_, recipeID, ingredientID, quantity, unit){
    const recipeingredient = await RecipeIngredientDAO.findById(id_);
    if (!recipeingredient) {
        throw new Error("RecipeIngredient doesn't exist");
    }
    recipeID = recipeID ? recipeID : recipeingredient.recipeID
    ingredientID = ingredientID ? ingredientID : recipeingredient.ingredientID
    quantity = quantity ? quantity : recipeingredient.quantity
    unit = unit ? unit : recipeingredient.unit
    return RecipeIngredientDAO.updateRecipeIngredient(id_, recipeID, ingredientID, quantity, unit);
};

const recipeingredientService = {getRecipeIngredientById, createRecipeIngredient, getAllRecipeIngredient, deleteRecipeIngredient, updateRecipeIngredient };
export default recipeingredientService;

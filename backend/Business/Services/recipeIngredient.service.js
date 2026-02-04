import RecipeIngredientDAO from '../../Data/Repositories/recipeIngredient.repositorie.js'
import IngredientService from './ingredient.service.js'

export async function getRecipeIngredientById(id_) {
    const recipeingredient = await RecipeIngredientDAO.findById(id_);
    if (!recipeingredient) {
        throw new Error("RecipeIngredient not found");
    }
    return recipeingredient;
};

export async function getRecipeIngredientByName(name) {
    const recipeingredient = await IngredientService.findByName(name);
    if (!recipeingredient) {
        throw new Error("RecipeIngredient not found");
    }
    const result = await getRecipeIngredientById(recipeingredient.id)
    if (!result) {
        throw new Error("RecipeIngredient not found");
    }
    return result;
};

export async function getAllRecipeIngredient() {
    const recipeingredients = await RecipeIngredientDAO.GetAllRecipeIngredient();
    if (!recipeingredients) {
        throw new Error("RecipeIngredient not found");
    }
    return recipeingredients;
};

// export async function createRecipeIngredient(recipeID, ingredientId, quantity, unit){
//     const existing = await RecipeIngredientDAO.findByRecipe(recipeID, ingredientId);
//     if (existing) {
//         return existing
//     }
//     return RecipeIngredientDAO.createRecipeIngredient(recipeID, ingredientId, quantity, unit);
// };

export async function createRecipeIngredient(recipeID, name, type, quantity, unit){
    var ingredientId = await IngredientService.findByName(name)
    if (!ingredientId)
    {
        ingredientId = (await IngredientService.createIngredient(name, type)).id
    }
    else
        ingredientId = ingredientId.id
    const existing = await RecipeIngredientDAO.findByRecipe(recipeID, ingredientId);
    if (existing) {
        return existing
    }
    return RecipeIngredientDAO.createRecipeIngredient(recipeID, ingredientId, quantity, unit);
};

export async function deleteRecipeIngredient(id){
    const existing = await RecipeIngredientDAO.findById(id);
    if (!existing) {
        throw new Error("RecipeIngredient doesn't exist");
    }
    return RecipeIngredientDAO.deleteRecipeIngredient(id);
};

export async function updateRecipeIngredient(id_, recipeID, ingredientId, quantity, unit){
    const recipeingredient = await RecipeIngredientDAO.findById(id_);
    if (!recipeingredient) {
        throw new Error("RecipeIngredient doesn't exist");
    }
    recipeID = recipeID ? recipeID : recipeingredient.recipeID
    ingredientId = ingredientId ? ingredientId : recipeingredient.ingredientId
    quantity = quantity ? quantity : recipeingredient.quantity
    unit = unit ? unit : recipeingredient.unit
    return RecipeIngredientDAO.updateRecipeIngredient(id_, recipeID, ingredientId, quantity, unit);
};

const recipeingredientService = {getRecipeIngredientById, getRecipeIngredientByName, createRecipeIngredient, getAllRecipeIngredient, deleteRecipeIngredient, updateRecipeIngredient };
export default recipeingredientService;

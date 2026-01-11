import ingredientDAO from '../../Data/Repositories/ingredient.repositorie.js'

export async function getIngredientByName(name) {
    const ingredient = await ingredientDAO.findById(id);
    if (!ingredient) {
        throw new Error("Ingredient not found");
    }
    return ingredient;
};

export async function getIngredientByType(type) {
    const ingredients = await ingredientDAO.findByType(type);
    if (!ingredients) {
        throw new Error("Ingredient not found");
    }
    return ingredients;
};

export async function getAllIngredient() {
    const ingredients = await ingredientDAO.GetAllIngredient();
    if (!ingredients) {
        throw new Error("Ingredient not found");
    }
    return ingredients;
};

export async function createIngredient(name, type, quantity, unit){
    const existing = await ingredientDAO.findByName(name);
    if (existing) {
        throw new Error("Ingredient already exists");
    }
    return ingredientDAO.createIngredient(name, type, quantity, unit);
};

export async function deleteIngredient(name){
    const existing = await ingredientDAO.findByName(name);
    if (!existing) {
        throw new Error("Ingredient doesn't exist");
    }
    return ingredientDAO.deleteIngredient(name);
};

export async function updateIngredient(name, type, quantity, unit){
    const existing = await ingredientDAO.findByName(name);
    if (!existing) {
        throw new Error("Ingredient doesn't exist");
    }
    return ingredientDAO.updateIngredient(name, type, quantity, unit);
};

const ingredientService = { getIngredientById, createIngredient, getAllIngredient,deleteIngredient, updateIngredient };
export default ingredientService;

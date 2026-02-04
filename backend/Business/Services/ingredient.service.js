import ingredientDAO from '../../Data/Repositories/ingredient.repositorie.js'

export async function findByName(name) {
    return await ingredientDAO.findByName(name);
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

export async function createIngredient(name, type){
    const existing = await ingredientDAO.findByName(name);
    if (existing) {
        return existing
    }
    return ingredientDAO.createIngredient(name, type);
};

export async function deleteIngredient(name){
    const existing = await ingredientDAO.findByName(name);
    if (!existing) {
        throw new Error("Ingredient doesn't exist");
    }
    return ingredientDAO.deleteIngredient(name);
};

export async function updateIngredient(id, name, type){
    const ingredient = await ingredientDAO.findById(id);
    if (!ingredient) {
        throw new Error("Ingredient doesn't exist");
    }
    name = name ? name : ingredient.name
    type = type ? type : ingredient.type
    return ingredientDAO.updateIngredient(id, name, type);
};

const ingredientService = { findByName, getIngredientByType, createIngredient, getAllIngredient, deleteIngredient, updateIngredient };
export default ingredientService;

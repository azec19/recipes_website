import ingredientDAO from '../../Data/Repositories/ingredient.repositorie.js'

export async function getIngredientByName(name) {
    const ingredient = await ingredientDAO.findByName(name);
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
        return updateIngredient(existing.id, name, type, existing.Quantity + quantity, unit)
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

export async function updateIngredient(id, name, type, quantity, unit){
    const ingredient = await ingredientDAO.findById(id);
    if (!ingredient) {
        throw new Error("Ingredient doesn't exist");
    }
    name = name ? name : ingredient.name
    type = type ? type : ingredient.type
    quantity = quantity ? quantity : ingredient.quantity
    unit = unit ? unit : ingredient.unit
    return ingredientDAO.updateIngredient(id, name, type, quantity, unit);
};

const ingredientService = { getIngredientByName, getIngredientByType, createIngredient, getAllIngredient, deleteIngredient, updateIngredient };
export default ingredientService;

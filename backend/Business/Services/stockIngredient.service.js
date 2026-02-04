import StockingredientDAO from '../../Data/Repositories/stockIngredient.respositorie.js'
import ingredientDAO from '../../Data/Repositories/ingredient.repositorie.js'
import IngredientService from './ingredient.service.js'

export async function getStockIngredientByName(name) {
    const ingredient = await ingredientDAO.findByName(name);
    if (!ingredient) {
        throw new Error("Ingredient not found");
    }
    return StockingredientDAO.findByIngredientID(ingredient.id);
};

export async function getStockIngredientByType(type) {
    const ingredient = await ingredientDAO.findByType(type);
    if (!ingredient) {
        throw new Error("Ingredient not found");
    }
    return StockingredientDAO.findByIngredientID(ingredient.id);
};



export async function getAllStockIngredient() {
    const ingredients = await StockingredientDAO.GetAllStockIngredient();
    if (!ingredients) {
        throw new Error("Ingredient not found");
    }
    return ingredients;
};

export async function createStockIngredient(name, type, quantity, unit){
    var ingredientId = await IngredientService.findByName(name)
    if (!ingredientId)
    {
        ingredientId = (await IngredientService.createIngredient(name, type)).id
    }
    else
        ingredientId = ingredientId.id
    const existing = await StockingredientDAO.findByIngredientID(ingredientId);
    if (existing) {        
        return await updateStockIngredient(existing.id, ingredientId, existing.quantity + quantity, unit)
    }
    return StockingredientDAO.createStockIngredient(ingredientId, quantity, unit);
};

export async function deleteStockIngredient(ingredientId){
    const existing = await StockingredientDAO.findByIngredientID(ingredientId);
    if (!existing) {
        throw new Error("Ingredient doesn't exist");
    }
    return StockingredientDAO.deleteStockIngredient(ingredientId);
};

export async function updateStockIngredient(id, ingredientId, quantity, unit){
    const ingredient = await StockingredientDAO.findById(id);
    if (!ingredient) {
        throw new Error("Ingredient doesn't exist");
    }
    ingredientId = ingredientId ? ingredientId : ingredient.type
    quantity = quantity ? quantity : ingredient.quantity
    unit = unit ? unit : ingredient.unit
    return StockingredientDAO.updateStockIngredient(id, ingredientId, quantity, unit);
};

const stockIngredientService = { getStockIngredientByName, getStockIngredientByType, createStockIngredient, getAllStockIngredient, deleteStockIngredient, updateStockIngredient };
export default stockIngredientService;

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

export async function deleteStockIngredient(ingredientName){
    const existing = await ingredientDAO.findByName(ingredientName);
    if (!existing) {
        throw new Error("Ingredient doesn't exist");
    }
    return StockingredientDAO.deleteStockIngredient(existing.id);
};

export async function updateStockIngredient(id, ingredientId, quantity, unit){
    const stockingredient = await StockingredientDAO.findById(id);
    if (!stockingredient) {
        throw new Error("Ingredient doesn't exist");
    }
    console.log(stockingredient);    
    ingredientId = ingredientId ? ingredientId : stockingredient.ingredient.id
    quantity = quantity ? quantity : stockingredient.quantity
    unit = unit ? unit : stockingredient.unit
    return StockingredientDAO.updateStockIngredient(id, ingredientId, quantity, unit);
};

const stockIngredientService = { getStockIngredientByName, getStockIngredientByType, createStockIngredient, getAllStockIngredient, deleteStockIngredient, updateStockIngredient };
export default stockIngredientService;

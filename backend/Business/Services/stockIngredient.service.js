import StockingredientDAO from '../../Data/Repositories/stockIngredient.respositorie.js'
import ingredientDAO from '../../Data/Repositories/ingredient.repositorie.js'
import IngredientService from './ingredient.service.js'
import { log } from 'node:console';

export async function getStockIngredientByName(name, user_name) {
    const ingredient = await ingredientDAO.findByName(name);
    if (!ingredient) {
        throw new Error("Ingredient not found");
    }
    return StockingredientDAO.findByIngredientID(ingredient.id, user_name);
};

export async function getStockIngredientByType(type, user_name) {
    const ingredient = await ingredientDAO.findByType(type);
    if (!ingredient) {
        throw new Error("Ingredient not found");
    }
    return StockingredientDAO.findByIngredientID(ingredient.id, user_name);
};



export async function getAllStockIngredient(user_name) {
    const ingredients = await StockingredientDAO.GetAllStockIngredient(user_name);
    if (!ingredients) {
        throw new Error("Ingredient not found");
    }
    return ingredients;
};

export async function createStockIngredient(name, user_name, type, quantity, unit){
    var ingredientId = await IngredientService.findByName(name)
    if (!ingredientId)
    {
        ingredientId = (await IngredientService.createIngredient(name, type)).id
    }
    else
        ingredientId = ingredientId.id
    const existing = await StockingredientDAO.findByIngredientID(ingredientId, user_name);
    if (existing) {        
        return await updateStockIngredient(existing.id, ingredientId, user_name, existing.quantity + quantity, unit)
    }
    return StockingredientDAO.createStockIngredient(ingredientId, user_name, quantity, unit);
};

export async function deleteStockIngredient(ingredientName, user_name){
    const existing = await ingredientDAO.findByName(ingredientName);
    if (!existing) {
        throw new Error("Ingredient doesn't exist");
    }
    return StockingredientDAO.deleteStockIngredient(existing.id, user_name);
};

export async function updateStockIngredient(id, ingredientId, user_name, quantity, unit){    
    const stockingredient = await StockingredientDAO.findById(id, user_name);
    if (!stockingredient) {
        throw new Error("Ingredient doesn't exist");
    }    
    ingredientId = ingredientId ? ingredientId : stockingredient.ingredient.id
    quantity = quantity ? quantity : stockingredient.quantity
    unit = unit ? unit : stockingredient.unit
    return StockingredientDAO.updateStockIngredient(id, ingredientId, user_name, quantity, unit);
};

const stockIngredientService = { getStockIngredientByName, getStockIngredientByType, createStockIngredient, getAllStockIngredient, deleteStockIngredient, updateStockIngredient };
export default stockIngredientService;

import StockingredientDAO from '../../Data/Repositories/stockIngredient.respositorie.js'
import ingredientDAO from '../../Data/Repositories/ingredient.repositorie.js'

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

// export async function createStockIngredient(IngredientID, quantity, unit){
//     const existing = await StockingredientDAO.findByIngredientID(IngredientID);
//     if (existing) {
//         return updateStockIngredient(existing.id, name, type, existing.Quantity + quantity, unit)
//     }
//     return StockingredientDAO.createStockIngredient(ingredientID, quantity, unit);
// };

export async function createStockIngredient(name, type, quantity, unit){
    var ingredientID = await IngredientService.findbyName(name)
    if (!ingredientID)
    {
        ingredientID = (await IngredientService.createIngredient(name, type)).id
    }
    const existing = await StockingredientDAO.findByIngredientID(ingredientID);
    if (existing) {
        return await updateStockIngredient(existing.id, ingredientID, existing.Quantity + quantity, unit)
    }
    return StockingredientDAO.createStockIngredient(ingredientID, quantity, unit);
};

export async function deleteStockIngredient(ingredientID){
    const existing = await StockingredientDAO.findByIngredientID(ingredientID);
    if (!existing) {
        throw new Error("Ingredient doesn't exist");
    }
    return StockingredientDAO.deleteStockIngredient(ingredientID);
};

export async function updateStockIngredient(id, ingredientID, quantity, unit){
    const ingredient = await StockingredientDAO.findById(id);
    if (!ingredient) {
        throw new Error("Ingredient doesn't exist");
    }
    ingredientID = ingredientID ? ingredientID : ingredient.type
    quantity = quantity ? quantity : ingredient.quantity
    unit = unit ? unit : ingredient.unit
    return StockingredientDAO.updateStockIngredient(id, ingredientID, quantity, unit);
};

const ingredientService = { getStockIngredientByName, getStockIngredientByType, createStockIngredient, getAllStockIngredient, deleteStockIngredient, updateStockIngredient };
export default ingredientService;

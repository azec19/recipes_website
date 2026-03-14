import StockingredientService from '../../Business/Services/stockIngredient.service.js'

export async function getStockIngredientByType(req, res) {
    try {
        const type = req.params.type;
        if (type) {
            const ingredient = await StockingredientService.getStockIngredientByType(type, req.user.name);
            res.status(200).json(ingredient);
        }
        else {
            res.status(404).json({ message: "invalid type in the request"});
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export async function getStockIngredientByName(req, res) {
    try {
        const name = req.params.name;
        if (name) {
            const ingredient = await StockingredientService.getStockIngredientByName(name, req.user.name);
            res.status(200).json(ingredient);
        }
        else {
            res.status(404).json({ message: "invalid name in the request"});
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};




export async function getAllStockIngredient(req, res) {
    try {
        const ingredients = await StockingredientService.getAllStockIngredient(req.user.name);
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
};

export async function createStockIngredient(req, res) {
    try {
        const newingredient = await StockingredientService.createStockIngredient(req.body.name, req.user.name, req.body.type, req.body.quantity, req.body.unit);
        res.status(201).json(newingredient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export async function deleteStockIngredient(req, res) {
    try {
        const newingredient = await StockingredientService.deleteStockIngredient(req.params.name, req.user.name);
        res.status(201).json(newingredient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export async function updateStockIngredient(req, res) {
    console.log(req.body);
    
    try {
            const newingredient = await StockingredientService.updateStockIngredient(req.body.id, req.body.ingredientID, req.user.name, req.body.quantity, req.body.unit);
            res.status(201).json(newingredient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const ingredientController = { getStockIngredientByName, getStockIngredientByType, createStockIngredient, getAllStockIngredient, deleteStockIngredient, updateStockIngredient };
export default ingredientController;
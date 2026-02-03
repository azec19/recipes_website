import ingredientService from '../../Business/Services/ingredient.service.js'

export async function getIngredientByType(req, res) {
    try {
        const type = req.params.type;
        if (type) {
            const ingredient = await ingredientService.getIngredientByType(type);
            res.status(200).json(ingredient);
        }
        else {
            res.status(404).json({ message: "invalid type in the request"});
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export async function getIngredientByName(req, res) {
    try {
        const name = req.params.name;
        if (name) {
            const ingredient = await ingredientService.getIngredientByName(name);
            res.status(200).json(ingredient);
        }
        else {
            res.status(404).json({ message: "invalid name in the request"});
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};




export async function getAllIngredient(req, res) {
    try {
        const ingredients = await ingredientService.getAllIngredient();
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
};

export async function createIngredient(req, res) {
    try {
        const newingredient = await ingredientService.createIngredient(req.body.Name, req.body.Type);
        res.status(201).json(newingredient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export async function deleteIngredient(req, res) {
    try {
        const newingredient = await ingredientService.deleteIngredient(req.params.name);
        res.status(201).json(newingredient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export async function updateIngredient(req, res) {
    try {
            const newingredient = await ingredientService.updateIngredient(req.body.id, req.body.Name, req.body.Type);
            res.status(201).json(newingredient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const ingredientController = { getIngredientByName, getIngredientByType, createIngredient, getAllIngredient, deleteIngredient, updateIngredient };
export default ingredientController;
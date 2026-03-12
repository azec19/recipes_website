
// Presentation/Routes/user.routes.js
import { Router } from 'express'
import ingredientController from '../Controllers/ingredient.controller.js'
// import { prisma } from '../../Data/Repositories/prisma.js' // si besoin

const router = Router()
// Define routes
router.get('/name/:name', ingredientController.getIngredientByName);
router.get('/type/:type', ingredientController.getIngredientByType);
router.put('/', ingredientController.updateIngredient);
router.post('/', ingredientController.createIngredient);
router.get('/', ingredientController.getAllIngredient);
router.delete('/name/:name', ingredientController.deleteIngredient);


export default router
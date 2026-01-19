
// Presentation/Routes/user.routes.js
import { Router } from 'express'
import ingredientController from '../Controllers/ingredient.controller.js'
// import { prisma } from '../../Data/Repositories/prisma.js' // si besoin

const router = Router()
// Define routes
router.get('/ingredient/name/:name', ingredientController.getIngredientByName);
router.get('/ingredient/type/:type', ingredientController.getIngredientByType);
router.put('/ingredient', ingredientController.updateIngredient);
router.post('/ingredient', ingredientController.createIngredient);
router.get('/ingredient', ingredientController.getAllIngredient);
router.delete('/ingredient/name/:name', ingredientController.deleteIngredient);


export default router
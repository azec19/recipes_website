
// Presentation/Routes/user.routes.js
import { Router } from 'express'
import RecipeingredientController from '../Controllers/recipeIngredient.controller.js'
// import { prisma } from '../../Data/Repositories/prisma.js' // si besoin

const router = Router()
// Define routes
router.get('/ingredient/id/:id', RecipeingredientController.getRecipeIngredientById);
router.put('/ingredient', RecipeingredientController.updateRecipeIngredient);
router.post('/ingredient', RecipeingredientController.createRecipeIngredient);
router.get('/ingredient', RecipeingredientController.getAllRecipeIngredient);
router.delete('/ingredient/id/:id', RecipeingredientController.deleteRecipeIngredient);


export default router
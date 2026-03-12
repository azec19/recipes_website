
// Presentation/Routes/user.routes.js
import { Router } from 'express'
import RecipeingredientController from '../Controllers/recipeIngredient.controller.js'
// import { prisma } from '../../Data/Repositories/prisma.js' // si besoin

const router = Router()
// Define routes
router.get('/id/:id', RecipeingredientController.getRecipeIngredientById);
router.put('/', RecipeingredientController.updateRecipeIngredient);
router.post('/', RecipeingredientController.createRecipeIngredient);
router.get('/', RecipeingredientController.getAllRecipeIngredient);
router.delete('/id/:id', RecipeingredientController.deleteRecipeIngredient);


export default router
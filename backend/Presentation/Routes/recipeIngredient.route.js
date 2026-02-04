
// Presentation/Routes/user.routes.js
import { Router } from 'express'
import RecipeingredientController from '../Controllers/recipeIngredient.controller.js'
// import { prisma } from '../../Data/Repositories/prisma.js' // si besoin

const router = Router()
// Define routes
router.get('/recipeIngredient/id/:id', RecipeingredientController.getRecipeIngredientById);
router.put('/recipeIngredient', RecipeingredientController.updateRecipeIngredient);
router.post('/recipeIngredient', RecipeingredientController.createRecipeIngredient);
router.get('/recipeIngredient', RecipeingredientController.getAllRecipeIngredient);
router.delete('/recipeIngredient/id/:id', RecipeingredientController.deleteRecipeIngredient);


export default router
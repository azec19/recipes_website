
// Presentation/Routes/user.routes.js
import { Router } from 'express'
import recipeController from '../Controllers/recipe.controller.js'
// import { prisma } from '../../Data/Repositories/prisma.js' // si besoin

const router = Router()
// Define routes

router.get('/recipe', recipeController.getAllRecipe);
router.post('/recipe', recipeController.createRecipe);
router.put('/recipe', recipeController.updateRecipe);
// router.get('/recipe/image/:filename', recipeController.getImageByName);
router.get('/recipe/name/:name', recipeController.getRecipeByName);
router.delete('/recipe/name/:name', recipeController.deleteRecipe);
router.get('/recipe/autor/:autor', recipeController.getRecipeByAutor);
router.get('/recipe/mood/:mood', recipeController.getRecipeByMood);
router.get('/recipe/preparation_time/:time', recipeController.getRecipesByPreparationTime);
router.get('/recipe/cooking_time/:time', recipeController.getRecipesByCookingTime);
router.post('/recipe/Ingredient', recipeController.getRecipesByIngredients);


export default router
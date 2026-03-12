
// Presentation/Routes/user.routes.js
import { Router } from 'express'
import recipeController from '../Controllers/recipe.controller.js'
// import { prisma } from '../../Data/Repositories/prisma.js' // si besoin

const router = Router()
// Define routes

router.get('/', recipeController.getAllRecipe);
router.post('/', recipeController.createRecipe);
router.put('/', recipeController.updateRecipe);
// router.get('//image/:filename', recipeController.getImageByName);
router.get('/name/:name', recipeController.getRecipeByName);
router.delete('/name/:name', recipeController.deleteRecipe);
router.get('/autor/:autor', recipeController.getRecipeByAutor);
router.get('/mood/:mood', recipeController.getRecipeByMood);
router.get('/preparation_time/:time', recipeController.getRecipesByPreparationTime);
router.get('/cooking_time/:time', recipeController.getRecipesByCookingTime);
// router.post('//Ingredient', recipeController.getRecipesByIngredients);


export default router
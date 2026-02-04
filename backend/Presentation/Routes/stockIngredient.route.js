// Presentation/Routes/user.routes.js
import { Router } from 'express'
import StockingredientController from '../Controllers/stockIngredient.controller.js'
// import { prisma } from '../../Data/Repositories/prisma.js' // si besoin

const router = Router()
// Define routes
router.get('/stockIngredient/name/:name', StockingredientController.getStockIngredientByName);
router.get('/stockIngredient/type/:type', StockingredientController.getStockIngredientByType);
router.put('/stockIngredient', StockingredientController.updateStockIngredient);
router.post('/stockIngredient', StockingredientController.createStockIngredient);
router.get('/stockIngredient', StockingredientController.getAllStockIngredient);
router.delete('/stockIngredient/IngredientID/:IngredientID',StockingredientController.deleteStockIngredient);


export default router
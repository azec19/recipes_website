// Presentation/Routes/user.routes.js
import { Router } from 'express'
import StockingredientController from '../Controllers/stockIngredient.controller.js'
// import { prisma } from '../../Data/Repositories/prisma.js' // si besoin

const router = Router()
// Define routes
router.get('/ingredient/name/:name', StockingredientController.getStockIngredientByName);
router.get('/ingredient/type/:type', StockingredientController.getStockIngredientByType);
router.put('/ingredient', StockingredientController.updateStockIngredient);
router.post('/ingredient', StockingredientController.createStockIngredient);
router.get('/ingredient', StockingredientController.getAllStockIngredient);
router.delete('/ingredient/IngredientID/:IngredientID',StockingredientController.deleteStockIngredient);


export default router
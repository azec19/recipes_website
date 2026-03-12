// Presentation/Routes/user.routes.js
import { Router } from 'express'
import StockingredientController from '../Controllers/stockIngredient.controller.js'
// import { prisma } from '../../Data/Repositories/prisma.js' // si besoin

const router = Router()
// Define routes
router.get('/name/:name', StockingredientController.getStockIngredientByName);
router.get('/type/:type', StockingredientController.getStockIngredientByType);
router.put('/', StockingredientController.updateStockIngredient);
router.post('/', StockingredientController.createStockIngredient);
router.get('/', StockingredientController.getAllStockIngredient);
router.delete('/name/:name',StockingredientController.deleteStockIngredient);


export default router
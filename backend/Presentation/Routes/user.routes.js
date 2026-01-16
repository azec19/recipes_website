
// Presentation/Routes/user.routes.js
import { Router } from 'express'
import userController from '../Controllers/user.controller.js'
// import { prisma } from '../../Data/Repositories/prisma.js' // si besoin

const router = Router()

// Define routes
router.get('/users/id/:id', userController.getUserById);
router.put('/users/id/:id', userController.updateUser);
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUser);
router.delete('/users/email/:email', userController.deleteUser);


export default router
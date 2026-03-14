import Router from "express";
import authController from "../Controllers/auth.controller.js"
import {body} from "express-validator"


const validateRegister = [
    body('name').isLength({ min: 4 }).notEmpty().withMessage('Oops! Name is required.').trim().escape(),
    body('password').isLength({ min: 12 }).withMessage('Oops! Password must be at least 12 characters long.').trim().escape(),
];

const validateLogin = [
    body('name').isLength({ min: 4 }).notEmpty().withMessage('Oops! Name is required.').trim().escape(),
    body('password').notEmpty().withMessage('Oops! Password is required.').trim().escape(),
];

const router = Router();

router.post('/register', validateRegister, authController.Register);
router.post('/login', validateLogin, authController.Login);

export default router

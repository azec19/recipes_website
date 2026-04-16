import authService from "../../Business/Services/auth.service.js"
import { validationResult } from "express-validator";

export async function Login(req, res) {
    const errors = validationResult(req);

    // Return validation errors if any
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            msg: 'Validation error',
            errors: errors.array()
        });
    }
    try {
        const token = await authService.login(req.body.name, req.body.password);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,        
            sameSite: "lax",
            maxAge: process.env.COOKIE_EXPIRATION_TIME,
        })
        res.status(201).json({message: "Logged in"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function Register(req, res) {
    const errors = validationResult(req);

    // Return validation errors if any
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            msg: 'Validation error',
            errors: errors.array()
        });
    }
    try {
        const token = await authService.register(req.body.name, req.body.password);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,        
            sameSite: "lax",
            maxAge: process.env.COOKIE_EXPIRATION_TMIE,
        })
        res.status(201).json({message: "Register in"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const authController = { Login, Register };
export default authController;
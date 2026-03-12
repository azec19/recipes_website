import authService from "../../Business/Services/auth.service.js"

export async function Login(req, res)
{
    try {
        const userWithtoken = await authService.Login(req.body.Name, req.body.password);
        res.status(201).json(userWithtoken);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function Register(req, res)
{
    try {
        const userWithtoken = await authService.Register(req.body.Name, req.body.password);
        res.status(201).json(userWithtoken);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const authController = {Login, Register};
export default authController;
import userService from "./user.service.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function register(name, password) {
    
    // Check if the user with the given email already exists
    
    const existingUser = await userService.getUserByName(name);
    if (existingUser) {
        throw new Error("User with this name already exists.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the new user in the database
    const user = await userService.createUser(name, hashedPassword)
    
    // Generate a JWT token
    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRATION_TIME,
        }
    );

    return token
};

export async function login(name, password) {

    const user = await userService.getUserByName(name);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
    }

    // Generate user token
    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRATION_TIME,
        }
    );

    return token
};

const authService = {register, login};
export default authService;
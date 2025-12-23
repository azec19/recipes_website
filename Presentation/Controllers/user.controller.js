import userService from '../../Business/Services/user.service.js'
export async function getUserById(req, res){
    try {
        const id = parseInt(req.params.id);
        if (!isNaN(id))
        {   
            const user = await userService.getUserById(id);
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export async function getAllUser(req, res){
    try {
        const users = await userService.getAllUser();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export async function createUser(req, res){
    try {
        const newUser = await userService.createUser(req.body.Name, req.body.email);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export async function deleteUser(req, res){
    try {
        console.log(req.params)
        const newUser = await userService.deleteUser(req.params.email);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const userController = { getUserById, createUser, getAllUser, deleteUser };
export default userController;
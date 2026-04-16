import userDAO from '../../Data/Repositories/user.repositorie.js'

export async function getUserById(id) {
    const user = await userDAO.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

export async function getUserByName(name) {
    return await userDAO.findByName(name);
};

export async function getAllUser() {
    const users = await userDAO.GetAllUser();
    if (!users) {
        throw new Error("No users in Database");
    }
    return users;
};

export async function createUser(name, password){
    const existing = await userDAO.findByName(name);
    if (existing) {
        throw new Error("Name already in use");
    }
    return userDAO.createUser(name, password);
};

export async function deleteUser(name){
    const existing = await userDAO.findByName(name);
    if (!existing) {
        throw new Error("User doesn't exist");
    }
    return userDAO.deleteUser(name);
};

export async function updateUser(id, name, hashedPassword){
    const existing = await userDAO.findByName(name);
    if (!existing) {
        throw new Error("User doesn't exist");
    }
    return userDAO.updateUser(id, name, hashedPassword);
};

const userService = { getUserById, getUserByName, createUser, getAllUser,deleteUser, updateUser };
export default userService;

import userDAO from '../../Data/Repositories/user.repositorie.js'

export async function getUserById(id) {
    const user = await userDAO.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

export async function getAllUser() {
    const users = await userDAO.GetAllUser();
    if (!users) {
        throw new Error("User not found");
    }
    return users;
};

export async function createUser(name, email){
    const existing = await userDAO.findByemail(email);
    if (existing) {
        throw new Error("Email already in use");
    }
    return userDAO.createUser(name, email);
};

export async function deleteUser(email){
    const existing = await userDAO.findByemail(email);
    console.log(email)
    if (!existing) {
        throw new Error("User doesn't exist");
    }
    return userDAO.deleteUser(email);
};

const userService = { getUserById, createUser, getAllUser,deleteUser };
export default userService;

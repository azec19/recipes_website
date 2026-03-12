import { prisma } from './prisma.js'

export async function createUser(name, password) {
    // Create a new user
    const user = await prisma.user.create({
        data: {
            name: name,
            password: password,
        },
    })
    return user
}

export async function deleteUser(name) {
    // Create a new user
    const user = await prisma.user.delete({
        where: {
            name: name,
        },
    })
    return user
}

export async function updateUser(id, name, password) {
    // Create a new user
    const user = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            password: password,
            name: name,
        }
    })
    return user
}


export async function GetAllUser() {
    // Fetch all users
    return await prisma.user.findMany();
}

export async function findById(id) {
    // Fetch users with right ID
    return await prisma.user.findUnique({
        where: {
            id: id,
        },
    })
}

export async function findByName(Name) {
    // Fetch users with right ID
    return await prisma.user.findUnique({
        where: {
            name: Name,
        },
    })
}

const userRepository = {findById, findByName, createUser, GetAllUser, deleteUser, updateUser};
export default userRepository;
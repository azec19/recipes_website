import { prisma } from './prisma.js'

export async function createUser(name, email) {
    // Create a new user
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
        },
    })
    return user
}

export async function deleteUser(email) {
    // Create a new user
    const user = await prisma.user.delete({
        where: {
            email: email,
        },
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

export async function findByemail(email) {
    // Fetch users with right ID
    return await prisma.user.findUnique({
        where: {
            email: email,
        },
    })
}

const userRepository = {findById, findByemail, createUser, GetAllUser, deleteUser};
export default userRepository;
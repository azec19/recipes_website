'use server'

import 'dotenv/config'
import { StockIngredient, RecipeIngredient, Recipe, typeLabelToKey, unitLabelToKey } from "./type"
import { revalidatePath } from 'next/cache';
import { } from "../lib/type"
import { cookies } from "next/headers"
import { NextResponse } from 'next/server';

const Backend_URL = process.env.BACKEND_URL

export async function fetchAllRecipes(): Promise<Recipe[]> {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const res = await fetch(Backend_URL + '/api/recipe', {
        headers: {
            Cookie: `token=${token}`
        },
        cache: "no-store"
    });
    if (res.status == 500) {
        return []
    }
    let json = await res.json();
    return json
}

export async function fetchRecipesByName(name: string): Promise<Recipe> {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const res = await fetch(Backend_URL + '/api/recipe/name/' + name, {
        headers: {
            Cookie: `token=${token}`
        },
    });
    let json = await res.json();
    return json
}

export async function fetchAllStockIngredients(): Promise<StockIngredient[]> {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const res = await fetch(Backend_URL + '/api/stockIngredient', {
        headers: {
            Cookie: `token=${token}`
        },
    });
    if (res.status == 500) {
        return []
    }
    let json = await res.json();
    return json
}

export async function onSubmitStockIngredient(Ingredient: StockIngredient) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const data = {
        name: Ingredient.ingredient.name,
        type: typeLabelToKey(Ingredient.ingredient.type) as string,
        quantity: Number(Ingredient.quantity),
        unit: unitLabelToKey(Ingredient.unit) as string
    };

    const response = await fetch(Backend_URL + '/api/stockIngredient', {
        method: 'POST',
        credentials: "include",
        headers: {
            Cookie: `token=${token}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    // revalidatePath('/');
    // Handle response if necessary
    const result = await response.json()
    // ...
}

export async function updateStockIngredient(Ingredient: StockIngredient) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const data = {
        ingredientId: Ingredient.ingredient.id,
        id: Ingredient.id,
        quantity: Number(Ingredient.quantity),
        unit: unitLabelToKey(Ingredient.unit) as string
    };
    const response = await fetch(Backend_URL + '/api/stockIngredient', {
        method: 'PUT',
        credentials: "include",
        headers: {
            Cookie: `token=${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    return await response.json();

}

export async function DeleteStockIngredient(name: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    await fetch(Backend_URL + `/api/stockIngredient/name/${name}`, {
        method: 'DELETE',
        headers: {
            Cookie: `token=${token}`,
            'Content-Type': 'application/json'
        },
    });
}


export async function onSubmitRecipe(formData: FormData): Promise<{ success: boolean, message?: string }> {


    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const toolsList = JSON.parse(JSON.stringify((formData.get('tools') as string).split(",")))

    const data = {
        name: formData.get('name') as string,
        date: formData.get('date') as string,
        autor: formData.get('autor') as string,
        description: formData.get('description') as string,
        instructions: JSON.parse(JSON.stringify((formData.get('instructions') as string).split('\n'))),
        ingredients: JSON.parse(formData.get('ingredients') as string),
        mood: JSON.parse(JSON.stringify([formData.get('mood') as string])),
        preparation_time: Number(formData.get('preparation_time')),
        cooking_time: Number(formData.get('cooking_time')),
        quantity: formData.get('quantity') as string,
        difficultie: formData.get('difficulty') as string,
        photo: "tkt",
        tools: toolsList,
        calorie: formData.get('calorie') as string
    };

    const response = await fetch(Backend_URL + '/api/recipe', {
        method: 'POST',
        headers: {
            Cookie: `token=${token}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        return { success: false, message: (await response.json()).message }
    }
    const result = await response.json()
    const picture = formData.get('picture') as File
    const formData_picture = new FormData()
    formData_picture.append('file', picture)
    const response_picture = await fetch(Backend_URL + '/api/upload', {
        method: 'POST',
        headers: {
            Cookie: `token=${token}`
        },
        body: formData_picture
    })

    if (!response_picture.ok) {
        deleteRecipe(data.name)
        return { success: false, message: (await response_picture.json()).message }
    }

    const result_picture = await response_picture.json()

    const update = {
        id: result.id,
        photo: result_picture.filename
    }

    const update_response = await fetch(Backend_URL + '/api/recipe', {
        method: 'PUT',
        credentials: "include",
        headers: {
            Cookie: `token=${token}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
    })
    if (!update_response.ok) {
        deleteRecipe(data.name)
        return { success: false, message: (await update_response.json()).message }
    }
    return { success: true, message: await update_response.text() }

}

export async function updateRecipe(formData: FormData) {

    const toolsList = JSON.parse(JSON.stringify((formData.get('tools') as string).split(",")))
    const update = {
        id: Number(formData.get('id')),
        name: formData.get('name') as string,
        date: formData.get('date') as string,
        autor: formData.get('autor') as string,
        description: formData.get('description') as string,
        instructions: JSON.parse(JSON.stringify((formData.get('instructions') as string).split('\n'))),
        ingredients: JSON.parse(formData.get('ingredients') as string),
        mood: JSON.parse(JSON.stringify([formData.get('mood') as string])),
        preparation_time: Number(formData.get('preparation_time')),
        cooking_time: Number(formData.get('cooking_time')),
        quantity: formData.get('quantity') as string,
        difficultie: formData.get('difficulty') as string,
        tools: toolsList,
        calorie: formData.get('calorie') as string
    };
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const update_response = await fetch(Backend_URL + '/api/recipe', {
        method: 'PUT',
        credentials: "include",
        headers: {
            Cookie: `token=${token}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
    })
    if (!update_response.ok) {
        return { success: false, message: (await update_response.json()).message }
    }

    const picture = formData.get('picture') as File
    if (picture && picture.size > 0) {
        const formData_picture = new FormData()
        formData_picture.append('file', picture)
        const response_picture = await fetch(Backend_URL + '/api/upload', {
            method: 'POST',
            headers: {
                Cookie: `token=${token}`
            },
            body: formData_picture
        })

        if (!response_picture.ok) {
            return { success: false, message: (await response_picture.json()).message }
        }

        const result_picture = await response_picture.json()

        const updatePhoto = {
            id: Number(formData.get('id')),
            photo: result_picture.filename
        }

        const update_photo_response = await fetch(Backend_URL + '/api/recipe', {
            method: 'PUT',
            credentials: "include",
            headers: {
                Cookie: `token=${token}`,
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatePhoto),
        })
        if (!update_photo_response.ok) {
            return { success: false, message: (await update_photo_response.json()).message }
        }
    }

    return { success: true, message: await update_response.text() }
}

export async function deleteRecipe(name: String) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    await fetch(Backend_URL + '/api/recipe/name/' + name, {
        method: 'Delete',
        credentials: "include",
        headers: {
            Cookie: `token=${token}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }
    )
}

export async function deleteCookie() {
    const cookieStore = await cookies()
    cookieStore.delete('token')
}

// export async function register(formData: FormData): Promise<{ success: boolean, message?: string }> {
//     const cookieStore = await cookies()
//     const result = await fetch(Backend_URL + "/auth/register", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             name: formData.get("name"),
//             password: formData.get("password")
//         }),
//         credentials: "include"
//     })
//     const data = await result.json()
//     if (result.ok) {
//         cookieStore.set("token", data.token, {
//             httpOnly: true,
//             secure: true,
//             path: "/"
//         });
//         return { success: true, message: data.message }
//     }
//     else
//         return { success: false, message: data.message }
// }

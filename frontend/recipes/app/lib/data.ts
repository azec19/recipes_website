import { StockIngredient, RecipeIngredient, Recipe } from "./type"
import { revalidatePath } from 'next/cache';

export async function fetchAllRecipes(): Promise<Recipe[]> {
    const res = await fetch('http://localhost:3001/api/recipe');
    let json = await res.json();
    return json
}

export async function fetchRecipesByName(name: string): Promise<Recipe> {
    const res = await fetch('http://localhost:3001/api/recipe/name/' + name);
    let json = await res.json();
    return json
}

export async function fetchAllStockIngredients(): Promise<StockIngredient[]> {
    const res = await fetch('http://localhost:3001/api/stockIngredient');
    let json = await res.json();
    return json
}

export async function onSubmitStockIngredient(formData: FormData) {
    'use server'
    const data = {
        name: formData.get('name_') as string,
        type: formData.get('type') as string,
        quantity: Number(formData.get('quantity')),
        unit: formData.get('unit') as string,
    };

    const response = await fetch('http://localhost:3001/api/stockIngredient', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    revalidatePath('/');
    // Handle response if necessary
    const result = await response.json()
    // ...
}

export async function onSubmitRecipe(formData: FormData) {
    'use server'

    const toolsList = JSON.parse(JSON.stringify((formData.get('tools') as string).split(",")))
    const data = {
        name: formData.get('name') as string,
        date: formData.get('date') as string,
        autor: formData.get('autor') as string,
        description: formData.get('description') as string,
        instructions: formData.get('instructions') as string,
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

    const response = await fetch('http://localhost:3001/api/recipe', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        const text = await response.text()
        throw new Error(text)
    }
    const result = await response.json()
    const picture = formData.get('picture') as File
    const formData_picture = new FormData()
    formData_picture.append('file', picture)
    const response_picture = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData_picture
    })
    if (!response_picture.ok) {
        const text = await response_picture.text()
        throw new Error(text)
    }

    const  result_picture  = await response_picture.json()
    
    const update = {
        id: result.id,
        photo: result_picture.filename
    }
    
    const update_response = await fetch('http://localhost:3001/api/recipe', {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
    })
    if (!update_response.ok) {
        const text = await update_response.text()
        throw new Error(text)
    }

}


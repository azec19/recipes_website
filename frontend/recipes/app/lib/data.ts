import { Ingredient, Recipe } from "./type"
import { revalidatePath } from 'next/cache';
import { listIngredients } from "./Formstore"
import { cpSync } from "fs";

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

export async function fetchAllIngredients(): Promise<Ingredient[]> {
    const res = await fetch('http://localhost:3001/api/ingredient');
    let json = await res.json();
    return json
}

export async function onSubmitIngredient(formData: FormData) {
    'use server'
    const data = {
        Name: formData.get('name_') as string,
        Type: formData.get('type') as string,
        Quantity: Number(formData.get('quantity')),
        Unit: formData.get('unit') as string,
    };

    const response = await fetch('http://localhost:3001/api/ingredient', {
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
        Name: formData.get('name') as string,
        Date: new Date(formData.get('date') as string),
        Autor: formData.get('autor') as string,
        Description: formData.get('description') as string,
        Instructions: formData.get('instructions') as string,
        Ingredients: JSON.parse(formData.get('ingredients') as string),
        mood: JSON.parse(JSON.stringify([formData.get('mood') as string])),
        Preparation_time: Number(formData.get('preparation_time')),
        Cooking_time: Number(formData.get('cooking_time')),
        Quantity: formData.get('quantity') as string,
        Difficultie: formData.get('difficulty') as string,
        Photo: "tkt",
        Tools: toolsList,
        Calorie: formData.get('calorie') as string
    };
    console.log(data);

    const response = await fetch('http://localhost:3001/api/recipe', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
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

    const { result_picture } = await response_picture.json()
    const update = {
        id: result.redirected,
        Photo: result_picture
    }
    await fetch('http://localhost:3001/recipe', {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
    })

}


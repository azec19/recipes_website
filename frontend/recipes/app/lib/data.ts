'use server'

import { StockIngredient, RecipeIngredient, Recipe } from "./type"
import { revalidatePath } from 'next/cache';
import { typeLabelToEnum, unitLabelToEnum } from "../lib/type"

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

export async function onSubmitStockIngredient(Ingredient: StockIngredient) {
    const data = {
        name: Ingredient.ingredient.name,
        type: typeLabelToEnum(Ingredient.ingredient.type) as string,
        quantity: Number(Ingredient.quantity),
        unit: unitLabelToEnum(Ingredient.unit) as string
    };

    const response = await fetch('http://localhost:3001/api/stockIngredient', {
        method: 'POST',
        headers: {
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
    const data = {
        ingredientId: Ingredient.ingredient.id,
        id:Ingredient.id,
        quantity: Number(Ingredient.quantity),
        unit: unitLabelToEnum(Ingredient.unit) as string
    };
    console.log(data);
    const response = await fetch(`http://localhost:3001/api/stockIngredient`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    console.log(await response.json());
    
}

export async function DeleteStockIngredient(name: string) {
    await fetch(`http://localhost:3001/api/stockIngredient/name/${name}`, {
        method: 'DELETE',
    });
}


export async function onSubmitRecipe(formData: FormData) : Promise<{success: boolean, message?: string}> {


    const toolsList = JSON.parse(JSON.stringify((formData.get('tools') as string).split(",")))
    const data = {
        name: formData.get('name') as string,
        date: formData.get('date') as string,
        autor: formData.get('autor') as string,
        description: formData.get('description') as string,
        instructions: JSON.parse(JSON.stringify([formData.get('instructions') as string,])),
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
        return {success: false, message: (await response.json()).message}
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
        deleteRecipe(data.name)
        return {success: false, message: (await response_picture.json()).message}
    }

    const result_picture = await response_picture.json()

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
        deleteRecipe(data.name)
        return {success: false, message: (await update_response.json()).message}
    }
    return {success: true, message: await update_response.text()}

}

export async function deleteRecipe(name: String) {
    await fetch('http://localhost:3001/api/recipe/name/' + name, {
        method: 'Delete',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }
    )
}



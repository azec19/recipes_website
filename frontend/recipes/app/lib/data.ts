import { Ingredient } from "./type"
import { revalidatePath } from 'next/cache';

export async function fetchAllIngredients(): Promise<Ingredient[]> {
    const res = await fetch('http://localhost:3001/api/ingredient');
    let json = await res.json();
    return json    
}

export async function onSubmit(formData: FormData) {
        'use server';
        
        const data = {
            Name: formData.get('name_') as string,
            Type: formData.get('type') as string,
            Quantity: Number(formData.get('quantity')),
            Unit: formData.get('unit') as string,
        };
        console.log(data);

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

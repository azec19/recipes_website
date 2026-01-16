'use client'

import { log } from "console"
import Bandeau from "../Bandeau/Bandeau"
import { FormEvent } from 'react'

const ROUNDED = 8



export default function app() {

    async function onSubmit(event: FormEvent<HTMLFormElement >) {
        event.preventDefault()
        const form = event.currentTarget;
        const data = {
            Name: form.name_.value,
            Type: form.type.value,
            Quantity: parseFloat(form.quantity.value),
            Unit: form.unit.value 
        };
        console.log(data);
        
        const response = await fetch('/api/ingredient', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        // Handle response if necessary
        const result = await response.json()
        // ...
    }

    return (
        <div>
            <Bandeau />
            <div className="bg-white text-black font-inika mx-[20%] my-[3%] p-[3%] rounded-[30]">
                <div className="text-center text-[50px]">
                    <h1> Add a new ingredient </h1>
                </div>
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <input type="text" placeholder="Ingredient's name" className="border" style={{ borderRadius: ROUNDED }} name="name_" />
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder="Ingredient's type" className="border" style={{ borderRadius: ROUNDED }} name="type" />
                        </div>
                        <div className="mb-3">
                            <input type="number" step="0.1" placeholder="Ingredient's quantity" className="border" style={{ borderRadius: ROUNDED }} name="quantity" />
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder="Ingredient's unit" className="border" style={{ borderRadius: ROUNDED }} name="unit" />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>

    )
}
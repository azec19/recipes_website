'use client'

import Bandeau from "../Bandeau/Bandeau"
import { useState } from 'react';

const ROUNDED = 8 
export default function app(){


  return (
    <div>
    <Bandeau />  
        <div className="bg-white text-black font-inika mx-[20%] my-[3%] p-[3%] rounded-[30]">            
            <div className="text-center text-[50px]">
            <h1> Add a new recipe </h1>
            </div>    
            <div className="card-body">
                <form action="/auth/register" method="POST">
                    <div className="mb-3">
                        <input type="text" placeholder="Recipe's Name" className="border" style={{borderRadius: ROUNDED}} name="name"/>                        
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Date" className="border" style={{borderRadius: ROUNDED}} name="Date"/>                        
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Autor" className="border" style={{borderRadius: ROUNDED}} name="Autor"/>
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Description" className="border" style={{borderRadius: ROUNDED}} name="Description"/>
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Ingredients" className="border" style={{borderRadius: ROUNDED}} name="Ingredients"/>
                    </div>
                     <div className="mb-3">
                        <input type="text" placeholder="Instructions" className="border" style={{borderRadius: ROUNDED}} name="Instructions"/>
                    </div>

                    <div className="mb-3">
                        <input type="text" placeholder="Mood" className="border" style={{borderRadius: ROUNDED}} name="Mood"/>
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Preparation time" className="border" style={{borderRadius: ROUNDED}} name="Preparation time"/>
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Cooking time" className="border" style={{borderRadius: ROUNDED}} name="Cooking time"/>
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Quantity/Amount of people" className="border" style={{borderRadius: ROUNDED}} name="Quantity/Amount of people"/>
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Picture" className="border" style={{borderRadius: ROUNDED}} name="Picture"/>
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Tools" className="border" style={{borderRadius: ROUNDED}} name="Tools"/>
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Calorie, type of nutritional intake" className="border" style={{borderRadius: ROUNDED}} name="Calorie, type of nutritional intake"/>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
  </div>
  );
}

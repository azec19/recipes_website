'use client'
import Bandeau from "./Bandeau/Bandeau"
import { Recipe } from "./lib/type"
import SearchBar from "./Recipe/searchBar"
import RecipeContent from "./Recipe/uniqueRecipe"
import { useState, useMemo } from 'react'

export default function Recipeclient({ recipes } : { recipes: Recipe[]}) {
    const [searchBarinput, setSearchBarinput] = useState('')

    const filteredRecipes = useMemo(() => {
        return recipes.filter(recipe =>
            recipe.name.toLowerCase().startsWith(searchBarinput.toLowerCase())
        )
    }, [recipes, searchBarinput])

    return (
        <div>


            <Bandeau />
            <h1 className="text-center font-inika text-[50px]">List des recettes</h1>
            <SearchBar value_={searchBarinput} onChange_={setSearchBarinput} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-fr gap-10 w-[90vw] ml-[5vw] mt-[5vh]">
                {
                    filteredRecipes.map(recipe => (
                        <RecipeContent key={recipe.id} recipe={recipe} />
                    ))
                }
            </div>
        </div>

    )
}

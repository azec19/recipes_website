'use client'
import Bandeau from "./Bandeau/Bandeau"
import { Recipe } from "./lib/type"
import SearchBar from "./AddRecipe/searchBar"
import RecipeContent from "./AddRecipe/uniqueRecipe"
import { useState, useMemo } from 'react'

type Props = {
    recipes: Recipe[];
};

export default function Recipeclient(Props: Props) {
    const recipes = Props.recipes
    const [searchBarinput, setSearchBarinput] = useState('')

    const filteredRecipes = useMemo(() => {
        return recipes.filter(recipe =>
            recipe.name.toLowerCase().startsWith(searchBarinput.toLowerCase())
        )
    }, [recipes, searchBarinput])

    return (
        <div>
            <Bandeau />
            <h1 className="text-center font-inika text-[50px]">Liste des recettes</h1>
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

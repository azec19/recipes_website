
import Bandeau from "../Bandeau/Bandeau"
import SearchBar from "./searchBar"
import RecipeContent from "./uniqueRecipe"
import Forms from "./addForm"
import { Recipe } from "../lib/type"
import { fetchAllRecipes, fetchRecipesByName } from "../lib/data"
import recipe from "./uniqueRecipe"
import GridComponent from "./datagrid"

const ROUNDED = 8
export default async function app() {

    const recipes: Recipe = await fetchRecipesByName("Pâte pesto")
    return (
        <div>
            <Bandeau />
            <Forms />

            <h1 className="text-center font-inika text-[50px]">List des recettes</h1>
            <SearchBar />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-[90vw] ml-[5vw] mt-[5vh]">
                <RecipeContent recipe={recipes} />
                <RecipeContent recipe={recipes} />
                <RecipeContent recipe={recipes} />
                <RecipeContent recipe={recipes} />
            </div>
        </div>
    );
}


import Bandeau from "../Bandeau/Bandeau"
import Forms from "./addForm"
import { Recipe } from "../lib/type"
import { fetchAllRecipes, onSubmitRecipe } from "../lib/data"

const ROUNDED = 8
export default async function app() {

    const recipes: Recipe[] = await fetchAllRecipes()
    
    return (
        <div>
            <Bandeau />
            <Forms onSubmit={onSubmitRecipe}/>

            {/* <h1 className="text-center font-inika text-[50px]">List des recettes</h1>
            <SearchBar />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-[90vw] ml-[5vw] mt-[5vh]">
                {
                    recipes.map((recipe) => (
                        <RecipeContent key={recipe.id} recipe={recipe} />
                    ))
                }
            </div> */}
        </div>
    );
}

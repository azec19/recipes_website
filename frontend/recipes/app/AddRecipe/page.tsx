
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
        </div>
    );
}

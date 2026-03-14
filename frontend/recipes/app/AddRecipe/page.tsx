
import Bandeau from "../Bandeau/Bandeau"
import Forms from "./addForm"
import { Recipe } from "../lib/type"
import { fetchAllRecipes, onSubmitRecipe } from "../lib/data"

const ROUNDED = 8
export default async function app() {

    type response = Recipe[] | { message: string }

    const recipes: response = await fetchAllRecipes()
    if ('message' in recipes)
        return (
            <div>
                <Bandeau />

                <div className="flex m-[50px] items-center text-3xl justify-center text-red-700" ><strong className="font-bold">Vous n'êtes actuellement pas connecté.</strong></div>

            </div>

        )
    return (
        <div>
            <Bandeau />
            <Forms onSubmit={onSubmitRecipe} />
        </div>
    );
}

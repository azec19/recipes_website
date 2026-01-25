import Bandeau from "../Bandeau/Bandeau"
import { fetchAllIngredients, onSubmit } from "../lib/data"
import { Ingredient } from "../lib/type"
import DataGrid from "./datagrid"
import IngredientForm from "./addForm"

const ROUNDED = 8



export default async function app() {





    const ingredients: Ingredient[] = await fetchAllIngredients()
    ingredients.sort((a: Ingredient, b: Ingredient) => {
        const nameA = a.Name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.Name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    })


    return (
        <div>
            <Bandeau />

            <DataGrid ingredients={ingredients} />
            <div className="text-center text-[50px]">
                <h1> Ajout d'un nouvel ingrédient </h1>
            </div>
            <IngredientForm onSubmit={onSubmit} />

        </div>

    )
}
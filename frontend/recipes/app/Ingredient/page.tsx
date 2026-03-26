import Bandeau from "../Bandeau/Bandeau"
import { fetchAllStockIngredients, onSubmitStockIngredient } from "../lib/data"
import { StockIngredient } from "../lib/type"
import DataGrid from "./datagrid"
import IngredientForm from "./addForm"

const ROUNDED = 8

export default async function app() {

    type response = StockIngredient[] | { message: string }

    const ingredients: response = await fetchAllStockIngredients()
    if ('message' in ingredients)
        return (
            <div>
                <Bandeau />

                <div className="flex m-[50px] items-center text-3xl justify-center text-red-700" ><strong className="font-bold">Vous n'êtes actuellement pas connecté.</strong></div>
                <script>alert('Vous n\'êtes pas connecté. Vous allez être redirigé');
          window.location.href = "/login"; </script>
            </div>

        )
    ingredients.sort((a: StockIngredient, b: StockIngredient) => {
        const nameA = a.ingredient.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.ingredient.name.toUpperCase(); // ignore upper and lowercase
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
            <div className="text-center text-[50px]">
                <h1> Ajout d'un nouvel ingrédient </h1>
            </div>
            <div className="flex justify-center items-center">

            <DataGrid ingredients={ingredients} onSubmit={onSubmitStockIngredient} />

            </div>

        </div>

    )
}
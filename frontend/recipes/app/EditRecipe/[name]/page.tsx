import Bandeau from "../../Bandeau/Bandeau"
import EditForm from "./editForm"
import { Recipe } from "../../lib/type"
import { fetchRecipesByName, updateRecipe } from "../../lib/data"

export default async function EditRecipePage({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;

    const recipe: Recipe = await fetchRecipesByName(name);
    
    if (!recipe) {
        return (
            <div>
                <Bandeau />
                <div className="flex m-[50px] items-center text-3xl justify-center text-red-700">
                    <strong className="font-bold">Recette non trouvée.</strong>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Bandeau />
            <EditForm recipe={recipe} onSubmit={updateRecipe} />
        </div>
    );
}
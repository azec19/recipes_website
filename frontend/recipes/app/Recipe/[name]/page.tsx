'use server'
import { fetchRecipesByName } from "@/app/lib/data";
import { Recipe } from "../../lib/type"
import Recipeclient from "@/app/Recipe/[name]/pageclient";

export default async function RecipeServer({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params; 
    
    const recipe: Recipe = await fetchRecipesByName(name)
    return (
        <Recipeclient recipe={recipe} />
    )
}

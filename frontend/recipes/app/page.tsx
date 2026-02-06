import { fetchAllRecipes } from "./lib/data"
import { Recipe } from "./lib/type"
import RecipesClient from '@/app/pageclient'

export default async function Home() {
    const recipes: Recipe[] = await fetchAllRecipes()

  return <RecipesClient recipes={recipes} />
}

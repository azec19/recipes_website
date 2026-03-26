import { fetchAllRecipes } from "./lib/data"
import { Recipe } from "./lib/type"
import RecipesClient from '@/app/pageclient'
import Bandeau from "./Bandeau/Bandeau"

export default async function Home() {
  type response = Recipe[] | { message: string }
  const recipes: response = await fetchAllRecipes()  
  if ('message' in recipes)
    return (
      <div>
        <Bandeau />
        <div className="flex m-[50px] items-center text-3xl justify-center text-red-700" ><strong className="font-bold">Vous n'êtes actuellement pas connecté.</strong></div>
        <script>alert('Vous n\'êtes pas connecté. Vous allez être redirigé');
          window.location.href = "/login"; </script>

      </div>

    )
  return <RecipesClient recipes={recipes} />
}

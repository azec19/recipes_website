'use client'
import Bandeau from "../../Bandeau/Bandeau"
import { Recipe } from "../../lib/type"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


async function deleteRecipe(name: String) {
    await fetch('http://localhost:3001/api/recipe/name/' + name, {
        method: 'Delete',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }
    )
}

export default function Recipeclient({ recipe }: { recipe: Recipe }) {

    const list_instructions : string[] = recipe.instructions
    console.log(recipe);
    
    return (
        <div>
            <Bandeau />

            <div className="min-h-screen flex items-start justify-center">
                <div className="shadow-lg rounded-2xl overflow-hidden h-[80vh] max-w-[85vw] w-full grid lg:grid-cols-[35vw_1fr] gap-10 grid-cols-1">

                    {/* <!-- Recipe Image --> */}
                    <div className="relative aspect-[4/3] w-[35vw]">
                        <Image className="object-cover"
                            src={`/images/${recipe.photo}`}
                            fill
                            alt="Sunset in the mountains" />
                    </div>

                    {/* <!-- Recipe Content --> */}
                    <div className="p-6 flex flex-col justify-start">
                        <div>
                            <h2 className="text-3xl font-bold font-serif text-gray-800 dark:text-white mb-2">{recipe.name}</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{recipe.description}</p>

                            {/* <!-- Ingredients --> */}
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400 mb-2">Ingredients</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-200 text-sm">
                                    {
                                        recipe.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient.quantity} {ingredient.unit} {ingredient.ingredient.name}</li>
                                        ))
                                    }
                                </ul>
                            </div>

                            {/* <!-- Instructions --> */}
                            <div>
                                <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400 mb-2">Instructions</h3>
                                <ol className="list-decimal pl-5 space-y-1 text-gray-700 dark:text-gray-200 text-sm">
                                    {
                                        list_instructions.map((instruction, index) => (
                                            <li key={index}>{instruction}</li>
                                        ))
                                    }
                                </ol>
                            </div>
                        </div>

                        {/* <!-- Footer CTA --> */}
                        <div className="mt-6 text-right">
                            <Link href="/" 
                            onNavigate={() => deleteRecipe(recipe.name)

                            }> 
                              <button  className="bg-red-500 hover:bg-red-700 cursor-pointer text-white font-semibold px-4 py-2 rounded-lg transition">Delete</button>
                            </Link>
                          </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

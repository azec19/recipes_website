'use client'
import Bandeau from "../../Bandeau/Bandeau"
import { Recipe, Mood, Difficulties } from "../../lib/type"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { deleteRecipe } from "../../lib/data"




function getDifficultyColor(difficulty: string): string {
    console.log(difficulty);
    
    switch (difficulty) {
        case "EASY": return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        case "MEDIUM": return 'bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-200';
        case "TECHNICAL": return 'bg-gray-400 text-gray-800 dark:bg-gray-500 dark:text-gray-200';
        case "HARD": return 'bg-gray-500 text-gray-800 dark:bg-gray-400 dark:text-gray-200';
        case "IMPOSSIBLE": return 'bg-gray-600 text-white dark:bg-gray-300 dark:text-gray-800';
        default: return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
}

export default function Recipeclient({ recipe }: { recipe: Recipe }) {

    const router = useRouter();
    const list_instructions: string[] = recipe.instructions;

    const handleDelete = async () => {
        await deleteRecipe(recipe.name);
        router.push('/');
    };
    // const difficultyLabel = Object.values(Object.values(Difficulties))
    const difficultyLabel = Difficulties[recipe.difficultie] || recipe.difficultie;
    
    return (
        <div>
            <Bandeau />

            <div className="min-h-screen flex items-start justify-center py-8">
                <div className="shadow-xl rounded-3xl overflow-hidden max-w-6xl w-full bg-[#515151]">

                    {/* Recipe Header */}
                    <div className="relative h-96">
                        <Image className="object-cover"
                            src={`/images/${recipe.photo}`}
                            fill
                            alt={recipe.name} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end">
                            <div className="p-8 text-white">
                                <h1 className="text-4xl font-bold font-serif mb-2">{recipe.name}</h1>
                                <p className="text-lg opacity-90">{recipe.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">

                        {/* Metadata Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Auteur</h4>
                                <p className="text-lg font-medium text-white">{recipe.autor}</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Temps de préparation</h4>
                                <p className="text-lg font-medium text-white">{recipe.preparation_time} min</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Temps de cuisson</h4>
                                <p className="text-lg font-medium text-white">{recipe.cooking_time} min</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Difficulté</h4>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(recipe.difficultie)}`}>
                                    {difficultyLabel}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Quantité</h4>
                                <p className="text-lg font-medium text-white">{recipe.quantity} portions</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Calories</h4>
                                <p className="text-lg font-medium text-white">{recipe.calorie} kcal</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Date</h4>
                                <p className="text-lg font-medium text-white">{new Date(recipe.date).toLocaleDateString('fr-FR')}</p>
                            </div>
                        </div>

                        {/* Mood Tags */}
                        {recipe.mood.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold text-gray-300 mb-4">Ambiance</h3>
                                <div className="flex flex-wrap gap-2">
                                    {recipe.mood.map((mood, index) => (
                                        <span key={index} className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {mood}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Ingredients */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-gray-300 mb-4">Ingrédients</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index} className="flex items-center bg-gray-700 p-3 rounded-lg">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                        <span className="text-white">
                                            {ingredient.quantity} {ingredient.unit} {ingredient.ingredient.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Instructions */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-gray-300 mb-4">Instructions</h3>
                            <ol className="space-y-4">
                                {list_instructions.map((instruction, index) => (
                                    <li key={index} className="flex">
                                        <span className="flex-shrink-0 w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-0.5">
                                            {index + 1}
                                        </span>
                                        <p className="text-white leading-relaxed">{instruction}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Tools */}
                        {recipe.tools.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold text-gray-300 mb-4">Ustensiles</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {recipe.tools.map((tool, index) => (
                                        <li key={index} className="flex items-center bg-gray-700 p-3 rounded-lg">
                                            <span className="text-2xl mr-3">🔧</span>
                                            <span className="text-white">{tool}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Footer CTA */}
                        <div className="flex justify-end pt-6 border-t border-gray-600">
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                            >
                                Supprimer la recette
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

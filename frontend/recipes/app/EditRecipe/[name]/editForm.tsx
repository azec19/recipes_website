'use client'

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import GridComponent from "../../AddRecipe/datagrid";
import { Difficulties, Mood, Recipe, Units_, Types_, RecipeIngredient, unitLabelToKey, typeLabelToKey } from "../../lib/type"
import { listIngredients } from '../../lib/Formstore';

type Props = {
    recipe: Recipe;
    onSubmit: (formData: FormData) => Promise<{ success: boolean, message?: string }>;
};

export default function EditForm({ recipe, onSubmit }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { list, reset, setList } = listIngredients()

    type Moods = keyof typeof Mood
    const moods: Moods[] = Object.keys(Mood) as Moods[];

    type Difficulties = keyof typeof Difficulties
    const difficulties: Difficulties[] = Object.keys(Difficulties) as Difficulties[];

    useEffect(() => {
        // Pré-remplir les ingrédients

        setList(recipe.ingredients.map((ingredient) => {
            const new_ingredient : any = {
                quantity: ingredient.quantity,
                id: ingredient.id,
                unit: Units_[ingredient.unit],
                ingredient: {
                    name: ingredient.ingredient.name,
                    id: ingredient.ingredient.id,
                    type: Types_[ingredient.ingredient.type]
                }
            }
            return new_ingredient;
        }));
    }, [recipe, setList]);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            setError(null);

            const formData = new FormData(e.currentTarget);
            formData.append('id', recipe.id.toString()); // Ajouter l'id pour update
            formData.append('ingredients', JSON.stringify(list.map((ingredient) => {
                            ingredient.unit = unitLabelToKey(ingredient.unit)
                            ingredient.ingredient.type = typeLabelToKey(ingredient.ingredient.type)
                            return ingredient
                        })))
            const list_instructions = formData.get('instructions') as string
            
            formData.append('instructions', JSON.stringify(list_instructions.split('\n')))
            
            const result = await onSubmit(formData)

            if (result.success) {
                reset()
                router.push(`/Recipe/${encodeURIComponent(formData.get('name') as string)}`) // Rediriger vers la page de la recette
            } else {
                setError(result.message || 'Une erreur est survenue lors de la modification de la recette')
            }
        } catch (err) {
            setError('Une erreur inattendue est survenue')
            console.error(err)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white rounded-xl w-[50vw] text-black font-inika">
                <div className="text-center text-[50px]">
                    <h1> Modifier la recette </h1>
                </div>
                {error && (
                    <div className="mx-auto w-full max-w-[550px] mb-4">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            <strong className="font-bold">Erreur:</strong>
                            <span className="block sm:inline ml-2">{error}</span>
                        </div>
                    </div>
                )}
                <div className="flex items-center justify-center p-12">
                    <div className="mx-auto w-full max-w-[550px] bg-white">
                        <form onSubmit={submit}>
                            <div className="mb-5">
                                <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Nom de la recette
                                </label>
                                <input required type="text" placeholder="Nom" name="name" defaultValue={recipe.name}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium placeholder:text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Date de création
                                        </label>
                                        <input required type="date" placeholder="Date" name="date" defaultValue={recipe.date.toString().split('T')[0]}
                                             className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium placeholder:text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Mood
                                        </label>
                                        <select name="mood" defaultValue={recipe.mood[0]}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium placeholder:text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                                            {moods.map(mood => (
                                                <option key={mood} value={mood}>{Mood[mood]}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Auteur de la recette
                                </label>
                                <input required type="text" placeholder="Auteur" name="autor" defaultValue={recipe.autor}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium placeholder:text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Description de la recette
                                </label>
                                <textarea required placeholder="Description" rows={3} name="description" defaultValue={recipe.description}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Ingredients
                                </label>
                                <GridComponent />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Instructions pour la recette (séparer les instructions par des sauts de lignes pour établir une liste)
                                </label>
                                <textarea required placeholder="Instructions" rows={6} name="instructions" defaultValue={recipe.instructions?.join('\n')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                            </div>

                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Temps de préparation
                                        </label>
                                        <input required type="number" placeholder="Preparation time" name="preparation_time" defaultValue={recipe.preparation_time}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium placeholder:text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Temps de cuisson
                                        </label>
                                        <input required type="number" placeholder="Cooking time" name="cooking_time" defaultValue={recipe.cooking_time}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium placeholder:text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Nombre de personne prévu
                                </label>
                                <input required type="text" placeholder="Quantité/Nombre de personne" name="quantity" defaultValue={recipe.quantity}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium placeholder:text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="mb-5 sm:w-1/2">
                                    <label htmlFor="name" className="mb-3 mr-10 block text-base font-medium text-[#07074D]">
                                        Photo de la recette
                                    </label>
                                    <div className="rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md">
                                        <label htmlFor="upload" className="flex flex-col items-center gap-2 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 fill-white stroke-indigo-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            {!file && (
                                                <span className="text-gray-600 font-medium">Upload file (optionnel)</span>
                                            )}
                                            {file && (
                                                <span className="text-gray-600 font-medium">
                                                    Fichier chargé ✅
                                                </span>
                                            )}
                                        </label>
                                        <input id="upload" type="file" className="hidden" name="picture"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setFile(e.target.files[0]);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Difficulté
                                        </label>
                                        <br />
                                        <select name="difficulty" defaultValue={recipe.difficultie}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium placeholder:text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                                            {difficulties.map(difficultie => (
                                                <option key={difficultie} value={difficultie}>{Difficulties[difficultie]}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="name" className="mb-3 mr-10 block text-base font-medium text-[#07074D]">
                                    Outils nécessaires (séparer les ustensiles par des virgules pour établir une liste)
                                </label>
                                <textarea required placeholder="Outils nécessaires" rows={4} name="tools" defaultValue={recipe.tools?.join(', ')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="mb-3 mr-10 block text-base font-medium text-[#07074D]">
                                    Calorie, type d'apport nutritionel
                                </label>
                                <textarea required placeholder="Calorie, type d'apport nutritionel" rows={4} name="calorie" defaultValue={recipe.calorie}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                            </div>
                            <button type="submit" disabled={isLoading} className="hover:bg-[#6b64f29f] cursor-pointer rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none disabled:opacity-50 disabled:cursor-not-allowed">
                                {isLoading ? 'Envoi en cours...' : 'Modifier'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
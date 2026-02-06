
'use client'

import GridComponent from "./datagrid";
import { Difficulties, Mood, typeLabelToEnum,unitLabelToEnum} from "../lib/type"
import { listIngredients } from '../lib/Formstore';

type Props = {
    onSubmit: (formData: FormData) => Promise<void>;
};

export default function formRecipe({ onSubmit }: Props) {

    const { list, reset } = listIngredients()

    type Moods = keyof typeof Mood
    const moods: Moods[] = Object.keys(Mood) as Moods[];


    type Difficulties = keyof typeof Difficulties
    const difficulties: Difficulties[] = Object.keys(Difficulties) as Difficulties[];


    

    const submit = async (formData: FormData) => {
        // tu peux enrichir les données
        console.log(list);
        
        list.forEach((ingredient) => ingredient.ingredient.type = typeLabelToEnum(ingredient.ingredient.type))
        list.forEach((ingredient) => ingredient.unit = unitLabelToEnum(ingredient.unit))
        formData.append('ingredients', JSON.stringify(list))
        await onSubmit(formData)
        reset() // reset Zustand après succès
    }

    return (
        <div className="bg-white text-black font-inika">
            <div className="text-center text-[50px]">
                <h1> Ajouter une nouvelle recette </h1>
            </div>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px] bg-white">
                    <form action={submit}>
                        <div className="mb-5">
                            <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                Nom de la recette
                            </label>
                            <input type="text" placeholder="Nom" name="name" 
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Date de création
                                    </label>
                                    <input type="text" placeholder="Date" name="date"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Mood
                                    </label>
                                    <select name="mood"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
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
                            <input type="text" placeholder="Auteur" name="autor"  
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                                Description de la recette
                            </label>
                            <textarea placeholder="Description" rows={3} name="description"  
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
                                Instructions pour la recette
                            </label>
                            <textarea placeholder="Instructions" rows={6} name="instructions"  
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                        </div>

                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Temps de préparation
                                    </label>
                                    <input type="number" placeholder="Preparation time" name="preparation_time"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Temps de cuisson
                                    </label>
                                    <input type="number" placeholder="Cooking time" name="cooking_time"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                Nombre de personne prévu
                            </label>
                            <input type="text" placeholder="Quantité/Nombre de personne" name="quantity"  
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
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
                                        <span className="text-gray-600 font-medium">Upload file</span>
                                    </label>
                                    <input id="upload" type="file" className="hidden" name="picture" />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Difficulté
                                    </label>
                                    <br />
                                    <select name="difficulty"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
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
                            <textarea placeholder="Outils nécessaires" rows={4} name="tools"  
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="mb-3 mr-10 block text-base font-medium text-[#07074D]">
                                Calorie, type d'apport nutritionel
                            </label>
                            <textarea placeholder="Calorie, type d'apport nutritionel" rows={4} name="calorie"  
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                        </div>
                        <button type="submit" className="hover:bg-[#6b64f29f] cursor-pointer rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
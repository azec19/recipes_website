import { Recipe, Mood } from "../lib/type"
import Image from 'next/image'



export default function formRecipe() {


    type Moods = keyof typeof Mood
    const moods: Moods[] = Object.keys(Mood) as Moods[];
    return (
        <div className="bg-white text-black font-inika">
            <div className="text-center text-[50px]">
                <h1> Ajouter une nouvelle recette </h1>
            </div>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px] bg-white">
                    <form action="/auth/register" method="POST">
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
                                    <input type="text" placeholder="Date" name="Date"
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
                                            <option key={mood} value={Mood[mood]}>{Mood[mood]}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                Auteur de la recette
                            </label>
                            <input type="text" placeholder="Auteur" name="Autor"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder="Description" className="border" name="Description" />
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder="Ingredients" className="border" name="Ingredients" />
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder="Instructions" className="border" name="Instructions" />
                        </div>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Temps de préparation
                                    </label>
                                    <input type="number" placeholder="Preparation time" name="Preparation time"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Temps de cuisson
                                    </label>
                                    <input type="number" placeholder="Cooking time" name="Cooking time"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder="Quantity/Amount of people" className="border" name="Quantity/Amount of people" />
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder="Picture" className="border" name="Picture" />
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder="Tools" className="border" name="Tools" />
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder="Calorie, type of nutritional intake" className="border" name="Calorie, type of nutritional intake" />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
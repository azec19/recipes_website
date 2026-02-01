import { Recipe } from "../lib/type"
import style from './uniqueRecipe.module.css'
import Image from 'next/image'

type Props = {
    recipe: Recipe;
};

export default function recipe({ recipe }: Props) {
    return (
        <div className="rounded-xl overflow-hidden shadow-lg flex flex-col bg-[#515151]">
            <div className="relative ">
                <Image className="w-full "
                    src={`/images/${recipe.Photo}`}
                    alt="Sunset in the mountains"
                    width={1000}
                    height={1000}/>
                <div
                    className="cursor-pointer hover:bg-gray-900 transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-transparent opacity-25">
                </div>
            </div>

            <div className="px-6 py-4 mb-auto">
                <div className="font-medium text-3xl inline-block hover:text-black transition duration-200 ease-in-out mb-2 cursor-pointer">{recipe.Name}</div>
                <div className="text-gray-300 text-sm">{recipe.Description}</div>
            </div>
            <div className={`${style.box} ${style.preparation}`}></div>
            <div className={`${style.box} ${style.cooking}`}></div>
            {/* <div className={`${style.box} ${style.difficulties}`}>Difficulté :{recipe.Difficultie}</div>
            <div className={`${style.box} ${style.mood}`}>Type : {recipe.mood}</div> */}
            <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                <span className="py-1 text-xs text-gray-900 mr-1 flex flex-row items-center">
                    <svg height="13px" width="13px" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
                        <g>
                            <g>
                                <path
                                    d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z">
                                </path>
                            </g>
                        </g>
                    </svg>
                    <span className="ml-1">Préparation : {recipe.Preparation_time} min</span>
                </span>

                <span className="py-1 text-xs text-gray-900 mr-1 flex flex-row items-center">
                    <svg className="h-5" fill="#000000" viewBox="10 -15 122.88 75" stroke="currentColor">
                        <path strokeWidth="2"
                            d="M4.98,27.65H29.7c2.16,0,4.01,1.39,4.7,3.33h20.28l-0.76-4.02c-0.17-0.9,0.42-1.76,1.32-1.93 c0.1-0.02,0.2-0.03,0.3-0.03v0h65.68c0.91,0,1.66,0.74,1.66,1.66c0,0.19-0.03,0.37-0.09,0.54l-2.69,10.18 c-0.77,2.93-2.07,5.69-4.02,7.63c-1.76,1.76-4.02,2.86-6.84,2.86h-42.5c-2.88,0-5.26-1.13-7.09-2.96 c-1.95-1.95-3.24-4.69-3.79-7.65l-0.56-2.96H34.4c-0.69,1.93-2.54,3.33-4.7,3.33H4.98C2.25,37.62,0,35.38,0,32.64 C0,29.9,2.24,27.65,4.98,27.65L4.98,27.65z M104.49,0.48c0.65-0.65,1.7-0.65,2.34,0s0.65,1.7,0,2.34c-1.58,1.58-0.86,2.93-0.02,4.5 c1.41,2.64,3.04,5.67,0.28,10.44c-0.46,0.79-1.47,1.06-2.26,0.6c-0.79-0.46-1.06-1.47-0.6-2.26c1.83-3.18,0.68-5.34-0.33-7.23 C102.44,6.15,101.18,3.8,104.49,0.48L104.49,0.48z M92.17,0.48c0.65-0.65,1.7-0.65,2.34,0s0.65,1.7,0,2.34 c-1.58,1.58-0.86,2.93-0.02,4.5c1.41,2.64,3.04,5.67,0.28,10.44c-0.46,0.79-1.47,1.06-2.26,0.6c-0.79-0.46-1.06-1.47-0.6-2.26 c1.83-3.18,0.68-5.34-0.33-7.23C90.12,6.15,88.86,3.8,92.17,0.48L92.17,0.48z M79.86,0.48c0.65-0.65,1.7-0.65,2.34,0 c0.65,0.65,0.65,1.7,0,2.34c-1.58,1.58-0.86,2.93-0.02,4.5c1.41,2.64,3.04,5.67,0.28,10.44c-0.46,0.79-1.47,1.06-2.26,0.6 c-0.79-0.46-1.06-1.47-0.6-2.26c1.83-3.18,0.68-5.34-0.33-7.23C77.8,6.15,76.54,3.8,79.86,0.48L79.86,0.48z M67.54,0.48 c0.65-0.65,1.7-0.65,2.34,0c0.65,0.65,0.65,1.7,0,2.34c-1.58,1.58-0.86,2.93-0.02,4.5c1.41,2.64,3.04,5.67,0.28,10.44 c-0.46,0.79-1.47,1.06-2.26,0.6s-1.06-1.47-0.6-2.26c1.83-3.18,0.68-5.34-0.33-7.23C65.49,6.15,64.23,3.8,67.54,0.48L67.54,0.48z M116.91,36.53l2.17-8.22H57.54l1.57,8.34c0.44,2.32,1.42,4.45,2.89,5.92c1.23,1.23,2.83,1.99,4.75,1.99h42.5 c1.85,0,3.33-0.73,4.5-1.89C115.25,41.16,116.28,38.94,116.91,36.53L116.91,36.53z">
                        </path>
                    </svg>
                    <span className="ml-1">Cuisson : {recipe.Cooking_time} min</span>
                </span>
            </div>
        </div>
    )
}
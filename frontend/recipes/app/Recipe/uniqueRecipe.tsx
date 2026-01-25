import { Recipe } from "../lib/type"
import style from './uniqueRecipe.module.css'

type Props = {
    recipe: Recipe;
};

export default function recipe({ recipe }: Props) {
    console.log(recipe);

    return (
        <div className={style.grid}>
            <div className={`${style.box} ${style.photo}`}>fetching {recipe.Photo}</div>
            <div className={`${style.box} ${style.name}`}>{recipe.Name}</div>
            <div className={`${style.box} ${style.preparation}`}>temps de préparation :{recipe.Preparation_time}</div>
            <div className={`${style.box} ${style.cooking}`}>temps de cuisson :{recipe.Cooking_time}</div>
            <div className={`${style.box} ${style.difficulties}`}>Difficulté :{recipe.Difficultie}</div>
            <div className={`${style.box} ${style.mood}`}>Type : {recipe.mood}</div>
        </div>
    )
}
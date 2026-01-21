import { Recipe } from "../lib/type"

export default function recipe(recipe: Recipe) {
    return (
        <div className="container">
            <div className="item photo"> fetching {recipe.Photo} </div>
            <div className="item name">{recipe.Name} </div>
            <div className="item preparation">{recipe.Preparation_time} </div>
            <div className="item cooking"> {recipe.Cooking_time}</div>
            <div className="item difficulties">{recipe.Difficultie} </div>
            <div className="item mood"> {recipe.mood}</div>
        </div>
    )
}
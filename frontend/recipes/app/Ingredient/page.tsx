import Bandeau from "../Bandeau/Bandeau"
import { fetchAllIngredients, onSubmit } from "../lib/data"
import { Ingredient, Types_, Units_ } from "../lib/type"
import styles from "./page.module.css"
import DataGrid from "./datagrid"

const ROUNDED = 8



export default async function app() {

    



    const ingredients:Ingredient[] = await fetchAllIngredients()


    type Types = keyof typeof Types_
    const types: Types[] = Object.keys(Types_) as Types[];


    type Units = keyof typeof Units_
    const units: Units[] = Object.keys(Units_) as Units[];

    return (
        <div>
            <Bandeau />

            <DataGrid ingredients={ingredients}/>
            
            <div className="bg-white text-black font-inika mx-[20%] my-[3%] p-[3%] rounded-[30]">
                <div className="text-center text-[50px]">
                    <h1> Ajout d'un nouvel ingrédient </h1>
                </div>
                <div className="card-body">
                    <form action={onSubmit}>
                        <div className="mb-3">
                            <input type="text" placeholder="Ingredient's name" className="border rounded-lg" name="name_" />
                        </div>
                        <div className="mb-3">
                            <select className="border rounded-lg" name="type">
                                {types.map(type => (
                                    <option key={type} value={type}>{Types_[type]}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <input type="number" step="0.1" placeholder="Ingredient's quantity" className="border rounded-lg" name="quantity" />
                        </div>
                        <div className="mb-3">
                            <select className="border rounded-lg" name="unit">
                                {units.map(unit => (
                                    <option key={unit} value={unit}>{Units_[unit]}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>

    )
}
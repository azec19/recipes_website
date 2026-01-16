import Image from "next/image";
import App from "../list";
import { Link } from "react-router";

export default function Bandeau() {
  return (
    <div className="font-inika">
      <main className="flex justify-between py-3 px-3 min-w-screen bg-(--color-background) sm:items-start">
      <div className="flex">
        <Image
          className="dark:invert"
          src="/logo.svg"
          alt="Next.js logo"
          width={100}
          height={10}
          priority
        />
        <div className="text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs font-script text-7xl leading-19 tracking-tight text-black dark:text-zinc-50">
            Recipes 
          </h1>
        </div>
        </div>
        <div className="flex justify-between gap-x-15 font-medium">
          
          <a
            className="cursor-pointer text-2xl/20 relative after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
            href="/AddRecipe"
          >
            Add a new recipe
          </a>
          <a
            className="cursor-pointer text-2xl/20 relative after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
            href="/Ingredient"
          >
          Ingredient
          </a>

          <a
            className="cursor-pointer text-2xl/20 relative after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
            href="/AddRecipe"
          >
          Calendar
          </a>
</div>
          <button
            className="cursor-pointer bg-white text-black rounded-xl mt-5 px-7 py-2"
          >
            
            Log in
            </button>


      </main>
    </div>
  );
}

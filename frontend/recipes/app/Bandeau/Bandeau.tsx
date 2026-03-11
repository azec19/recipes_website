'use client'

import Link from 'next/link';

export default function Bandeau() {
  return (
    <div className="font-inika">
      <main className="flex justify-between py-3 px-3 min-w-screen bg-(--color-background) items-start">
        <div className="flex-1 flex justify-start">
          <img
            src="/logo.svg"
            alt="Logo"
            className="dark:invert w-[100px] h-auto max-w-none"
          />
          <div className="text-center sm:items-start sm:text-left">
            <Link
              className="max-w-xs font-script text-7xl leading-19 tracking-tight text-black dark:text-zinc-50"
              href="/">
              Recette
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center gap-x-15 font-medium flex-nowrap">
          <Link
            className="cursor-pointer text-2xl/20 relative after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 whitespace-nowrap"
            href="/AddRecipe"
          >
            Ajouter une recette
          </Link>
          <Link
            className="cursor-pointer text-2xl/20 relative after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 whitespace-nowrap"
            href="/Ingredient"
          >
            Ingredients
          </Link>

          <Link
            className="cursor-pointer text-2xl/20 relative after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 whitespace-nowrap"
            href="/AddRecipe"
          >
            Calendrier
          </Link>
        </div>

        <div className="flex-1 flex justify-end">
          <button
            className="cursor-pointer bg-white text-black rounded-xl mt-5 px-7 py-2">
            Log in
          </button>
        </div>

      </main>
    </div>
  );
}

import { create } from 'zustand'
import { Recipe, RecipeIngredient } from "./type"

type IngredientStore = {
  list: RecipeIngredient[];
  add: (ingredient: RecipeIngredient) => void;
  remove: (id: string) => void;
  reset: () => void;
};

export const listIngredients = create<IngredientStore>((set) => ({
  list: [],
  add: (ingredient: RecipeIngredient) => set((self) => {
    const exists = self.list.some(
      (i) => i.ingredient.name === ingredient.ingredient.name
    )

    if (exists) {
      return self // aucun changement
    }

    return {
      list: [...self.list, ingredient],
    }
  }),
  remove: (name: string) => set((self) => ({ list: self.list.filter((i) => i.ingredient.name !== name) })),
  reset: () => set(() => ({ list: [] }))
}))
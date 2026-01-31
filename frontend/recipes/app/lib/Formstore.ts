import { create } from 'zustand'
import { Recipe, Ingredient } from "./type"

type IngredientStore = {
  list: Ingredient[];
  add: (ingredient: Ingredient) => void;
  remove: (id: string) => void;
  reset: () => void;
};

export const listIngredients = create<IngredientStore>((set) => ({
  list: [],
  add: (ingredient: Ingredient) => set((self) => {
    const exists = self.list.some(
      (i) => i.Name === ingredient.Name
    )

    if (exists) {
      return self // aucun changement
    }

    return {
      list: [...self.list, ingredient],
    }
  }),
  remove: (name: string) => set((self) => ({ list: self.list.filter((i) => i.Name !== name) })),
  reset: () => set((self) => ({ list: [] }))
}))
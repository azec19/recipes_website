import { create } from 'zustand'
import {Recipe, Ingredient} from "../lib/type"

type IngredientStore = {
  list: Ingredient[];
  add: (ingredient: Ingredient) => void;
  remove: (id: Int16Array) => void;
  reset: () => void;
};

export const listIngredients = create<IngredientStore>((set) => ({
    list: [],
    add: (ingredient: Ingredient) => set((self) => ({list: [...self.list, ingredient],})),
    remove: (id: Int16Array) => set((self) => ({list: self.list.filter((i) => i.id !== id)})),
    reset: () => set((self) => ({list: []}))
}))
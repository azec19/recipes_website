export const Types_ = {
  FECULENT: 'Féculent',
  LEGUME: 'Légume',
  FRUIT: 'Fruit',
  LAITIER: 'Laitier',
  VIANDE: 'Viande',
  POISSON: 'Poisson',
  MATIERE_GRASSE: 'Matière grasse',
  EPICE: 'Epice',
  LIQUIDE: 'Liquide',
  SAUCE: 'Sauce',
  AUTRE: 'Autre'
} as const;

export type TypeKey = keyof typeof Types_;
export type TypeLabel = typeof Types_[TypeKey];
export function typeLabelToKey(label: string): TypeKey {
  // Object.entries → [key, value]
  console.log(label);
  
  return (Object.entries(Types_) as [TypeKey, string][])
    .find(([, v]) => v === label)?.[0] as TypeKey;
}

export const Units_ = {
    KG: 'Kilogramme',
    GR: 'Gramme',
    L: 'Litre',
    CL: 'Centilitre',
    DL: 'Décilitre',
    UNITE: 'Unité',
} as const;

export type UnitKey = keyof typeof Units_;
export type UnitLabel = typeof Units_[UnitKey];
export function unitLabelToKey(label: string): UnitKey {
  console.log(label);
  return (Object.entries(Units_) as [UnitKey, string][])
    .find(([, v]) => v.toLowerCase() === label.toLowerCase())?.[0] as UnitKey;
}

export type StockIngredient = {
    id: number;
    quantity: number;
    unit: UnitKey;
    ingredient: {
        id: number
        name: string
        type: TypeKey
    }
}

export type RecipeIngredient = {
    id: number;
    quantity: number;
    unit: UnitKey;
    ingredient: {
        id: number
        name: string
        type: TypeKey
    }
}

export const Mood = {
    CHILL: "Chill",
    PARTY:  "Festif",
    BEFORE:  "Apéro",
    MAIN_DISHES: "Plat principale",
    DESERT: "Dessert"
}

export type MoodKey = keyof typeof Mood;
export type MoodLabel = typeof Mood[MoodKey];
export function moodLabelToKey(label: string): MoodKey {
  return (Object.entries(Mood) as [MoodKey, string][])
    .find(([, v]) => v.toLowerCase() === label.toLowerCase())?.[0] as MoodKey;
}

export const Difficulties = {
    EASY: "Facile",
    MEDIUM: "Moyen",
    TECHNICAL: "Technique",
    HARD: "Difficile",
    IMPOSSIBLE: "Impossible",
}

export type DifficultyKey = keyof typeof Difficulties;
export type DifficultyLabel = typeof Difficulties[DifficultyKey];
export function difficultieLabelToKey(label: string): DifficultyKey {
  return (Object.entries(Difficulties) as [DifficultyKey, string][])
    .find(([, v]) => v.toLowerCase() === label.toLowerCase())?.[0] as DifficultyKey;
}

export type Recipe = {
    id: number;
    name: string;
    date: Date;
    autor: string;
    description: string;
    instructions: string[];
    ingredients: RecipeIngredient[];
    mood: MoodKey[];
    preparation_time: number;
    cooking_time: number;
    quantity: string;
    difficultie: DifficultyKey;
    photo: string;
    tools: string[];
    calorie: string;
}
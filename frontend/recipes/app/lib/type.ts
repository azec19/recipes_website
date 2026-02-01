export enum Types_ {
    FECULENT = 'Féculent',
    LEGUME = 'Légume',
    FRUIT = 'Fruit',
    LAITIER = 'Laitier',
    VIANDE = 'Viande',
    POISSON = 'Poisson',
    MATIERE_GRASSE = 'Matière grasse',
    EPICE = 'Epice',
    LIQUIDE = 'Liquide',
    AUTRE = 'Autre'
}
export function typeLabelToEnum(value: string): Types_ {
  return (Object.entries(Types_) as [keyof typeof Types_, string][])
    .find(([, v]) => v === value)?.[0] as Types_;
}

export enum Units_ {
    KG = 'Kilogramme',
    GR = 'Gramme',
    L = 'Litre',
    CL = 'Centilitre',
    DL = 'Décilitre',
    UNITE = 'Unité',
}

export function unitLabelToEnum(value: string): Units_{
  return (Object.entries(Units_) as [keyof typeof Units_, string][])
    .find(([, v]) => v === value)?.[0] as Units_ ;
}
export type Ingredient = {
    id: number;
    Name: string;
    Type: Types_;
    Quantity: number;
    Unit: Units_
}

export enum Mood {
    CHILL = "Chill",
    PARTY = "Party",
    BEFORE = "Before",
    MAIN_DISHES = "Main dishe",
    DESERT = "Desert"
}

export enum Difficulties {
    EASY = "Facile",
    MEDIUM = "Moyen",
    TECHNICAL = "Technique",
    HARD = "Difficile",
    IMPOSSIBLE = "Impossible",
}

export type Recipe = {
  id : number;
  Name : string;
  Date : Date;
  Autor : string;
  Description : string;
  Instructions : string;
  Ingredients : Ingredient[];
  mood : Mood[];
  Preparation_time : number;
  Cooking_time : number;
  Quantity : string;
  Difficultie : Difficulties;
  Photo : string;
  Tools : string[];
  Calorie : string;
}
export enum Types_ {
    feculent = 'Féculent',
    legume = 'Légume',
    fruit = 'Fruit',
    laitier = 'Laitier',
    viande = 'Viande',
    poisson = 'Poisson',
    matiere_grasse = 'Matière grasse',
    epice = 'Epice',
    liquide = 'Liquide',
    autre = 'Autre'
}


export enum Units_ {
    Kg = 'Kilogramme',
    Gr = 'Gramme',
    L = 'Litre',
    cl = 'Centilitre',
    dl = 'Décilitre',
    unite = 'Unité',
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
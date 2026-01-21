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
    id: Int16Array;
    Name: string;
    Type: Types_;
    Quantity: Float16Array;
    Unit: Units_
}

export enum Mood {
    CHILL,
    PARTY,
    BEFORE,
    MAIN_DISHES,
    DESERT
}

export enum Difficulties {
    EASY = 0,
    MEDIUM,
    TECHNICAL,
    HARD,
    IMPOSSIBLE,
}

export type Recipe = {
  id : Int16Array;
  Name : string;
  Date : Date;
  Autor : string;
  Description : string;
  Instructions : string;
  Ingredients : Ingredient[];
  mood : Mood[];
  Preparation_time : Int16Array;
  Cooking_time : Int16Array;
  Quantity : string;
  Difficultie : Difficulties;
  Photo : string;
  Tools : string[];
  Calorie : string;
}
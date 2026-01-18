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
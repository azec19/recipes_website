import requests
from enum import Enum
import datetime
import json 

class Types(Enum):
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



class Units(Enum):
    Kg = 'Kilogramme'
    Gr = 'Gramme'
    L = 'Litre'
    cl = 'Centilitre'
    dl = 'Décilitre'
    unite = 'Unité'

class Mood(Enum) :
    CHILL = "Chill"
    PARTY = "Party"
    BEFORE = "Before"
    MAIN_DISHES = "Main dishe"
    DESERT = "Desert"

class Difficulties(Enum) :
    EASY = "Easy"
    MEDIUM = "Medium"
    TECHNICAL = "Technical"
    HARD = "Hard"
    IMPOSSIBLE = "Impossible"



class Ingredient :
    def __init__(self,id, name, type, quantity, unit):
        self.id = id
        self.name = name
        self.type = type
        self.quantity = quantity
        self.unit = unit

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "quantity": self.quantity,
            "unit": self.unit
        }
    
class Recette :
    def __init__(self, id, name, date, autor, description, instructions, ingredients,
                  mood, preparationTime:int, cookingTime:int, quantity,difficultie, photo, tools, calorie):
        self.id = id
        self.name = name
        self.date = date
        self.autor = autor
        self.description = description
        self.instructions = instructions
        self.ingredients = ingredients
        self.mood = mood
        self.preparationTime = preparationTime
        self.cookingTime = cookingTime
        self.quantity = quantity
        self.difficultie = difficultie
        self.photo = photo
        self.tools = tools
        self.calorie = calorie
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "date": self.date,
            "autor": self.autor,
            "description": self.description,
            "instructions": self.instructions,
            "ingredients": [i.to_dict() for i in self.ingredients],
            "mood": self.mood,
            "preparation_time": self.preparationTime,
            "cooking_time": self.cookingTime,
            "quantity": self.quantity,
            "difficultie": self.difficultie,
            "photo": self.photo,
            "tools": self.tools,
            "calorie": self.calorie
        }

list_ingredient = []
list_ingredient.append(Ingredient(0,"Carotte",'LEGUME',6,'KG'))
list_ingredient.append(Ingredient(0,"Patate",'FECULENT',5,'KG'))
list_ingredient.append(Ingredient(0,"Lait",'LAITIER',3,'L'))
list_ingredient.append(Ingredient(0,"Yaourt",'LAITIER',6,'UNITE'))
list_ingredient.append(Ingredient(0,"Pate",'FECULENT',1,'KG'))
list_ingredient.append(Ingredient(0,"Sel",'EPICE',500,'GR'))
list_ingredient.append(Ingredient(0,"Poivre",'EPICE',200,'GR'))
list_ingredient.append(Ingredient(0,"Pomme",'FRUIT',5,'UNITE'))
list_ingredient.append(Ingredient(0,"Gateau",'AUTRE',15,'UNITE'))
list_ingredient.append(Ingredient(0,"Steak",'VIANDE',750,'GR'))
list_ingredient.append(Ingredient(0,"Saumon",'POISSON',250,'GR'))

# url = 'http://localhost:3000/stockIngredient'
# for ingredient in list_ingredient:
#     x = requests.post(url, json = ingredient.__dict__, headers = {"accept": "application/json"})
#     print(x.text)


list_recette = []
list_recette.append(Recette(0,"pâte pesto", datetime.datetime.now().strftime("%x"),"Tanguy", "bon ca mere", "pate + pesto", [Ingredient(0,"Pate",'FECULENT',1,'KG'), Ingredient(0,"Pesto",'EPICE',50,'GR')],["CHILL"],0,15,"une personne","EASY","pate_pesto.jpg",["passoire","casserole"], "jsp"))
# list_recette.append(Recette(0,"pate bolo", datetime.datetime.now().strftime("%x"),"Tanguy", "bon ca mere", "pate + Bolo", [Ingredient(0,"Pate",'FECULENT',1,'KG'), Ingredient(0,"Bolo",'EPICE',250,'GR')],["CHILL"],0,15,"une personne","EASY","pate_pesto.jpg",["passoire","casserole"], "jsp"))
# list_recette.append(Recette(0,"Bouché à la reine", datetime.datetime.now().strftime("%x"),"Tanguy", "bon ca mere", "croute + sauce", [Ingredient(0,"Croute",'FECULENT',1,'UNITE'), Ingredient(0,"Pate",'FECULENT',500,'GR'), Ingredient(0,"Sauce","VIANDE", 500, 'GR')],["MAIN_DISHES"],0,25,"une personne","MEDIUM","pate_pesto.jpg",["casserole"], "jsp"))
# list_recette.append(Recette(0,"Risoto", datetime.datetime.now().strftime("%x"),"Tanguy", "de papa", "riz + pesto + chorizo", [Ingredient(0,"riz",'FECULENT',1,'KG'), Ingredient(0,"Pesto",'EPICE',50,'GR'),Ingredient(0,"Chorizo","VIANDE", 50, 'GR')],["CHILL"],15,30,"une personne","EASY","pate_pesto.jpg",["Poel","couteau","planche"], "jsp"))
# list_recette.append(Recette(0,"pate pesto", datetime.datetime.now(),"Tanguy", "bon ca mere", "pate + pesto", [Ingredient(0,"Pate",'FECULENT',1,'KG'), Ingredient(0,"Pesto",'EPICE',50,'GR')],["CHILL"],0,15,"une personne","tkt",["passoire","casserole"], "jsp"))
# list_recette.append(Recette(0,"pate pesto", datetime.datetime.now(),"Tanguy", "bon ca mere", "pate + pesto", [Ingredient(0,"Pate",'FECULENT',1,'KG'), Ingredient(0,"Pesto",'EPICE',50,'GR')],["CHILL"],0,15,"une personne","tkt",["passoire","casserole"], "jsp"))
# list_recette.append(Recette(0,"pate pesto", datetime.datetime.now(),"Tanguy", "bon ca mere", "pate + pesto", [Ingredient(0,"Pate",'FECULENT',1,'KG'), Ingredient(0,"Pesto",'EPICE',50,'GR')],["CHILL"],0,15,"une personne","tkt",["passoire","casserole"], "jsp"))
# list_recette.append(Recette(0,"pate pesto", datetime.datetime.now(),"Tanguy", "bon ca mere", "pate + pesto", [Ingredient(0,"Pate",'FECULENT',1,'KG'), Ingredient(0,"Pesto",'EPICE',50,'GR')],["CHILL"],0,15,"une personne","tkt",["passoire","casserole"], "jsp"))
# list_recette.append(Recette(0,"pate pesto", datetime.datetime.now(),"Tanguy", "bon ca mere", "pate + pesto", [Ingredient(0,"Pate",'FECULENT',1,'KG'), Ingredient(0,"Pesto",'EPICE',50,'GR')],["CHILL"],0,15,"une personne","tkt",["passoire","casserole"], "jsp"))
# list_recette.append(Recette(0,"pate pesto", datetime.datetime.now(),"Tanguy", "bon ca mere", "pate + pesto", [Ingredient(0,"Pate",'FECULENT',1,'KG'), Ingredient(0,"Pesto",'EPICE',50,'GR')],["CHILL"],0,15,"une personne","tkt",["passoire","casserole"], "jsp"))
# list_recette.append(Recette(0,"pate pesto", datetime.datetime.now(),"Tanguy", "bon ca mere", "pate + pesto", [Ingredient(0,"Pate",'FECULENT',1,'KG'), Ingredient(0,"Pesto",'EPICE',50,'GR')],["CHILL"],0,15,"une personne","tkt",["passoire","casserole"], "jsp"))

url = 'http://localhost:3000/recipe'
for recette in list_recette:
    x = requests.post(url, json = recette.to_dict(), headers = {"accept": "application/json"})
    print(x.text)


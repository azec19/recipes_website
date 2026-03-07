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
    def __init__(self, name, type):
        self.name = name
        self.type = type

    def to_dict(self):
        return {
            "name": self.name,
            "type": self.type,
        }

class StockIngredient :
    def __init__(self, name, type, quantity, unit):
        self.ingredient = Ingredient(name, type)
        self.quantity = quantity
        self.unit = unit

    def to_dict(self):
        return {
            "name": self.ingredient.name,
            "type": self.ingredient.type,
            "quantity": self.quantity,
            "unit": self.unit
        }
    
class RecipeIngredient :
    def __init__(self, name, type, quantity, unit):
        self.ingredient = Ingredient(name, type)
        self.quantity = quantity
        self.unit = unit

    def to_dict(self):
        return {
            "name": self.ingredient.name,
            "type": self.ingredient.type,
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
list_ingredient.append(StockIngredient("Carotte",'LEGUME',6,'KG'))
list_ingredient.append(StockIngredient("Patate",'FECULENT',5,'KG'))
list_ingredient.append(StockIngredient("Lait",'LAITIER',3,'L'))
list_ingredient.append(StockIngredient("Yaourt",'LAITIER',6,'UNITE'))
list_ingredient.append(StockIngredient("Pate",'FECULENT',1,'KG'))
list_ingredient.append(StockIngredient("Sel",'EPICE',500,'GR'))
list_ingredient.append(StockIngredient("Poivre",'EPICE',200,'GR'))
list_ingredient.append(StockIngredient("Pomme",'FRUIT',5,'UNITE'))
list_ingredient.append(StockIngredient("Gateau",'AUTRE',15,'UNITE'))
list_ingredient.append(StockIngredient("Steak",'VIANDE',750,'GR'))
list_ingredient.append(StockIngredient("Saumon",'POISSON',250,'GR'))

# url = 'http://localhost:3000/stockIngredient'
# for ingredient in list_ingredient:
#     x = requests.post(url, json = ingredient.__dict__, headers = {"accept": "application/json"})
#     print(x.text)


list_recette = []
list_recette.append(Recette(0,"pâte pesto", datetime.datetime.now().strftime("%x"),"Tanguy", "bon ca mere", ["tu cuis les pates" ,"tu rajoutes le pesto dessus" ,"+ fromage" ,"bone ap"] , [RecipeIngredient("Pate",'FECULENT',1,'KG'), RecipeIngredient("Pesto",'EPICE',50,'GR')],["CHILL"],0,15,"une personne","EASY","pate_pesto.jpg",["passoire","casserole"], "jsp"))
# list_recette.append(Recette(0,"pate bolo", datetime.datetime.now().strftime("%x"),"Tanguy", "bon ca mere", "pate + Bolo", [RecipeIngredient("Pate",'FECULENT',1,'KG'), RecipeIngredient("Bolo",'EPICE',250,'GR')],["CHILL"],0,15,"une personne","EASY","pate_bolo.jpg",["passoire","casserole"], "jsp"))
list_recette.append(Recette(0,"Bouché à la reine", datetime.datetime.now().strftime("%x"),"Tanguy", "bon ca mere", ["croute", "sauce"], [RecipeIngredient("Croute",'FECULENT',1,'UNITE'), RecipeIngredient("Pate",'FECULENT',500,'GR'), RecipeIngredient("Sauce","VIANDE", 500, 'GR')],["MAIN_DISHES"],0,25,"une personne","MEDIUM","bouchees.jpg",["casserole"], "jsp"))
# list_recette.append(Recette(0,"Risoto", datetime.datetime.now().strftime("%x"),"Tanguy", "de papa", "riz + pesto + chorizo", [RecipeIngredient("riz",'FECULENT',1,'KG'), RecipeIngredient("Pesto",'EPICE',50,'GR'),RecipeIngredient("Chorizo","VIANDE", 50, 'GR')],["CHILL"],15,30,"une personne","EASY","risoto.jpg",["Poel","couteau","planche"], "jsp"))
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


import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{

    recipeAdded=new Subject<Recipe[]>();
    private recipes: Recipe[] =[]
    // private recipes: Recipe[] =[
    //     new Recipe('Recipe name test', 
    //     'Recipe description test', 
    //     'https://img.delicious.com.au/A0k4MxHp/w759-h506-cfill/del/2020/09/mexican-fajitas-139368-1.jpg',
    //     [
    //         new Ingredient('milk',3),
    //         new Ingredient('egg',9)

    //     ]),
    //     new Recipe('Recipe name test2',
    //      'Recipe description test2',
    //       'https://img.delicious.com.au/A0k4MxHp/w759-h506-cfill/del/2020/09/mexican-fajitas-139368-1.jpg',
    //       [
    //         new Ingredient('butter',7),
    //         new Ingredient('coco',23),
    //         new Ingredient('sugar',5),
    //         new Ingredient('salt',9)
    //       ])
    //   ];

    constructor(private slService: ShoppingListService){

    }  

    setRecipe(recipes:Recipe[]){
        this.recipes = recipes
        this.recipeAdded.next(this.recipes.slice());
    }
     

    getRecipes(){
        return this.recipes.slice()
    }
    getRecipe(index:number){
        return this.recipes[index]
    }

    addIngredientToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipeAdded.next(this.recipes.slice());
    }

    updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipeAdded.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeAdded.next(this.recipes.slice());
    }
}
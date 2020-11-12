import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map,tap } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class DataStorageService{

    constructor(private http :HttpClient, private recipeService: RecipeService){}

    onStoreRecipes(){
        const recipes= this.recipeService.getRecipes();
        this.http.put('https://recipebook-35dc5.firebaseio.com/recipes.json',recipes).subscribe(
            responseData => {
                console.log(responseData)
            }
        )
    }

    onFetchRecipes(){
        return this.http.get<Recipe[]>('https://recipebook-35dc5.firebaseio.com/recipes.json').pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe,ingredients:recipe.ingredients?recipe.ingredients:[]}
            })
        }),
        tap(recipes =>{
            this.recipeService.setRecipe(recipes);
        })
        )
    }
}
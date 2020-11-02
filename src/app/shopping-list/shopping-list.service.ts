import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService{
    ingredientAdded = new Subject<Ingredient[]>();
    private ingredients:Ingredient[]=[
        new Ingredient('Apples',10),
        new Ingredient('Mangoes',20),
      ];

    getIngredient(){
        return this.ingredients.slice()
    }
    
    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientAdded.next(this.ingredients.slice())
    }
    addIngredients(ingrediets: Ingredient[]){
        this.ingredients.push(...ingrediets);
        this.ingredientAdded.next(this.ingredients.slice())
    }
}
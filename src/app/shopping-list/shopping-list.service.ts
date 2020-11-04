import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService{
    ingredientAdded = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients:Ingredient[]=[
        new Ingredient('Apples',10),
        new Ingredient('Mangoes',20),
      ];

    getIngredient(){
        return this.ingredients.slice()
    }

    selectIngredient(index:number){
        return this.ingredients[index]
    }
    
    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientAdded.next(this.ingredients.slice())
    }
    addIngredients(ingrediets: Ingredient[]){
        this.ingredients.push(...ingrediets);
        this.ingredientAdded.next(this.ingredients.slice())
    }
    updateIngredient(index:number,newIngredient:Ingredient){
        this.ingredients[index]=newIngredient;
        this.ingredientAdded.next(this.ingredients.slice())
    }
    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientAdded.next(this.ingredients.slice());
    }
}
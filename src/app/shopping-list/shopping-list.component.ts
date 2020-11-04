import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients:Ingredient[];
  private igChangedSub:Subscription
  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredient()
    this.igChangedSub=this.slService.ingredientAdded.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients=ingredients
      }
    );
  }
  onAddIngredient(ingredient:Ingredient){
    this.slService.addIngredient(ingredient);
  }

  onEdit(index:number){
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(){
    this.igChangedSub.unsubscribe()
  }
}

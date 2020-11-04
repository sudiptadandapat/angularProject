import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {


  editMode=false;
  editedItemIndex:number;
  editedItem:Ingredient;
  subscription:Subscription;

  @ViewChild('f') editForm:NgForm;
  @Output() ingredient = new EventEmitter<Ingredient>();
  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription=this.slService.startedEditing.subscribe(
      (index:number) =>{
        this.editMode=true;
        this.editedItemIndex=index;
        this.editedItem=this.slService.selectIngredient(index);
        this.editForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        });
      }
    );
  }

  onAdd(form:NgForm){
    const value=form.value
    const newIngredient= new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
    }
    else{
      this.slService.addIngredient(newIngredient)
    }
    this.editMode=false;
    form.reset();
    
  }

  onClear(){
    this.editForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

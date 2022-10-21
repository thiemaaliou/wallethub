/**
 * Update the following components to meet the requirements : 
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import { Component, EventEmitter, NgModule, Output  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'textfield',
    template : '<input type="text" value="" [(ngModel)]="field" (input)="emitWhenFieldChange()"/>'
})
export class TextField {
    field = "";
    @Output() onFieldChange = new EventEmitter<string>();

    emitWhenFieldChange(){
        this.onFieldChange.emit(this.field);
    }
}

@Component({
    selector : 'child-component',
    template : `<h2>Title:<h2><br/><textfield (onFieldChange)="getFieldValue($event)"></textfield>`
})
export class ChildComponent {
    @Output() onTitleChange = new EventEmitter<string>();
    getFieldValue(value: string){
        this.onTitleChange.emit(value)
    }
}


@Component({
    selector : 'ng-app',
    template : `<div>
                    <child-component (onTitleChange)="updateTile($event)"></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component {

    title:string = "";
    updateTile(title: string){
        this.title = title;
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test02Component
            }
        ])
    ],
    declarations : [Test02Component,ChildComponent,TextField]
})
export class Test02Module {};
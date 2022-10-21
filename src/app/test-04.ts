import { FormsModule } from '@angular/forms';
/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector : 'ng-app',
    template : `
                <h2>Enter your first and last name</h2>
               
                <div>
                    <input type="text" required [(ngModel)]="firstName" (blur)="generateUserName()"/>
                    <input type="text" required [(ngModel)]="lastName" (blur)="generateUserName()"/>
                    {{userName}}
                </div>
                `,
    styles : []
})
export class UserNameComponent {
    firstName: string;
    lastName: string;
    userName: string;

    generateUserName(){
        if(this.firstName && this.lastName){
            this.userName = this.firstName.toLocaleLowerCase().trim().concat("_").concat(this.lastName.toLocaleLowerCase().trim()).concat("_"+Math.floor(Math.random() * (10 - 1) + 0))
        }
    }

}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : UserNameComponent
            }
        ])
    ],
    declarations : [UserNameComponent]
})
export class UserNameModule {};
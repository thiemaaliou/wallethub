/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { CommonModule } from '@angular/common';
import { Component, Injectable, Input,NgModule, OnChanges, OnInit, SimpleChanges  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { BehaviorSubject } from 'rxjs';

@Component({
    selector : 'ng-app',
    template : `<div>
                    <h2>Loan Details</h2>
                    <b>Monthly Payment:</b> {{monthly_payment | currency:'CAD':'symbol-narrow':'1.1-3'}} <br/>
                    <b>Late Payment Fee : {{late_payment  | currency:'CAD':'symbol-narrow':'1.1-3'}}</b> <br/>
                </div>`
})
export class Test01Component implements OnInit{
    
    constructor(private test01Service: Test01Service){}
    loan_amount:number = 0;
    monthly_payment:number = 200;
    late_payment = 10;

    ngOnInit(): void {
       this.test01Service.newLoanAmount$.subscribe((loan: number) => {
        if(loan == 0 || loan == null){
            this.monthly_payment = null;
            this.late_payment = null;
            return;
        }
        this.monthly_payment = 0.02 * loan;
        this.monthly_payment = 0.02 * loan * 0.05;
       })
    }
}

@Injectable()
export class Test01Service {
  private loan_amount$ = new BehaviorSubject<number>(1000);
  newLoanAmount$ = this.loan_amount$.asObservable();
  constructor() {}

  setLoanAmount(amount: number) {
    this.loan_amount$.next(amount);
  }
}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test01Component
            }
        ])
    ],
    providers: [
        Test01Service
    ],
    declarations : [Test01Component]
})
export class Test01Module {}
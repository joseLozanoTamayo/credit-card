import { Component, OnInit, ViewChild } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { FormGroup } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './list/list.component';
import { UserModel, FinancialModel } from './user-model';
import { FinancialComponent } from './financial/financial.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  financialEnds = false;
  registerEnds = false;
  creditCardEnds = false;
  userID = null;
  registerForm: boolean;

  @ViewChild('stepper', {static: false}) stepper: MatHorizontalStepper;

  @ViewChild('list', {static: false}) list: ListComponent;
  @ViewChild('register', {static: false}) register: RegisterComponent;
  @ViewChild('financial', {static: false}) financial: FinancialComponent;
  @ViewChild('creditCard', {static: false}) creditCard: FinancialComponent;

  constructor() { }

  ngOnInit() {
  }

  edit(el) {
    this.register.userModel = el;
    this.financial.user = el.Id;
    this.creditCard.user = el.Id;
    this.userID = el.Id;
    this.register.setModel();
    this.financial.setModel();
    this.creditCard.setModel();
  }

  completedRegister($event) {
    this.registerEnds = $event;
    this.list.getUsers();
    this.stepper.next();
    this.userID = this.register.userModel.Id;
    this.financial.user = this.register.userModel.Id;
    this.financial.newModel();
  }

  completedFinancials($event) {
    this.financialEnds = $event;
    this.stepper.next();
    this.userID = this.register.userModel.Id;
    this.creditCard.user = this.register.userModel.Id;
    this.creditCard.newModel();
  }

  completedCreditCard($event) {
    this.financialEnds = $event;
    this.registerForm = false;
  }

  newReg() {
    this.register.userModel = new UserModel();
    this.financial.financialModel = new FinancialModel();
    this.userID = null;
    this.financial.setModel();
    this.register.setModel();
  }

}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/shared/commons/error-state-matcher';
import { FinancialModel, UserModel } from '../user-model';

@Component({
  selector: 'app-users-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.scss']
})
export class FinancialComponent implements OnInit {

  public rsFormGroup: FormGroup; // form
  financialModel: FinancialModel;

  @Output() completed = new EventEmitter<boolean>();
  @Output() canceled = new EventEmitter<boolean>();

  @Input() user: number;

  matcher = new MyErrorStateMatcher();

  constructor(private coreService: CoreService) { }

  ngOnInit() {

    this.rsFormGroup = new FormGroup({
      Occupation: new FormControl('', [
        Validators.required,
      ]),
      Profession: new FormControl('', [
        Validators.required,
      ]),
      Incomes: new FormControl('', [
        Validators.required,
      ])
    });

    if (this.user != null ) {
      this.setModel();
    }
    // console.log(this.rsFormGroup);

  }


  setModel() {
    if (this.user != null) {
      this.coreService.get(`financial_information/?query=IdUsers.Id:${this.user}`).subscribe(
        (res: any) => {
          if ( res && typeof res !== 'string' && res.length !== 0 ) {
            this.financialModel = res[0];
            const { Occupation, Profession, Incomes } = this.financialModel;
            this.rsFormGroup.setValue({
              Occupation,
              Profession,
              Incomes
            });
            this.completed.emit(true);
          }
        }
      );
    } else {
      this.rsFormGroup.reset();
    }
  }

  newModel() {
    if (!this.financialModel || this.financialModel.Id != null) {
      this.financialModel = new FinancialModel();
      this.financialModel.IdUsers = {
              ...new UserModel(),
              Id: this.user,
            };
      this.rsFormGroup.reset();
    }
  }

  submit() {
   // console.log('entro');
   this.completed.emit(true);

   this.financialModel = { ...this.financialModel, ...this.rsFormGroup.value };

   if (this.financialModel.Id != null) {
    this.coreService.put('financial_information', this.financialModel).subscribe(
      res => {
        // console.log(res);
        this.completed.emit(true);
      }
    );
  } else {
    this.coreService.post('financial_information', this.financialModel).subscribe(
      (res: any) => {
        // console.log(res);
        if (typeof res !== 'string') { this.financialModel = res; }
        this.completed.emit(true);
      }
    );
  }
 }

 cancel() {
  this.canceled.emit(true);
 }
}

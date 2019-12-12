import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/shared/commons/error-state-matcher';
import { ClienteModel } from '../credit-card-model';

@Component({
  selector: 'app-users-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  rsFormGroup: FormGroup;
  matcher = new MyErrorStateMatcher();
  userModel: ClienteModel;

  @Output() completed = new EventEmitter<boolean>();
  @Output() canceled = new EventEmitter<boolean>();


  constructor(private coreService: CoreService) { }

  ngOnInit() {

    this.rsFormGroup = new FormGroup({
      Id: new FormControl(),
      Names: new FormControl('', [
        Validators.required,
      ]),
      Document: new FormControl('', [
        Validators.required,
      ]),
      LastName: new FormControl('', [
        Validators.required,
      ]),
      SecondLastName: new FormControl('', [
        Validators.required,
      ]),
      Birthday: new FormControl('', [
        Validators.required,
      ]),
      Phone: new FormControl('', [
        Validators.required,
      ]),
      Address: new FormControl('', [
        Validators.required,
      ]),
      Email: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  setModel() {

    if (!this.userModel.id) {
      this.userModel = new ClienteModel();
      this.rsFormGroup.reset();
    } else {
      this.rsFormGroup.setValue(this.userModel);
      this.completed.emit(true);
    }
  }

 submit() {
  this.completed.emit(true);
  this.userModel = this.rsFormGroup.value;

  if (this.userModel.id !== null) {
    this.coreService.put('users', this.userModel).subscribe(
      res => {

        this.completed.emit(true);
      }
    );
  } else {
    this.coreService.post('users', this.userModel).subscribe(
      res => {

        this.completed.emit(true);
      }
    );
  }
 }

 cancel() {
 this.canceled.emit(true);
}

}

import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/shared/commons/error-state-matcher';
import { UserModel } from '../user-model';

@Component({
  selector: 'app-users-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  rsFormGroup: FormGroup;
  matcher = new MyErrorStateMatcher();
  userModel: UserModel;

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
    // console.log(this.userModel);
    if (!this.userModel.Id) {
      this.userModel = new UserModel();
      this.rsFormGroup.reset();
    } else {
      this.rsFormGroup.setValue(this.userModel);
      this.completed.emit(true);
    }
  }

 submit() {
  this.completed.emit(true);
  this.userModel = this.rsFormGroup.value;

  if (this.userModel.Id !== null) {
    this.coreService.put('users', this.userModel).subscribe(
      res => {
        // console.log(res);
        this.completed.emit(true);
      }
    );
  } else {
    this.coreService.post('users', this.userModel).subscribe(
      res => {
        // console.log(res);
        this.completed.emit(true);
      }
    );
  }
 }

 cancel() {
 this.canceled.emit(true);
}

}

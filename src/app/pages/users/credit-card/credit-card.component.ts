import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/shared/commons/error-state-matcher';
import { InformacionTarjetaModel, ClienteModel } from '../credit-card-model';

@Component({
  selector: 'app-users-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {

  public rsFormGroup: FormGroup; // form

  cardModel: InformacionTarjetaModel;

  @Output() completed = new EventEmitter<boolean>();
  @Output() canceled = new EventEmitter<boolean>();

  @Input() user: number;

  matcher = new MyErrorStateMatcher();

  constructor(private coreService: CoreService) { }

  ngOnInit() {

    this.rsFormGroup = new FormGroup({
      Type: new FormControl('', [
        Validators.required,
      ]),
      PayDay: new FormControl('', [
        Validators.required,
      ]),
    });

    if (this.user != null ) {
      this.setModel();
    }
    // console.log(this.rsFormGroup);

  }


  setModel() {
    if (this.user != null) {
      this.coreService.get(`credit_cards/?query=IdUsers.Id:${this.user}`).subscribe(
        (res: any) => {
          if ( res && typeof res !== 'string' && res.length !== 0 ) {
            this.cardModel = res[0];
            const { tipo, diaPago } = this.cardModel;
            this.rsFormGroup.setValue({
              tipo,
              diaPago
            });
          }
        }
      );
    } else {
      this.rsFormGroup.reset();
    }
  }

  newModel() {
    if (!this.cardModel || this.cardModel.id != null) {
      this.cardModel = new InformacionTarjetaModel();
      this.cardModel.IdUsers = {
                ...new ClienteModel(),
                id: this.user,
              };
      this.rsFormGroup.reset();
    }
  }

  submit() {
   // console.log('entro');
   this.completed.emit(true);

   this.cardModel = { ...this.cardModel, ...this.rsFormGroup.value };

   if (this.cardModel.id != null) {
    this.coreService.put('credit_cards', this.cardModel).subscribe(
      res => {
        // console.log(res);
        this.completed.emit(true);
      }
    );
  } else {
    this.coreService.post('credit_cards', this.cardModel).subscribe(
      (res: any) => {
        // console.log(res);
        if (typeof res !== 'string') { this.cardModel = res; }
        this.completed.emit(true);
      }
    );
  }
 }

 cancel() {
  this.canceled.emit(true);
 }
}

import { Component, ElementRef, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FieldError } from '../../models/field-error';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'simple-error',
  templateUrl: './simple-error.component.html',
  styleUrls: ['./simple-error.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SimpleErrorComponent implements OnInit {

  @Input() fieldName: string;

  @HostBinding('style.display') display: string;

  message: string;

  constructor(private validationService: ValidationService) { }

  ngOnInit(): void {
    console.log(this.fieldName);

    this.validationService.getErrorObservable().subscribe(
      (fieldError: FieldError) => {
        console.log("Field error for " + this.fieldName + " is ", fieldError);
        this.triggerError(fieldError);
      }
    );
  }

  triggerError(fieldError: FieldError) {
    this.message = fieldError.message;
    this.display = 'inline';

    console.log(this.message);
  }
}

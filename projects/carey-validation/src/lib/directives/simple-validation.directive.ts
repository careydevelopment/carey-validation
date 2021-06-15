import { Directive, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SimpleErrorComponent } from '../components/simple-error/simple-error.component';
import { FieldError } from '../models/field-error';
import { ErrorKeyMessagesService } from '../services/error-key-messages.service';
import { ValidationService } from '../services/validation.service';

@Directive({
  selector: '[simpleValidation]'
})
export class SimpleValidationDirective implements OnInit {

  @Input('simpleValidation') formGroup: FormGroup;
  @Input('formControlName') formControlName: string;

  formField: AbstractControl;

  constructor(private validationService: ValidationService,
    private errorKeyMessagesService: ErrorKeyMessagesService) { }

  ngOnInit() {
    console.log("Form control name is " + this.formControlName);
    console.log("Form group is ", this.formGroup);

    this.formField = this.formGroup.get(this.formControlName);

    this.formField.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(
      result => {
        if (this.formField.invalid) {
          this.validationService.triggerError(this.formField, this.formControlName);
        }
      }
    )
  }
} 

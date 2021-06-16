import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ErrorKeyMessagesService } from '../services/error-key-messages.service';

@Directive({
  selector: '[simpleValidation]'
})
export class SimpleValidationDirective implements OnInit {

  @Input('simpleValidation') formField: AbstractControl;
  @Input('fieldLabel') fieldLabel: string;

  currentlyValid: boolean = true; 
  currentResult: string;

  constructor(private errorKeyMessagesService: ErrorKeyMessagesService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    console.log("In init");
    this.setUpStyling();
    this.trackFieldChanges();
  }

  private trackFieldChanges() {
    console.log("Tracking ", this.formField);
    console.log("Field name is " + this.fieldLabel);

    let self = this;
    let originalMethod = this.formField.markAsTouched;
    this.formField.markAsTouched = function () {
      originalMethod.apply(this, arguments);
      console.log("I touched " + self.fieldLabel); 
    }

    this.formField.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(
      result => {
        console.log(result);

        if (this.formField.invalid) {
          console.log("field " + this.fieldLabel + " is invalid ");
          this.triggerError();
        } else {
          this.triggerValid();
        }
      }
    )
  }

  private setUpStyling() {
    this.elementRef.nativeElement.style.display = 'none';
  }

  triggerValid() {
    if (!this.currentlyValid) {
      this.currentlyValid = true;
      this.elementRef.nativeElement.innerText = '';
      this.elementRef.nativeElement.style.display = 'none';
    }
  }

  triggerError() {
    if (this.currentlyValid) {
      this.currentlyValid = false;
      const formControlErrors: ValidationErrors = this.formField.errors;

      console.log(formControlErrors);

      if (formControlErrors) {
        const keys = Object.keys(formControlErrors);

        console.log(keys);

        if (keys && keys.length > 0) {
          let key: string = keys[0];
          console.log(key);

          let message: string = this.errorKeyMessagesService.getMessageByKey(key, this.fieldLabel);

          if (message) {
            this.elementRef.nativeElement.innerText = message;
            this.elementRef.nativeElement.style.display = 'inline';
          }
        }
      }
    }
  }
} 

import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ErrorKeyMessagesService } from '../services/error-key-messages.service';

@Directive({
  selector: '[simpleValidation]'
})
export class SimpleValidationDirective implements OnInit {

  @Input('simpleValidation') formField: FormControl;
  @Input('fieldLabel') fieldLabel: string;

  currentlyValid: boolean = true;
  formGroup: FormGroup;

  constructor(private errorKeyMessagesService: ErrorKeyMessagesService,
    private elementRef: ElementRef) { }

  ngOnInit() { 
    this.setUpStyling();
    this.trackTouchChanges();
    this.trackStatusChanges();
  }

  private trackTouchChanges() {
    let self = this;
    let originalMethod = this.formField.markAsTouched;

    this.formField.markAsTouched = function () {
      originalMethod.apply(this, arguments);

      //if we get here, the user just tabbed through
      //the field without making any changes, so valueChanges
      //didn't trigger but we still need to validate
      self.checkValidity();
    }
  }

  private trackStatusChanges() {
    this.formField.statusChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(result => this.checkValidity(result));
  }

  private checkValidity(result?: string) {
    let resultCheck: string = result ? result : this.formField.status;

    if (resultCheck === 'INVALID') {
      this.triggerError();
    } else {
      this.triggerValid();
    }
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

      if (formControlErrors) {
        const keys = Object.keys(formControlErrors);

        if (keys && keys.length > 0) {
          let key: string = keys[0];
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

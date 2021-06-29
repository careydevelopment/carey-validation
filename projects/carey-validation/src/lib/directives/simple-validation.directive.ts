import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ValidationService } from '../services/validation.service';

/**
 * This directive displays a message in the template if a form field is
 * invalid.
 *
 * Note that the validation logic (as of now) must be included in the component
 * using this directive.
 *
 * For example:
 * this.basicInfoFormGroup = this.fb.group({
 *     'firstName': [this.contact.firstName,
 *                    [Validators.required,
 *                      Validators.pattern('^[a-zA-Z. \-\]*$')
 *                    ]
 *                  ]
 * });
 *
 * That validation logic is still required in the component class.
 *
 * Here's how this directive is used:
 * <mat-error
 *    fieldLabel="First name"
 *    [simpleValidation]="basicInfoFormGroup.get('firstName')">
 * </mat-error>
 *
 * The simpleValidation directive requires a FormControl object. In the example above,
 * it's retrieved from the FormGroup.
 *
 * The fieldLabel property is optional. But it enables the directive to display a
 * field-specific error message. For example: "First name is required" instead of
 * "This field is required."
 **/
@Directive({
  selector: '[simpleValidation]'
})
export class SimpleValidationDirective implements OnInit {

  @Input('simpleValidation') formField: FormControl;
  @Input('fieldLabel') fieldLabel: string;

  currentlyValid: boolean = true;
  formGroup: FormGroup;

  constructor(private validationService: ValidationService,
    private elementRef: ElementRef) { }

  ngOnInit() { 
    this.setUpStyling();
    this.trackTouchChanges();
    this.trackStatusChanges();
  }

  private trackTouchChanges() {
    let self = this;
    let originalMethod = this.formField.markAsTouched;

    //going with a monkey patch here because there's no
    //listener for touched
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
    //default to no display of error message because
    //we don't assume there's an error
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
          //just grab the first key for now
          //but there may be multiple errors on the same field
          let key: string = keys[0];

          //get the message associated with the key
          //this will be something like "First name is required"
          let message: string = this.validationService.getMessageByKey(key, this.fieldLabel);

          if (message) {
            this.elementRef.nativeElement.innerText = message;
            this.elementRef.nativeElement.style.display = 'inline';
          }
        }
      }
    }
  }
} 

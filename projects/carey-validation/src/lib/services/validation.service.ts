import { Inject, Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { allFieldMessages } from '../constants/all-field-messages';
import { allKeyMessages } from '../constants/all-key-messages';
import { ErrorFieldMessage } from '../models/error-field-message';
import { ErrorKeyMessage } from '../models/error-key-message';
import { VALIDATION_CONFIG_TOKEN } from '../models/token';
import { ValidationConfig } from '../models/validation-config';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(@Inject(VALIDATION_CONFIG_TOKEN) private readonly config: ValidationConfig) { }

  private errorMessageListener: Subject<string> = new Subject();

  addErrorMessage(message: string) {
    this.errorMessageListener.next(message);
  }

  getSummaryMessageByField(field: string): string {
    //first, search in the module-supplied array of field messages
    let fieldMessage: ErrorFieldMessage = allFieldMessages.find(m => m.field === field);
    let errorMessage: string = null;

    if (fieldMessage) errorMessage = fieldMessage.message;
    else {
      //if nothing was found yet, search in the developer-supplied array of
      //field messages
      fieldMessage = this.config.fieldSummaries.find(m => m.field === field);
      if (fieldMessage) errorMessage = fieldMessage.message;
    }

    return errorMessage;
  }

  //validates the form for summary messages
  //this is invoked when the user tries to submit
  //the form
  //it will identify invalid fields so the user can
  //take corrective action
  validateForm(formGroup: FormGroup): string[] {
    let errorMessages: string[] = [];

    Object.keys(formGroup.controls).forEach(key => {
      const controlErrors: ValidationErrors = formGroup.get(key).errors;

      if (controlErrors != null) {
        formGroup.get(key).markAsTouched();
        errorMessages.push(this.addErrorByKey(key));
      }
    });

    return errorMessages;
  }

  private addErrorByKey(key: string): string {
    let errorMessage: string = this.getSummaryMessageByField(key);
    return errorMessage;
  }

  //used for individual field validation (not summaries)
  //this method gets invoked when a user tabs away from a field
  //but it's not valid
  getMessageByKey(key: string, fieldLabel: string): string {
    let matched: ErrorKeyMessage = allKeyMessages.find(obj => obj.key === key);

    if (matched) {
      if (fieldLabel && matched.interpolatedMessage) {
        return matched.interpolatedMessage(fieldLabel);
      } else {
        return matched.message;
      }
    } else {
      return null;
    }
  }
}

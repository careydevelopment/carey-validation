import { Inject, Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { allFieldMessages } from '../constants/all-field-messages';
import { ErrorFieldMessage } from '../models/error-field-message';
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
    let fieldMessage: ErrorFieldMessage = allFieldMessages.find(m => m.field === field);
    let errorMessage: string = null;

    if (fieldMessage) errorMessage = fieldMessage.message;
    else {
      fieldMessage = this.config.fieldSummaries.find(m => m.field === field);
      if (fieldMessage) errorMessage = fieldMessage.message;
    }

    return errorMessage;
  }

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
}

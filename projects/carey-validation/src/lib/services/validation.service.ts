import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { FieldError } from '../models/field-error';
import { ErrorKeyMessagesService } from './error-key-messages.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService implements OnDestroy {

  private errorSubject: Subject<FieldError> = new Subject();

  constructor(private errorKeyMessagesService: ErrorKeyMessagesService) { }

  getErrorObservable(): Observable<FieldError> {
    return this.errorSubject.asObservable();
  }

  triggerError(formField: AbstractControl, formFieldName: string) {
    const formControlErrors: ValidationErrors = formField.errors;
    console.log(formControlErrors);

    if (formControlErrors) {
      const keys = Object.keys(formControlErrors);

      if (keys && keys.length > 0) {
        let key: string = keys[0];
        console.log(key);

        let fieldError: FieldError = {} as FieldError;
        fieldError.fieldName = formFieldName;
        fieldError.key = key;
        fieldError.message = this.errorKeyMessagesService.getMessageByKey(key);

        this.errorSubject.next(fieldError);
      }
    }
  }

  ngOnDestroy(): void {
    this.errorSubject.complete();
  }

}

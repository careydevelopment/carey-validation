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

  ngOnDestroy(): void {
    this.errorSubject.complete();
  }

}

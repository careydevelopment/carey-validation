import { NgModule } from '@angular/core';
import { SimpleValidationDirective } from './directives/simple-validation.directive';
import { SimpleErrorComponent } from './components/simple-error/simple-error.component';



@NgModule({
  declarations: [
    SimpleValidationDirective,
    SimpleErrorComponent
  ],
  imports: [
  ],
  exports: [
    SimpleValidationDirective,
    SimpleErrorComponent
  ]
})
export class CareyValidationModule { }

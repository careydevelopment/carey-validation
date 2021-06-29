import { ModuleWithProviders, NgModule } from '@angular/core';
import { SimpleValidationDirective } from './directives/simple-validation.directive';
import { VALIDATION_CONFIG_TOKEN } from './models/token';
import { ValidationConfig } from './models/validation-config';
import { ErrorSpreeComponent } from './components/error-spree/error-spree.component';
import { CommonModule } from '@angular/common';  

@NgModule({
  declarations: [
    SimpleValidationDirective,
    ErrorSpreeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SimpleValidationDirective,
    ErrorSpreeComponent
  ]
})
export class ValidationModule {
  static forRoot(config: ValidationConfig): ModuleWithProviders<ValidationModule> {
    return {
      ngModule: ValidationModule,
      providers: [{ provide: VALIDATION_CONFIG_TOKEN, useValue: config }]
    };
  }
}

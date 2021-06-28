import { ModuleWithProviders, NgModule } from '@angular/core';
import { SimpleValidationDirective } from './directives/simple-validation.directive';
import { VALIDATION_CONFIG_TOKEN } from './models/token';
import { ValidationConfig } from './models/validation-config';

@NgModule({
  declarations: [
    SimpleValidationDirective
  ],
  imports: [
  ],
  exports: [
    SimpleValidationDirective
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

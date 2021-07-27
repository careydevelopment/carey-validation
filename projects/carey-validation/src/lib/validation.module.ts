import { ModuleWithProviders, NgModule } from '@angular/core';
import { SimpleValidationDirective } from './directives/simple-validation.directive';
import { VALIDATION_CONFIG_TOKEN } from './models/token';
import { ValidationConfig } from './models/validation-config';
import { ErrorSpreeComponent } from './components/error-spree/error-spree.component';
import { CommonModule } from '@angular/common';
import { ServerSideErrorSpreeComponent } from './components/server-side-error-spree/server-side-error-spree.component';  

@NgModule({
  declarations: [
    SimpleValidationDirective,
    ErrorSpreeComponent,
    ServerSideErrorSpreeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SimpleValidationDirective,
    ErrorSpreeComponent,
    ServerSideErrorSpreeComponent
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

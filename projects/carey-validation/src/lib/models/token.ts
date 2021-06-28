import { InjectionToken } from '@angular/core';
import { ValidationConfig } from './validation-config';

export const VALIDATION_CONFIG_TOKEN = new InjectionToken<ValidationConfig>('VALIDATION_CONFIG');

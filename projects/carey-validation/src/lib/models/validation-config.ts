import { ErrorFieldMessage } from "./error-field-message";

/**
 * Handles configuration properties for this module.
 **/
export interface ValidationConfig {

  //The module currently supports commonly used fields
  //such as first name, last name, and email. Developers who
  //want specific summary messages for other fields can include
  //them here.
  fieldSummaries: ErrorFieldMessage[];
}

import { ErrorKeyMessage } from "../models/error-key-message";

/**
 * Associates an error key with a specific message.
 *
 * The key is usually the type of validation failure, like
 * "required" or "pattern."
 *
 * Each key is associated with 2 messages:
 *  - A default message ("This field is required")
 *  - An interpolated message ("The first name is required")
 *
 * The interpolated message is expressed as a function.
 *
 * The code gets the name of the field from the fieldLabel property
 * in the template.
 *
 * For example: <mat-error
 *                fieldLabel="Last name"
 *                [simpleValidation]="basicInfoFormGroup.get('firstName')">
 *              </mat-error>
 **/
export const allKeyMessages: ErrorKeyMessage[] = [
  {
    key: "required",
    message: "This field is required",
    interpolatedMessage: (str: string) => `${str} is required`
  },
  {
    key: "pattern",
    message: "Please enter a proper value",
    interpolatedMessage: (str: string) => `Please enter a valid ${str}`
  },
  {
    key: "emailExists",
    message: "This email already exists"
  },
  {
    key: "usernameExists",
    message: "This username already exists"
  }
];

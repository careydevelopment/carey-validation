import { ErrorFieldMessage } from "../models/error-field-message";

/**
 * Summary messages identified per field.
 *
 * These are the messages that usually appear at the bottom of
 * an invalid form in list item format.
 *
 * The developer can add to this list with the fieldSummaries property in
 * ValidationConfig.
 * */
export const allFieldMessages: ErrorFieldMessage[] = [
  {
    field: "firstName",
    message: "Please enter a valid first name"
  },
  {
    field: "lastName",
    message: "Please enter a valid last name"
  },
  {
    field: "email",
    message: "Please enter a valid email"
  }
];

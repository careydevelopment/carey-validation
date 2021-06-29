/**
 * Maps a field (for example: 'firstName') to its associated
 * error message (for example: 'Please enter a first name').
 *
 * This interface is used for summary error messages that tell
 * the user everything that's wrong with the form in list format.
 *
 * For example:
 * This form is invalid.
 *  - Please enter a valid first name
 *  - Please enter a valid last name
 *  etc.
 **/
export interface ErrorFieldMessage {
  field: string;
  message: string;
}

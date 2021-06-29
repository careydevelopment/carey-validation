/**
 * This interface associates a key with an error message.
 *
 * A key is usually the type of validation failure (for example,
 * 'required' or 'pattern').
 *
 * The message property displays a generic message ("This field is required").
 *
 * The interpolatedMessage property displays a field-specific message ("The first
 * name is required")
 *
 * Note that interpolatedMessage is optional and is expressed as a function so we
 * can use backticks for string substitution (`{$fieldName} is required`).
 **/
export interface ErrorKeyMessage {
  key: string;
  message: string;
  interpolatedMessage?: Function;
}

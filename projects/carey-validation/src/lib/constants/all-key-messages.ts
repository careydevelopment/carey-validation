import { ErrorKeyMessage } from "../models/error-key-message";

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

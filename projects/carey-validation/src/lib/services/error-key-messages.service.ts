import { ErrorKeyMessage } from "../models/error-key-message";
import { Injectable } from '@angular/core';

const ALL_KEY_MESSAGES: ErrorKeyMessage[] = [
  {
    key: "required",
    message: "This field is required",
    interpolatedMessage: (str: string) => `${str} is required`
  },
  {
    key: "pattern",
    message: "Please enter a proper value",
    interpolatedMessage: (str: string) => `Please enter a valid ${str}`
  }
];

@Injectable({
  providedIn: 'root'
})
export class ErrorKeyMessagesService {


  getMessageByKey(key: string, fieldLabel: string): string {
    console.log("Key is " + key);
    let matched: ErrorKeyMessage = ALL_KEY_MESSAGES.find(obj => obj.key === key);

    if (matched) {
      if (fieldLabel) {
        return matched.interpolatedMessage(fieldLabel);
      } else {
        return matched.message;
      }
    } else {
      return null;
    }
  }
}

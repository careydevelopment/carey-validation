import { ErrorKeyMessage } from "../models/error-key-message";
import { Injectable } from '@angular/core';

const ALL_KEY_MESSAGES: ErrorKeyMessage[] = [
  { key: "required", message: "This field is required" }
];

@Injectable({
  providedIn: 'root'
})
export class ErrorKeyMessagesService {

  getMessageByKey(key: string): string {
    let matched: ErrorKeyMessage = ALL_KEY_MESSAGES.find(obj => obj.key === key);

    if (matched) {
      return matched.message;
    } else {
      return null;
    }
  }
}

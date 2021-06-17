import { ErrorKeyMessage } from "../models/error-key-message";
import { Injectable } from '@angular/core';
import { allKeyMessages } from "../constants/all-key-messages";

@Injectable({
  providedIn: 'root'
})
export class ErrorKeyMessagesService {

  getMessageByKey(key: string, fieldLabel: string): string {
    let matched: ErrorKeyMessage = allKeyMessages.find(obj => obj.key === key);

    if (matched) {
      if (fieldLabel && matched.interpolatedMessage) {
        return matched.interpolatedMessage(fieldLabel);
      } else {
        return matched.message;
      }
    } else {
      return null;
    }
  }
}

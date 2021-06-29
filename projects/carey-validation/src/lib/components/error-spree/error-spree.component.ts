import { Component, Input, OnInit } from '@angular/core';

/**
 * This component summarizes errors for a specific form.
 *
 * It displays a list of errors for each field that isn't valid. By default,
 * the errors appear as bullet points.
 **/
@Component({
  selector: 'error-spree',
  templateUrl: './error-spree.component.html',
  styleUrls: ['./error-spree.component.css']
})
export class ErrorSpreeComponent implements OnInit {

  @Input() errorMessages: string[];

  constructor() { }

  ngOnInit(): void {
  }

}

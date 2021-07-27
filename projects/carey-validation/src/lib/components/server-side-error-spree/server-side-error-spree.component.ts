import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'server-side-error-spree',
  templateUrl: './server-side-error-spree.component.html',
  styleUrls: ['./server-side-error-spree.component.css']
})
export class ServerSideErrorSpreeComponent implements OnInit {

  @Input() serverSideErrors: any[];

  constructor() { }

  ngOnInit(): void {
  }

}

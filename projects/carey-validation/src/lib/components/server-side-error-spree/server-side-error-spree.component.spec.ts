import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerSideErrorSpreeComponent } from './server-side-error-spree.component';

describe('ServerSideErrorSpreeComponent', () => {
  let component: ServerSideErrorSpreeComponent;
  let fixture: ComponentFixture<ServerSideErrorSpreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerSideErrorSpreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerSideErrorSpreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

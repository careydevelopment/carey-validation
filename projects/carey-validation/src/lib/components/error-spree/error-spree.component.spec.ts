import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSpreeComponent } from './error-spree.component';

describe('ErrorSpreeComponent', () => {
  let component: ErrorSpreeComponent;
  let fixture: ComponentFixture<ErrorSpreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorSpreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorSpreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationemailComponent } from './validationemail.component';

describe('ValidationemailComponent', () => {
  let component: ValidationemailComponent;
  let fixture: ComponentFixture<ValidationemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

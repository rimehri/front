import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApresHomePageComponent } from './apres-home-page.component';

describe('ApresHomePageComponent', () => {
  let component: ApresHomePageComponent;
  let fixture: ComponentFixture<ApresHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApresHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApresHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

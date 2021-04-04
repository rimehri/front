import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChngpwdComponent } from './chngpwd.component';

describe('ChngpwdComponent', () => {
  let component: ChngpwdComponent;
  let fixture: ComponentFixture<ChngpwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChngpwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChngpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

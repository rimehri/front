import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHomeProjectComponent } from './page-home-project.component';

describe('PageHomeProjectComponent', () => {
  let component: PageHomeProjectComponent;
  let fixture: ComponentFixture<PageHomeProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageHomeProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHomeProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

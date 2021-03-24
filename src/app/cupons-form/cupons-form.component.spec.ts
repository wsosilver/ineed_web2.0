import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuponsFormComponent } from './cupons-form.component';

describe('CuponsFormComponent', () => {
  let component: CuponsFormComponent;
  let fixture: ComponentFixture<CuponsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuponsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuponsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

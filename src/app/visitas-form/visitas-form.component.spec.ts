import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitasFormComponent } from './visitas-form.component';

describe('VisitasFormComponent', () => {
  let component: VisitasFormComponent;
  let fixture: ComponentFixture<VisitasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

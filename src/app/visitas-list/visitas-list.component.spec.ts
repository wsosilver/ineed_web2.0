import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitasListComponent } from './visitas-list.component';

describe('VisitasListComponent', () => {
  let component: VisitasListComponent;
  let fixture: ComponentFixture<VisitasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

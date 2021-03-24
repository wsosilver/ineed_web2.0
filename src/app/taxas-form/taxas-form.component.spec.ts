import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxasFormComponent } from './taxas-form.component';

describe('TaxasFormComponent', () => {
  let component: TaxasFormComponent;
  let fixture: ComponentFixture<TaxasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

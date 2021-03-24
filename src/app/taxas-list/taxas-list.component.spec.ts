import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxasListComponent } from './taxas-list.component';

describe('TaxasListComponent', () => {
  let component: TaxasListComponent;
  let fixture: ComponentFixture<TaxasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

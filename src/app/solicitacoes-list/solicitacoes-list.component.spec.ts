import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacoesListComponent } from './solicitacoes-list.component';

describe('SolicitacoesListComponent', () => {
  let component: SolicitacoesListComponent;
  let fixture: ComponentFixture<SolicitacoesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitacoesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacoesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontShowComponent } from './front-show.component';

describe('FrontShowComponent', () => {
  let component: FrontShowComponent;
  let fixture: ComponentFixture<FrontShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

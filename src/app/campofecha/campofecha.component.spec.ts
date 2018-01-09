import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampofechaComponent } from './campofecha.component';

describe('CampofechaComponent', () => {
  let component: CampofechaComponent;
  let fixture: ComponentFixture<CampofechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampofechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampofechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

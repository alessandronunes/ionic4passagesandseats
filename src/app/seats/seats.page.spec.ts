import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsPage } from './seats.page';

describe('SeatsPage', () => {
  let component: SeatsPage;
  let fixture: ComponentFixture<SeatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

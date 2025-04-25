import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Etape5Component } from './etape5.component';

describe('Etape5Component', () => {
  let component: Etape5Component;
  let fixture: ComponentFixture<Etape5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Etape5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Etape5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

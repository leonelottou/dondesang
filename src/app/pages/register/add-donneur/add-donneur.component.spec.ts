import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDonneurComponent } from './add-donneur.component';

describe('AddDonneurComponent', () => {
  let component: AddDonneurComponent;
  let fixture: ComponentFixture<AddDonneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDonneurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDonneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

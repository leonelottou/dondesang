import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoxdonneurComponent } from './choxdonneur.component';

describe('ChoxdonneurComponent', () => {
  let component: ChoxdonneurComponent;
  let fixture: ComponentFixture<ChoxdonneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoxdonneurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoxdonneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

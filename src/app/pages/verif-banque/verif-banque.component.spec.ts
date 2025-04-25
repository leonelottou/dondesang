import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifBanqueComponent } from './verif-banque.component';

describe('VerifBanqueComponent', () => {
  let component: VerifBanqueComponent;
  let fixture: ComponentFixture<VerifBanqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifBanqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifBanqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuChoixComponent } from './menu-choix.component';

describe('MenuChoixComponent', () => {
  let component: MenuChoixComponent;
  let fixture: ComponentFixture<MenuChoixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuChoixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuChoixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

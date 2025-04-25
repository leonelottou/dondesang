import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedonsComponent } from './listedons.component';

describe('ListedonsComponent', () => {
  let component: ListedonsComponent;
  let fixture: ComponentFixture<ListedonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListedonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListedonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

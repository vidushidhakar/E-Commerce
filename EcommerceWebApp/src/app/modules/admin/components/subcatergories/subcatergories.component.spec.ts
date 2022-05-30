import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcatergoriesComponent } from './subcatergories.component';

describe('SubcatergoriesComponent', () => {
  let component: SubcatergoriesComponent;
  let fixture: ComponentFixture<SubcatergoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcatergoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcatergoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

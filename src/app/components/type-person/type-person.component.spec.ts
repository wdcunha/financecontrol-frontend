import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePersonComponent } from './type-person.component';

describe('TypePersonComponent', () => {
  let component: TypePersonComponent;
  let fixture: ComponentFixture<TypePersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypePersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

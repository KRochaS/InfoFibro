import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRelatoComponent } from './form-relato.component';

describe('FormRelatoComponent', () => {
  let component: FormRelatoComponent;
  let fixture: ComponentFixture<FormRelatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRelatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRelatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

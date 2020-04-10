import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatosComponent } from './relatos.component';

describe('RelatosComponent', () => {
  let component: RelatosComponent;
  let fixture: ComponentFixture<RelatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

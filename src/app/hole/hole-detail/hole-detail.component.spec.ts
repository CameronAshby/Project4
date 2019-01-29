import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoleDetailComponent } from './hole-detail.component';

describe('HoleDetailComponent', () => {
  let component: HoleDetailComponent;
  let fixture: ComponentFixture<HoleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

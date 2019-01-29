import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCompletePageComponent } from './game-complete-page.component';

describe('GameCompletePageComponent', () => {
  let component: GameCompletePageComponent;
  let fixture: ComponentFixture<GameCompletePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCompletePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCompletePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

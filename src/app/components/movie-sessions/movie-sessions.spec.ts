import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSessions } from './movie-sessions';

describe('MovieSessions', () => {
  let component: MovieSessions;
  let fixture: ComponentFixture<MovieSessions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSessions],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieSessions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

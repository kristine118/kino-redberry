import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieHero } from './movie-hero';

describe('MovieHero', () => {
  let component: MovieHero;
  let fixture: ComponentFixture<MovieHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieHero],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieHero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

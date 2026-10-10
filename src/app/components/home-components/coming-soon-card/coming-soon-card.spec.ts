import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComingSoonCard } from './coming-soon-card';

describe('ComingSoonCard', () => {
  let component: ComingSoonCard;
  let fixture: ComponentFixture<ComingSoonCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComingSoonCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ComingSoonCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

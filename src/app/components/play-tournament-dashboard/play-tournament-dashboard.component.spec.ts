import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayTournamentDashboardComponent } from './play-tournament-dashboard.component';

describe('PlayTournamentDashboardComponent', () => {
  let component: PlayTournamentDashboardComponent;
  let fixture: ComponentFixture<PlayTournamentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayTournamentDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayTournamentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

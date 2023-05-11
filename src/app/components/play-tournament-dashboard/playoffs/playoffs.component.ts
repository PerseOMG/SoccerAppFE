import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { IPositionTableData } from 'src/app/models/tournament.model';
import { getScore } from 'src/app/utils/getScore.util';

@Component({
  selector: 'app-playoffs',
  templateUrl: './playoffs.component.html',
  styleUrls: ['./playoffs.component.scss'],
})
export class PlayoffsComponent implements OnInit {
  @Input() PlayoffsTeams$: Observable<IPositionTableData[]>;

  PlayoffsCalendar$: Observable<any>;
  currentMatchIndex$ = new BehaviorSubject(0);
  currentPhase$ = new BehaviorSubject(0);
  constructor() {}

  ngOnInit(): void {
    this.PlayoffsCalendar$ = combineLatest([this.PlayoffsTeams$]).pipe(
      map(([teams]) => {
        const calendar = [];
        const matches = [];
        for (let i = 0; i < teams.length / 2; i++) {
          matches.push({
            local: teams[i],
            visit: teams[teams.length - i - 1],
            localScore: 0,
            visitScore: 0,
          });
        }
        calendar.push(matches);
        let idx = 2;
        while (teams.length / idx !== 1) {
          idx = idx * 2;
          const matches = [];
          for (let i = 0; i < teams.length / idx; i++) {
            matches.push({
              local: { team: { name: 'NA' } },
              visit: { team: { name: 'NA' } },
              localScore: 0,
              visitScore: 0,
            });
          }
          calendar.push(matches);
        }

        return calendar;
      })
    );
  }

  playMatch(calendar: any) {
    const { scoreLocal, scoreVisit } = getScore();

    calendar[this.currentPhase$.value][
      this.currentMatchIndex$.value
    ].localScore = scoreLocal;
    calendar[this.currentPhase$.value][
      this.currentMatchIndex$.value
    ].visitScore = scoreVisit;

    if (scoreLocal >= scoreVisit) {
      calendar[this.currentPhase$.value + 1][
        Math.floor(this.currentMatchIndex$.value / 2)
      ][this.currentMatchIndex$.value % 2 === 0 ? 'local' : 'visit'].team =
        calendar[this.currentPhase$.value][
          this.currentMatchIndex$.value
        ].local.team;
    } else {
      calendar[this.currentPhase$.value + 1][
        Math.floor(this.currentMatchIndex$.value / 2)
      ][this.currentMatchIndex$.value % 2 === 0 ? 'local' : 'visit'].team =
        calendar[this.currentPhase$.value][
          this.currentMatchIndex$.value
        ].visit.team;
    }

    this.currentMatchIndex$.next(this.currentMatchIndex$.value + 1);

    // Next phase
    if (
      this.currentMatchIndex$.value ===
      calendar[this.currentPhase$.value].length
    ) {
      this.currentPhase$.next(this.currentPhase$.value + 1);
      this.currentMatchIndex$.next(0);
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { IPositionTableData } from 'src/app/models/tournament.model';

@Component({
  selector: 'app-playoffs',
  templateUrl: './playoffs.component.html',
  styleUrls: ['./playoffs.component.scss'],
})
export class PlayoffsComponent implements OnInit {
  @Input() PlayoffsTeams$: Observable<IPositionTableData[]>;

  PlayoffsCalendar$: any;

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
}

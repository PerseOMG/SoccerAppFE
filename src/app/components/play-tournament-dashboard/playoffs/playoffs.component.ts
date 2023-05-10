import { Component, Input, OnInit } from '@angular/core';
import { IPositionTableData } from 'src/app/models/tournament.model';

@Component({
  selector: 'app-playoffs',
  templateUrl: './playoffs.component.html',
  styleUrls: ['./playoffs.component.scss'],
})
export class PlayoffsComponent implements OnInit {
  @Input() Playoffs: {
    locals: IPositionTableData[];
    visit: IPositionTableData[];
  };

  constructor() {}

  ngOnInit(): void {}
}

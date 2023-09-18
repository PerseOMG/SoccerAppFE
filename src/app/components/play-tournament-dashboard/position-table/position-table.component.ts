import { Component, Input, OnInit } from '@angular/core';
import { IPositionTableData } from 'src/app/models/tournament.model';
import { POSITION_TABLE_HEADINGS } from '../../../../assets/consts/configs/position-table-config.consts';

@Component({
  selector: 'app-position-table',
  templateUrl: './position-table.component.html',
  styleUrls: ['./position-table.component.scss'],
})
export class PositionTableComponent implements OnInit {
  @Input() positionTable: IPositionTableData[];
  @Input() playoffsQualified: number;
  headings = POSITION_TABLE_HEADINGS;

  constructor() {}

  ngOnInit(): void {}
}

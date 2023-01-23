import { Component, Input, OnInit } from '@angular/core';
import { ITournament } from '../../../models/tournament.model';

@Component({
  selector: 'app-tournaments-card',
  templateUrl: './tournaments-card.component.html',
  styleUrls: ['./tournaments-card.component.scss'],
})
export class TournamentsCardComponent implements OnInit {
  @Input() tournament!: ITournament;
  constructor() {}

  ngOnInit(): void {}
}

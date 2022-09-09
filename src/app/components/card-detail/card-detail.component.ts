import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team.models';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
})
export class CardDetailComponent implements OnInit {
  @Input() team!: Team;

  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { THANKS_LINKS } from '../../../../assets/consts/configs/thanks-config';

@Component({
  selector: 'app-credits-page',
  templateUrl: './credits-page.component.html',
  styleUrls: ['./credits-page.component.scss'],
})
export class CreditsPageComponent implements OnInit {
  thanksLinks = THANKS_LINKS;
  constructor() {}

  ngOnInit(): void {}
}

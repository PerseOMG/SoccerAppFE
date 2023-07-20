import { Component, OnInit } from '@angular/core';
import { THANKS_LINKS } from '../../../../assets/consts/configs/thanks-config';
import { AppTitleService } from '../../../state/appTitle/app-title.service';

@Component({
  selector: 'app-credits-page',
  templateUrl: './credits-page.component.html',
  styleUrls: ['./credits-page.component.scss'],
})
export class CreditsPageComponent implements OnInit {
  thanksLinks = THANKS_LINKS;
  constructor(private titleService: AppTitleService) {
    this.titleService.setDocTitle('Thank You All');
  }

  ngOnInit(): void {}
}

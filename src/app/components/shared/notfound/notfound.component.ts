import { Component, OnInit } from '@angular/core';
import { AppTitleService } from '../../../services/appTitle/app-title.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
})
export class NotfoundComponent implements OnInit {
  constructor(private titleService: AppTitleService) {
    this.titleService.setDocTitle('Page Not Found');
  }

  ngOnInit(): void {}
}

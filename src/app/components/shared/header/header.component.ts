import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  HEADER_LINKS,
  APP_NAME,
} from '../../../../assets/consts/configs/header-config.const';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

  animations: [
    trigger('headerAnimation', [
      state(
        'hover',
        style({
          borderBottomLeftRadius: '25px',
          borderBottomRightRadius: '25px',
        })
      ),
      transition('void => hover, hover => void', [animate('0.75s ease')]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  navLinks = HEADER_LINKS;
  appName = APP_NAME;
  isMouseIn = false;
  constructor() {}

  ngOnInit(): void {}

  onMouseEvent() {
    this.isMouseIn = !this.isMouseIn;
  }
}

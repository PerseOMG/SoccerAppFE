import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  HEADER_BUTTONS_OPTIONS,
  HEADER_LINKS,
  APP_NAME,
} from '../../../../assets/consts/configs/header-config.const';
import { APP_SOCCER_JWT_KEY } from '../../../../app.constants';

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
  isLoggedIn: boolean;
  navLinks = HEADER_LINKS;
  appName = APP_NAME;
  isMouseIn = false;
  buttonObj = this.getButtonObjValue();

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.location.onUrlChange(() => {
      this.buttonObj = this.getButtonObjValue();
    });
  }

  onMouseEvent() {
    this.isMouseIn = !this.isMouseIn;
  }

  onClick() {
    if (this.isLoggedIn) {
      localStorage.removeItem(APP_SOCCER_JWT_KEY);
      this.location.go('/login');
    }
  }

  getButtonObjValue() {
    if (this.location.path().toLowerCase().includes('login')) {
      this.isLoggedIn = false;
      return HEADER_BUTTONS_OPTIONS['LOGIN'];
    }
    if (this.location.path().toLowerCase().includes('signup')) {
      this.isLoggedIn = false;

      return HEADER_BUTTONS_OPTIONS['SIGNUP'];
    }
    this.isLoggedIn = true;
    return HEADER_BUTTONS_OPTIONS['LOGOUT'];
  }
}

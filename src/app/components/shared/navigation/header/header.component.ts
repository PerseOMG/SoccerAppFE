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
} from '../../../../../assets/consts/configs/header-config.const';
import { AuthFacade } from 'src/app/state/auth/auth.facade';
import { APP_SOCCER_JWT_KEY } from '../../../../../assets/consts/app.constants';

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
  JWT = localStorage.getItem(APP_SOCCER_JWT_KEY);
  showMenu = false;
  constructor(private location: Location, private authFacade: AuthFacade) {}

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
      this.authFacade.logout();
    }
  }

  getButtonObjValue() {
    if (this.location.path().toLowerCase().includes('login') && !this.JWT) {
      this.isLoggedIn = false;
      return HEADER_BUTTONS_OPTIONS['LOGIN'];
    }
    if (
      (this.location.path().toLowerCase().includes('signup') && !this.JWT) ||
      (this.location.path().toLowerCase().includes('thanksto') && !this.JWT) ||
      (this.location.path().toLowerCase().includes('notfound') && !this.JWT)
    ) {
      this.isLoggedIn = false;
      return HEADER_BUTTONS_OPTIONS['SIGNUP'];
    }
    this.isLoggedIn = true;
    return HEADER_BUTTONS_OPTIONS['LOGOUT'];
  }

  onHamburgerMenuClick() {
    this.showMenu = !this.showMenu;
  }
}

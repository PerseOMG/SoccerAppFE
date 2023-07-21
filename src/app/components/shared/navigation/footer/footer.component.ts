import { Component, OnInit } from '@angular/core';
import {
  DEVELOPER,
  FOOTER_LINKS,
} from '../../../../../assets/consts/configs/footer-config.consts';
import packageJson from '../../../../../../package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear();
  navLinks = FOOTER_LINKS;
  developer = DEVELOPER;
  appVersion = packageJson.version;
  constructor() {}

  ngOnInit(): void {}
}

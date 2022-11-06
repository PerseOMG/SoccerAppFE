import { Component, OnInit } from '@angular/core';
import { FOOTER_LINKS } from 'src/assets/consts/configs/footer-config.consts';
import { DEVELOPER } from '../../../../assets/consts/configs/footer-config.consts';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear();
  navLinks = FOOTER_LINKS;
  developer = DEVELOPER;
  constructor() {}

  ngOnInit(): void {}
}

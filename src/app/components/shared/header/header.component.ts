import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

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
  isMouseIn = false;
  constructor() {}

  ngOnInit(): void {}

  onMouseEvent() {
    this.isMouseIn = !this.isMouseIn;
  }
}

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.scss'],
  animations: [
    trigger('hoverAnimation', [
      state(
        'hover',
        style({
          transform: 'scale(1.2)',
        })
      ),
      transition('void => hover, hover => void', [animate('0.75s ease')]),
    ]),
  ],
})
export class CreateButtonComponent implements OnInit {
  isMouseIn = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onMouseEvent() {
    this.isMouseIn = !this.isMouseIn;
  }

  onClick() {
    this.router.navigate(['/create', 'team']);
  }
}

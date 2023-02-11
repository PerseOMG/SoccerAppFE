import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],

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
  @Input() redirectTo: string;
  @Input() action: 'create' | 'start';
  isMouseIn = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onMouseEvent() {
    this.isMouseIn = !this.isMouseIn;
  }

  onClick() {
    if (this.action === 'create') {
      this.router.navigate(['/create', this.redirectTo]);
    } else {
      this.router.navigate(['/playTournament', this.redirectTo]);
    }
  }
}

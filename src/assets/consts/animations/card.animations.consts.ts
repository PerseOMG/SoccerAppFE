import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const CARDS_ANIMATIONS = {
  hover: trigger('hoverAnimation', [
    state(
      'hover',
      style({
        transform: 'scale(1.2)',
        borderRadius: '25px',
      })
    ),
    transition('void => hover, hover => void', [animate('0.75s ease')]),
  ]),
};

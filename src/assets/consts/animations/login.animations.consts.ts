import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const FORM_ANIMATIONS = {
  invalid: trigger('invalidFormAnimation', [
    state(
      'invalidAnimationStart',
      style({
        transform: 'scale(1)',
      })
    ),
    state(
      'invalidAnimationEnd',
      style({
        transform: 'scale(1)',
      })
    ),
    transition(
      'invalidAnimationEnd => invalidAnimationStart, invalidAnimationStart => invalidAnimationEnd',
      [
        animate(
          '1000ms ease-in',
          keyframes([
            style({
              transform: 'translate3d(-1px, 0, 0)',
              offset: 0.1,
              borderColor: 'red',
            }),
            style({
              transform: 'translate3d(2px, 0, 0)',
              offset: 0.2,
              borderColor: 'red',
            }),
            style({
              transform: 'translate3d(-4px, 0, 0)',
              offset: 0.3,
              borderColor: 'red',
            }),
            style({
              transform: 'translate3d(4px, 0, 0)',
              offset: 0.4,
              borderColor: 'red',
            }),
            style({
              transform: 'translate3d(-4px, 0, 0)',
              offset: 0.5,
              borderColor: 'red',
            }),
            style({
              transform: 'translate3d(4px, 0, 0)',
              offset: 0.6,
              borderColor: 'red',
            }),
            style({
              transform: 'translate3d(-4px, 0, 0)',
              offset: 0.7,
              borderColor: 'red',
            }),
            style({
              transform: 'translate3d(2px, 0, 0)',
              offset: 0.8,
              borderColor: 'red',
            }),
            style({
              transform: 'translate3d(-1px, 0, 0)',
              offset: 0.9,
              borderColor: 'red',
            }),
          ])
        ),
      ]
    ),
  ]),
};

import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '../../../state/auth/auth.facade';
import { AppTitleService } from '../../../state/appTitle/app-title.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('invalidFormAnimation', [
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
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  states: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private authFacade: AuthFacade,
    private titleService: AppTitleService
  ) {
    this.titleService.setDocTitle('Login');
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  setControlInvalidStyle(controlName: string) {
    return (
      this.loginForm.get(controlName).touched &&
      this.loginForm.get(controlName).invalid
    );
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authFacade.login(this.loginForm.value);
    } else {
      this.states['invalidAnimationStart'] =
        this.states['invalidAnimationStart'] === 'invalidAnimationStart'
          ? 'invalidAnimationEnd'
          : 'invalidAnimationStart';
    }
  }
}

import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthFacade } from '../../../state/auth/auth.facade';
import { AppTitleService } from '../../../services/appTitle/app-title.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  states: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private authFacade: AuthFacade,
    private titleService: AppTitleService
  ) {
    this.titleService.setDocTitle('Signup');
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          this.passwordConfirming.bind(this),
        ]),
      ],
    });
  }

  ngOnInit(): void {}

  setControlInvalidStyle(controlName: string) {
    return (
      this.registerForm.get(controlName).touched &&
      this.registerForm.get(controlName).invalid
    );
  }

  passwordConfirming(c: FormControl) {
    if (this.registerForm) {
      return c.value === this.registerForm.get('password').value
        ? null
        : {
            NotEqual: true,
          };
    }
    return null;
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log('Trying to register...');
      this.authFacade.signup(this.registerForm.value);
    } else {
      console.log(this.registerForm.value);

      this.states['invalidAnimationStart'] =
        this.states['invalidAnimationStart'] === 'invalidAnimationStart'
          ? 'invalidAnimationEnd'
          : 'invalidAnimationStart';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FORM_ANIMATIONS } from '../../../../../assets/consts/animations/login.animations.consts';
import { AuthFacade } from '../../../../state/auth/auth.facade';
import { AppTitleService } from '../../../../services/appTitle/app-title.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [FORM_ANIMATIONS.invalid],
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
      this.authFacade.signup(this.registerForm.value);
    } else {
      this.states['invalidAnimationStart'] =
        this.states['invalidAnimationStart'] === 'invalidAnimationStart'
          ? 'invalidAnimationEnd'
          : 'invalidAnimationStart';
    }
  }
}

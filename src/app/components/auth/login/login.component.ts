import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '../../../state/auth/auth.facade';
import { AppTitleService } from '../../../services/appTitle/app-title.service';
import { FORM_ANIMATIONS } from '../../../../assets/consts/animations/login.animations.consts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [FORM_ANIMATIONS.invalid],
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

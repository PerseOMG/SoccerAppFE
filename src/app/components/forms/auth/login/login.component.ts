import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '../../../../state/auth/auth.facade';
import { AppTitleService } from '../../../../services/appTitle/app-title.service';
import { FORM_ANIMATIONS } from '../../../../../assets/consts/animations/login.animations.consts';
import { SPINNER_ALERT } from '../../../../../assets/consts/configs/alerts-config.const';
import { SweetAlertsService } from '../../../../services/alerts/sweet-alerts.service';

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
    private titleService: AppTitleService,
    private sweetAlertService: SweetAlertsService
  ) {
    this.titleService.setDocTitle('Login');
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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
      this.sweetAlertService.fireAlert({
        html: '<img height="300rem" width="300rem" src="../../assets/icons/Circle Loader.gif" alt="loading">',
        ...SPINNER_ALERT['loading'],
      });
      this.authFacade.login(this.loginForm.value);
    } else {
      this.states['invalidAnimationStart'] =
        this.states['invalidAnimationStart'] === 'invalidAnimationStart'
          ? 'invalidAnimationEnd'
          : 'invalidAnimationStart';
    }
  }
}

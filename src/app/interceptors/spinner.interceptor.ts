import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize } from 'rxjs';
import { SweetAlertsService } from '../services/alerts/sweet-alerts.service';
import { SPINNER_ALERT } from 'src/assets/consts/configs/alerts-config.const';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(
    private sweetAlertService: SweetAlertsService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (
      !request.url.includes('login') &&
      !request.url.includes('signup') &&
      !request.url.includes('team/statistics')
    ) {
      this.sweetAlertService.fireAlert({
        html: '<img height="300rem" width="300rem" src="../../assets/icons/Circle Loader.gif" alt="loading">',
        ...SPINNER_ALERT['loading'],
      });

      return next.handle(request).pipe(
        finalize(() => {
          Swal.close();
        })
      );
    }
    return next.handle(request);
  }
}

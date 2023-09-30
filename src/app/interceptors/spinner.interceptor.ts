import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize } from 'rxjs';
import { SweetAlertsService } from '../services/alerts/sweet-alerts.service';
import { SPINNER_ALERT } from 'src/assets/consts/configs/alerts-config.const';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private sweetAlertService: SweetAlertsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.totalRequests++;
    this.sweetAlertService.fireAlert({
      html: '<img class="icon" src="../../assets/icons/Circle Loader.gif" alt="loading">',
      ...SPINNER_ALERT['loading'],
    });

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
        }
      })
    );
  }
}

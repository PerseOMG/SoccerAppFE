import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { IAlert } from '../../models/alerts.models';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertsService {
  constructor() {}

  fireAlert(alertConfig: IAlert, successCb?: any) {
    Swal.fire(alertConfig).then(successCb);
  }
}

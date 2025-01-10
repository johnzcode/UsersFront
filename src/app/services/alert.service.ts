import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showAlert(msg: string, title: string, icon: 'warning' | 'error' | 'success' = 'warning') {
    Swal.fire({
        title: title,
        html: msg,
        icon: icon,
        confirmButtonText: "Aceptar"
    });
  }
}

import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showAlert(
    msg: string, 
    title: string, 
    icon: 'warning' | 'error' | 'info' | 'success' = 'warning',
    confirmCallback?: () => void,
    btnCancel: boolean = false
  ) {
    Swal.fire({
        title: title,
        html: msg,
        icon: icon,
        showCancelButton: btnCancel,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#d33"
    }).then((result) => {
        if (result.isConfirmed && confirmCallback) {
            confirmCallback();
        }
    });
  }
}

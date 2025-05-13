import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  AlertaPositivo(title:string, text: string){
    return Swal.fire({
      icon:"success",
      title: title,
      text: text,
      confirmButtonText: 'Aceptar'
    });
  }

  AlertaInfo(title:string, text: string){
    return Swal.fire({
      icon:"info",
      title: title,
      text: text,
      confirmButtonText: 'Aceptar'
    });
  }

  AlertaCorfirmacion(title:string, text: string){
    return Swal.fire({
      icon:"warning",
      title:title,
      text: text,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText:"Rechazar"
    })
  }

  AlertaNegativo(title:string, text: string){
  return Swal.fire({
    icon:"error",
    title: title,
    text: text,
    confirmButtonText: 'Aceptar'
  });
  }
}

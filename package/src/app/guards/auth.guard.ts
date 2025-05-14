import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem("AuthToken");

  if (token) {
    try {
      // Dividir el token en partes y decodificar el payload (parte 1: header, 2: payload, 3: firma)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;

      if (payload.exp && payload.exp < currentTime) {
        localStorage.removeItem("AuthToken");
        router.navigate(['/authentication/login']);
        return false;
      }

      return true;
    } catch (e) {
      // Token mal formado
      localStorage.removeItem("AuthToken");
      router.navigate(['/authentication/login']);
      return false;
    }
  } else {
    router.navigate(['/authentication/login']);
    return false;
  }
};

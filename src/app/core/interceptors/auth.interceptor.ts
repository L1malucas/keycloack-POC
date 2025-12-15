import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError, from } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token && !req.url.includes('/assets/')) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(cloned).pipe(
      catchError((error) => {
        if (error.status === 401) {
          return from(authService.updateToken(5)).pipe(
            switchMap((refreshed) => {
              if (refreshed) {
                const newToken = authService.getToken();
                const retryReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newToken}`
                  }
                });
                return next(retryReq);
              } else {
                authService.logout();
                return throwError(() => error);
              }
            }),
            catchError(() => {
              authService.logout();
              return throwError(() => error);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};

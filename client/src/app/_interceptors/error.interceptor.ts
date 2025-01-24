import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ErrorService } from '../_services/error.service';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorServices = inject(ErrorService)
  return next(req).pipe(
    catchError(err => errorServices.handleError(err))
  )
};

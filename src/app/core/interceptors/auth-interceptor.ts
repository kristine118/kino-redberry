import { HttpInterceptorFn } from '@angular/common/http';
import { Auth } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');


  if(token){
    req = req.clone({
      setHeaders: {Auth: `Bearer ${token}`}
    });
  }
  return next(req);
};

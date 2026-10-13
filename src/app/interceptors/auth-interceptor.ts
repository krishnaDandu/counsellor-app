import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const counsellorData = sessionStorage.getItem('counsellor');
  if (!counsellorData) {
    // Handle the case where counsellor data is not available
    return next(req);
  }

  const counsellor = JSON.parse(counsellorData);
  const token = counsellor?.token;

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  return next(authReq);
};

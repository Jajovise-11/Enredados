import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Obtener usuario del localStorage
  const currentUser = localStorage.getItem('currentUser');
  
  if (currentUser) {
    try {
      const user = JSON.parse(currentUser);
      
      // Clonar la petición y añadir el header de autorización
      const clonedRequest = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${user.id}` // O el token que uses
        }
      });
      
      return next(clonedRequest);
    } catch (error) {
      console.error('Error parsing user:', error);
    }
  }
  
  return next(req);
};
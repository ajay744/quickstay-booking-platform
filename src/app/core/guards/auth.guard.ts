import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const token = tokenService.getToken();

  const url = state.url;

  //  Check role from route OR parent route
  const role = route.data['role'] || route.parent?.data['role'];

  //  Allow login/signup routes freely
  if (url.includes('/login') || url.includes('/signup')) {
    return true;
  }

  // If token present, allow
  if (token) {
    return true;
  } else {
    //  If no token, redirect based on role
    switch (role) {
      case 'admin':
        router.navigate(['/admin/login']);
        break;
      case 'owner':
        router.navigate(['/owner/login']);
        break;
      case 'user':
      default:
        router.navigate(['/user/login']);
    }
    return false;
  }
};

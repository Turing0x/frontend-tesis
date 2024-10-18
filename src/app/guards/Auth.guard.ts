import { inject } from '@angular/core';
import { type CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { AuthStatus } from '../interfaces/auth.status.enum';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );

  if ( authService.authStatus() === AuthStatus.authenticated ){
    return false;
  }

  if( authService.authStatus() === AuthStatus.checking ){
    return false;
  }

  return true;
};

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

const auth = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  if(authService.validateRole(route.data["roles"])) {
    return true;
  }
  return router.createUrlTree(["/login"])
}

export { auth };
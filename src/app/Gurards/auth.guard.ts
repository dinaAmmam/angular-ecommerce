import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Services/user.service';


export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.getCurrentUserFromSubject()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};

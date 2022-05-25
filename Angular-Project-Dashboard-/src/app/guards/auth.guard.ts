import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(private router: Router) {}
  canActivate() {
    if (localStorage.getItem('dash_key') == 'true') {
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }
  canDeactivate() {
    if (localStorage.getItem('reg_key') == 'true') {
      localStorage.removeItem('reg_key');
      return confirm(`Don't want to register?`);
    } else if (localStorage.getItem('reg_key') == 'false') {
      return confirm('Successfully Registered.');
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}

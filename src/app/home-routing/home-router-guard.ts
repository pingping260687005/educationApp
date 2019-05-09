import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import {Injectable} from '@angular/core';
@Injectable()
export class HomeRouterGuard implements CanActivate {
    constructor(private router: Router) {
    }
  canActivate() {
    if (sessionStorage.getItem('token')) {
        return true;
    } else {
        this.router.navigate(['/']);
    }
  }
}

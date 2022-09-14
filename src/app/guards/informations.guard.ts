import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InformationsGuard implements CanActivate {

  isConnect: boolean;
  constructor(
    private authService: AuthService,
    private router: Router
    ) {
    this.authService.isAuthenticated.subscribe( (response: boolean) => {
      this.isConnect = response;
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isConnect) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}

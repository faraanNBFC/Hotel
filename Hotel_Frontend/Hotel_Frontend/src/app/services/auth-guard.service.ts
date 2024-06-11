import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserStorageService } from './user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    const userRole = UserStorageService.getUser().role;
    const currentUrl = this.router.url;
     if(!token || userRole !== 'user') {
        this.router.navigate([currentUrl]);
        return false;
    }
      return true;
  }

}

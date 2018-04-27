import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CurrentUserService } from './current-user.service';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router, private cs: CurrentUserService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let url = state.url;
      return this.checkAuth(url);
    //return this.cs.getIsLoggedInUser();
  }

  checkAuth(url: string): boolean{
    if(this.cs.getAutToken()){
      return true;
    } 
    this.cs.setRedirectUrl(url);
    this.router.navigate(['/login']);
    return false;
  }
}

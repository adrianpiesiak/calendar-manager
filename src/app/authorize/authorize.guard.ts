import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { GoogleApiService } from './../google-api.service';

@Injectable()
export class AuthorizeGuard implements CanActivate {

  constructor(private googleApi: GoogleApiService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.googleApi.getSignInStatus();
  }
}

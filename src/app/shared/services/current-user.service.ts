import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';

import { JwtService } from './jwt.service';



@Injectable()
export class CurrentUserService {
  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
  public isLoggedInUser:boolean;
  public redirectUrl: string;
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (private http: HttpClient, private jwtService: JwtService) {
    //this.isLoggedInUser = false;
    if(this.populate()){
      this.setRedirectUrl('/home');
    }
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.getAutToken()) {
      return true;
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
      return false;
    }
  };

  setAuth(user: any) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.authentication_token);
    this.jwtService.saveCurrentUser(user.email);
    this.isLoggedInUser = true;
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  };

  getAutToken(){
    return this.jwtService.getToken();
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // remove current user
    this.jwtService.removeUser();
    this.isLoggedInUser = false;
    // Set current user to an empty object
    this.currentUserSubject.next({});
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  };

  getCurrentUser(): any {
    return this.jwtService.getCurrentUser();
  };

  hasLoggedInUser(){
    return this.isLoggedInUser;
  };
  getRedirectUrl(): string {
    return this.redirectUrl;
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }
}

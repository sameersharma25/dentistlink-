import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

  saveCurrentUser(userEmail){
    window.localStorage.setItem('userEmail',userEmail);
  }

  getCurrentUser(){
    return window.localStorage.getItem('userEmail');
  }

  removeUser(){
    window.localStorage.removeItem('userEmail');
  }
}

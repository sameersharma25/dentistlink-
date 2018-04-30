import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CurrentUserService } from '../services/current-user.service';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*','user-token':})
// };

@Injectable()
export class DataSourceService {
  token:any;
  httpOptions:any;

  constructor(private http: HttpClient, private cs: CurrentUserService) {
    this.token = this.cs.getAutToken();
    this.setHeaderOption();
   }

  setHeaderOption(){
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*','user-token': this.token})
    };
  }
  // get appointment list
  getAppointments(reqObj): Observable<Object>{
    return this.http.post("http://8c521ac3.ngrok.io/api/get_user_appointments", reqObj, this.httpOptions).map(res =>{
      return res;
    });
  };
  // create new appointment
  create(reqObj): Observable<Object>{
    return this.http.post('http://8c521ac3.ngrok.io/api/create_appointment', reqObj, this.httpOptions).map(res =>{
      return res;
    });
  };
  // create new user
  createNewUser(reqOobj): Observable<Object>{
    return this.http.post('http://8c521ac3.ngrok.io/api/create_user', reqOobj, this.httpOptions).map(res =>{
      return res;
    });
  };
  // get user list
  getUsers(reqObj): Observable<Object>{
    return this.http.post("http://8c521ac3.ngrok.io/api/get_all_users", reqObj, this.httpOptions).map(res =>{
      return res;
    });
  };
}

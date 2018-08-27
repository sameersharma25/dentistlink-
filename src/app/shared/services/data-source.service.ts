import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CurrentUserService } from '../services/current-user.service';

 //const httpOptions = {
 //  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*','user-token':})
 // };

@Injectable()
export class DataSourceService {
  token: any;
  httpOptions: any;
  baseUrl: string = 'https://dev7.resourcestack.com/api';
  lambda: string = 'https://zdvbyajhpl.execute-api.us-east-1.amazonaws.com/prod?zip=20602&radius=1'

  constructor(private http: HttpClient, private cs: CurrentUserService) {
    this.token = this.cs.getAutToken();
    this.setHeaderOption();
   }

  setHeaderOption() {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'user-token': this.token})
    };
  }
  // get appointment list
  getAppointments(reqObj): Observable<Object> {
    return this.http.post(`${this.baseUrl}/get_user_appointments`, reqObj, this.httpOptions).map(res =>{
      return res;
    });
  }
  // create new appointment
  create(reqObj): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create_appointment`, reqObj, this.httpOptions).map(res => {
      return res;
    });
  }

  // create new user
  createNewUser(reqOobj): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create_user`, reqOobj, this.httpOptions).map(res => {
      return res;
    });
  }
   // get user list
  getUsers(reqObj): Observable<Object> {
    return this.http.post(`${this.baseUrl}/get_all_users`, reqObj, this.httpOptions).map(res => {
      return res;
    });
  }

  // get appointment list
  getAppointmentDetails(reqObj): Observable<Object> {
    return this.http.post(`${this.baseUrl}/edit_appointment`, reqObj, this.httpOptions).map(res => {
      return res;
    });
  }

  // update appointment
  updateAppointment(reqObj): Observable<Object> {
    return this.http.post(`${this.baseUrl}/update_appointment`, reqObj, this.httpOptions).map(res => {
      return res;
    });
  }

  /* patients api's */

  // get patient list
  getAllPatientList(reqObj): Observable<Object> {
    return this.http.post(`${this.baseUrl}/patients_list`, reqObj, this.httpOptions).map(res => {
      return res;
    });
  }

  // get patient appointmets
  getPatientsAppointments(reqObj): Observable<Object> {
    return this.http.post(`${this.baseUrl}/patient_appointments`, reqObj, this.httpOptions).map(res => {
      return res;
    });
  }

  // get patient details
  getPatientsDetails(reqObj): Observable<Object> {
    return this.http.post(`${this.baseUrl}/patient_details`, reqObj, this.httpOptions).map(res => {
      return res;
    });
  }

  // update patient details
  updatePatient(reqObj): Observable<Object>{
    return this.http.post(`${this.baseUrl}/update_patient`, reqObj, this.httpOptions).map(res => {
      return res;
    });
  }

  // create appoint for particular patient
  createPatientAppoint(reqObj): Observable<Object>{
    return this.http.post(`${this.baseUrl}/crete_appointment_for_patient`, reqObj, this.httpOptions).map(res => {
      return res;
    });
  }

  // create new patient
  createPatient(reqObj): Observable<Object>{
    return this.http.post(`${this.baseUrl}/create_patient`, reqObj, this.httpOptions).map(res => {
      return res; // need to change url
    });
  }
  getProvider(reqObj, zip, dob): Observable<Object> {
    console.log("dZip", zip)
    console.log("DOB : ", dob)
   return this.http.get("https://zdvbyajhpl.execute-api.us-east-1.amazonaws.com/prod?zip="+ zip + "&radius=15"+"&dob="+ dob).map(res => res);
  };

  allProviders(reqObj):Observable<Object>{
    return this.http.get("https://je8xej057i.execute-api.us-east-1.amazonaws.com/prod").map(res => res);
  }

  searchZip(reqObj,value):Observable<Object>{
    return this.http.get("https://je8xej057i.execute-api.us-east-1.amazonaws.com/prod?"+value).map(res => res);
  }

  referralCreate(reqObj):Observable<Object>{
    return this.http.post(`${this.baseUrl}/rfl_create`,reqObj, this.httpOptions).map(res => {
      return res
    })
  }
  getReferral(reqObj): Observable<Object> {
    return this.http.post(`${this.baseUrl}/rfl_list`, reqObj, this.httpOptions).map(res => {
      return res
    });
  }

  updateReferral(reqObj): Observable<Object> {
    return this.http.post(`${this.baseUrl}/rfl_update`, reqObj, this.httpOptions).map(res => {
      return res;
    });
  }
  getTaskDetails(reqObj): Observable<Object> {
    return this.http.post(`${this.baseUrl}/tsk_list`, reqObj, this.httpOptions).map(res => {
      return res;
    });
  }
  createTask(reqObj): Observable<Object> {
    return this.http.post(`${this.baseUrl}/tsk_create`, reqObj, this.httpOptions).map(res => {
      return res;
    });
  }
  updateTask(reqObj): Observable<Object> {
    return this.http.post(`${this.baseUrl}/tsk_update`, reqObj, this.httpOptions).map(res => {
      return res;
    });
  }
  flagPractice(reqObj): Observable<Object> {
    console.log("what i'm sending", reqObj)
    return this.http.get("https://qxm25470n5.execute-api.us-east-1.amazonaws.com/prod?provider_id=" + reqObj.providerId+ "&providerFlag=" + reqObj.providerFlag).map(res => res);
  }
  commList(reqObj): Observable<Object> {
    return this.http.post(`${this.baseUrl}/msg_list`, reqObj, this.httpOptions).map(res => {
      return res;
    });
  }
  sendMessage(reqObj): Observable<Object> {
    return this.http.post(`${this.baseUrl}/msg_send`, reqObj, this.httpOptions).map(res => {
      return res;
    });
  }
  sendReply(reqObj): Observable<Object> {
    return this.http.post(`${this.baseUrl}/msg_get`, reqObj, this.httpOptions).map(res => {
      return res;
    });
  }

}



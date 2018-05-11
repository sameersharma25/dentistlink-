import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { CurrentUserService } from '../shared/services/current-user.service';
import { DataSourceService } from '../shared/services/data-source.service';
import {Email} from '../shared/model/common-model';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  public patientAction: any = {};
  public patientAptAction: any = {};
  public selectedPatient: any = {};
  public dateOfBirth: any = {};
  public patientList: any = [];
  public panelOpenState: Boolean = true;
  public patientEditForm: FormGroup;
  public patientDetailsEditForm: FormGroup;
  public patientAppointmentForm: FormGroup;
  public searchPatients: string;
  isCollapsed: Boolean = false;
  reqObj:any ={};
  appointmentList: any[];

  constructor(
    private cus: CurrentUserService,
    private dss: DataSourceService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.patientAction.label = "";
    this.patientAptAction.label = "";
    this.patientAction.isOpened = false;
    this.patientAction.collapsed = false;
    this.dateOfBirth.months = [
      {value:'january', viewValue:'JANUARY'},
      {value:'febuary', viewValue:'FEBUARY'},
      {value:'march', viewValue:'MARCH'},
      {value:'april', viewValue:'APRIL'},
      {value:'may', viewValue:'MAY'},
      {value:'june', viewValue:'JUNE'},
      {value:'july', viewValue:'JULY'},
      {value:'august', viewValue:'AUGUST'},
      {value:'sepetember', viewValue:'SEPTEMBER'},
      {value:'october', viewValue:'OCTOBER'},
      {value:'november', viewValue:'NOVEMBER'},
      {value:'december', viewValue:'DECEMBER'}
    ];
    this.dateOfBirth.days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    this.dateOfBirth.years = [1985,1986,1987,1998,1999,2000];
    this.getAllPatients();
    this.createForm();
  }

  createForm(){
    this.patientEditForm = this.fb.group({
      notes: ['']
    });

    this.patientDetailsEditForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      month: [''],
      day: [''],
      year: [''],
      phoneNumber: [''],
      email: [''],
      preferredContact: [''],
    });

    this.patientAppointmentForm = this.fb.group({
      firstName:[''],
      lastName:[''],
      phoneNumber:[''],
      email:[''],
      month: [''],
      day: [''],
      year: [''],
      preferredContact: [''],
      aptMonth: [''],
      aptDay: [''],
      aptYear: [''],
      reasonForVisit: [''],
      patientCoverage: [''],
      patientCoverageId: [''],
    });
  };

  getAllPatients(){
    let currentUserMail: Email;
    currentUserMail = this.cus.getCurrentUser();
    this.reqObj.email = currentUserMail;
    this.dss.getAllPatientList(this.reqObj).subscribe(res =>{
      const response:any = res;
      if(response.status == 'ok'){
        this.patientList = response.patients_details;
        //this.appointmentList = this.getAppointmentList(this.response);
      }
    }, err =>{
      console.log(err);
    });
  };

  openPatientAction(data) {
    if (data) {
      this.patientAction.label = 'Edit';
      this.selectedPatient = data;
      this.getPatientsDetails(data);

      this.getAppointments(data);
      console.log(data);
      //this.isAppointmentEdit = true;
    } else {
      this.patientAction.label = 'Create';
      //this.isAppointmentEdit = false;
      //this.createForm();
    }
    this.patientAction.collapsed = true;
  }
  openPatientAppointment(status){
    this.patientAction.isOpened = true;
    if(status === 'new'){
      this.patientAptAction.label = "new";

    } else if(status === 'create'){
      this.patientAptAction.label = "edit";
    }
  }

  getPatientsDetails(data: any) {
    this.reqObj.email = this.cus.getCurrentUser();
    this.reqObj.patient_id = data.patient_id;
    this.dss.getPatientsDetails(this.reqObj).subscribe(res => {
      const response: any = res;
      console.log(res);
       if (response.status === 'ok') {
        const details = response.patients_details;
        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({firstName: details.first_name}, {onlySelf: true});
        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({lastName: details.last_name}, {onlySelf: true});

        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({phoneNumber: details.ph_number}, {onlySelf: true});

        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({email: details.patient_email}, {onlySelf: true});

        const d = details.date_of_birth;
        const newDate = new Date(d);

        const month = newDate.toLocaleString('en-us', { month: 'long' });
        console.log(month);
      }
    }, err => {
      console.log(err);
    });
  }

  editAppointment() {}

  editPatientInfo() {}


  getAppointments(patient){
    this.reqObj.patient_id = patient.patient_id;
    this.reqObj.email = this.cus.getCurrentUser();
    this.dss.getPatientsAppointments(this.reqObj).subscribe(res => {
      const response: any = res;
      if (response.status === 'ok') {
        this.appointmentList = response.details_array;
      }
    }, err => {
      console.log(err);
    });
  }



}

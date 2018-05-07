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
  public selectedPatient: any = {};
  public patientList: any = [];
  public panelOpenState: Boolean = true;
  public patientEditForm: FormGroup;
  isCollapsed: Boolean = false;

  constructor(
    private cus: CurrentUserService,
    private dss: DataSourceService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.patientAction.label = "";
    this.patientAction.collapsed = false;
    this.getAllPatients();
    this.createForm();
  }

  createForm(){
    this.patientEditForm = this.fb.group({
      notes: ['']
    });
  };

  getAllPatients(){
    let currentUserMail: Email;
    let reqObj: any = {};
    currentUserMail = this.cus.getCurrentUser();
    reqObj.email = currentUserMail;
    this.dss.getAllPatientList(reqObj).subscribe(res =>{
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
      //this.getAppointmentDetails(data);
      console.log(data);
      //this.isAppointmentEdit = true;
    } else {
      this.patientAction.label = 'Create';
      //this.isAppointmentEdit = false;
      //this.createForm();
    }
    this.patientAction.collapsed = true;
  }
}

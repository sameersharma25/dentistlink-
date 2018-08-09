import { Component, OnInit} from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CurrentUserService } from '../shared/services/current-user.service';
import { DataSourceService } from '../shared/services/data-source.service';
import {ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-patient-page',
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.scss']
})
export class PatientPageComponent implements OnInit {
	patientId: any = [];
	reqObj: any = {};
	pDetails: any = [];
  //
  panelState: Boolean = true;
  isCollapsed: Boolean = false;
  isCollapsed1: Boolean = false;
  isOpen: Boolean = false;

	//
	patientName: string;
	patientZipCode: string;
	patientContact: string;
  patientDistance: number;
	patientAddress: string;
	patientCity: string;
	patientState: string;
	patientPhone: string;
	patientEmail: string;
  //referral form
  referralDetailForm: FormGroup
  taskDetailForm: FormGroup



  constructor(
  	private cus: CurrentUserService,
    private dss: DataSourceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  	) { }

  ngOnInit(){
    //this.patientName = "Tushar"
     this.route.queryParams.subscribe(params => {
      let id = params['patient_id'];
      if (id) {
        this.getPatientsDetails(id);
      }
    });
  }
    



  createForm(){
    this.referralDetailForm = this.fb.group({
      referral_email: [''],
      patient_id: [''],
      source: [''],
      referral_name: [''],
      referral_description: [''],
      urgency: [''],
      due_date: [''],
    })
    this.taskDetailForm = this.fb.group({
      task_type: [''],
      task_status: [''],
      task_owner: [''],
      provider: [''],
      task_deadline: [''],
      task_description: [''],
    })

  }

  getPatientsDetails(data: any) {
    this.patientId = data
    console.log("Checking for ID",this.patientId)
    this.reqObj.email = this.cus.getCurrentUser();
    this.reqObj.patient_id = this.patientId;
    this.dss.getPatientsDetails(this.reqObj).subscribe(res => {
      const response: any = res;
      console.log("What is my response", res)
      this.pDetails = res
      this.patientName = this.pDetails.patients_details.first_name
      console.log("I have results!",res);
       if (response.status === 'ok') {
  			this.patientName = this.pDetails.patients_details.first_name
        console.log("second component", this.patientName)
      }

    }, err => {
      console.log(err);

    });
  }

  createReferral(){
    let reqObj: any = {
      email: this.cus.getCurrentUser(),
      referral_email: this.patientName,
      patient_id: this.patientId,
      source: this.referralDetailForm.value.source,
      referral_name: this.referralDetailForm.value.referral_name,
      referral_description: this.referralDetailForm.value.referral_description,
      urgency: this.referralDetailForm.value.urgency,
      due_date: this.referralDetailForm.value.due_date,
    };
    this.dss.referralCreate(reqObj).subscribe(res => {
      console.log("what are my values",reqObj)
      let response:any = res;
      if(response.status == 'ok'){
        alert("referral created")
        //add call for input window to close
      }
    }, err => {
      console.log("Error::"+err)
    })
  }


  createTask(){
    let reqObj: any = {
      task_type: this.taskDetailForm.value,
      task_status: this.taskDetailForm.value,
      task_owner: this.taskDetailForm.value,
      provider: this.taskDetailForm.value,
      task_deadline: this.taskDetailForm.value,
      task_description: this.taskDetailForm.value, 
    };
    //UPDATE THIS TO THE CORRECT API
    this.dss.referralCreate(reqObj).subscribe(res => {
      console.log("what are my values",reqObj)
      let response:any = res;
      if(response.status == 'ok'){
        alert("referral created")
        //add call for input window to close
      }
    }, err => {
      console.log("Error::"+err)
    })
  }




}

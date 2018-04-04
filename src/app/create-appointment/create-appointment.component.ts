import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrentUserService } from '../shared/services/current-user.service';
import { DataSourceService } from '../shared/services/data-source.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnInit {
  relations:String[];
  visitList: String[];
  newAppointmentForm: FormGroup;
  reqObj:any = {};
  response: any = {};

  constructor(private fb: FormBuilder, private cs: CurrentUserService, private router: Router, private ds: DataSourceService) { 
    this.createForm();
  }

  ngOnInit() {
    this.relations = ["Myself","Child","Spouse/Partner","Parent","Other"];
    this.visitList = ["Apple Health(Medicaid)","Aenta","Cigna","Delta Dental of WA","Premera Blue Cross","United Healthcare","No Insurance","Other"];

  }

  createForm(){
    this.newAppointmentForm = this.fb.group({
      patient_phone:['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      reason_for_visit:['', Validators.required],
      Patient_coverage: ['', Validators.required]
    })
  }
  createAppointment(){
    this.reqObj = this.newAppointmentForm.value;
    this.reqObj.email = this.cs.getCurrentUser();
    console.log(this.reqObj)
    this.ds.create(this.reqObj).subscribe(response =>{
      this.response = response;
      if(this.response.status == 'ok'){
        alert(this.response.message)
      }
    }, err => {
      console.log(err);
    });
    this.router.navigate(['/appointment'])
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrentUserService } from '../shared/services/current-user.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnInit {
  relations:String[];
  visitList: String[];
  newAppointmentForm: FormGroup;
  reqObj:any;

  constructor(private fb: FormBuilder, private cs: CurrentUserService, private router: Router) { 
    this.createForm();
  }

  ngOnInit() {
    this.relations = ["Myself","Child","Spouse/Partner","Parent","Other"];
    this.visitList = ["Apple Health(Medicaid)","Aenta","Cigna","Delta Dental of WA","Premera Blue Cross","United Healthcare","No Insurance","Other"];

  }

  createForm(){
    this.newAppointmentForm = this.fb.group({
      patientPhoneNumber:['', Validators.required],
      patientFirstName: ['', Validators.required],
      patientLastName: ['', Validators.required],
      visitReason:['', Validators.required],
      patientCoverageId: ['', Validators.required]
    })
  }
  createAppointment(){
    this.reqObj = this.newAppointmentForm.value;
    this.reqObj.email = this.cs.getCurrentUser();
    console.log(this.reqObj)
    this.router.navigate(['/appointment'])
  }

}

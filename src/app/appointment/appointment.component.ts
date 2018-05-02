import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
//import { FormsModule } from '@angular/forms';
import { DataSourceService } from '../shared/services/data-source.service';
import { CurrentUserService } from '../shared/services/current-user.service';
import { DataCommService } from '../shared/services/data-comm.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})

export class AppointmentComponent implements OnInit {
  appointmentList: any[];
  userAction = {};
  currentUserInfo:any;
  reqObj:any ={};
  response: any = {};
  appointmentAction: string = '';
  appointmentEditForm: FormGroup;
  dateOfBirth: any ={};
  isCollapsed: Boolean = false;
  appointments: any = {};
  isAppointmentEdit: Boolean = false;

  constructor(
    private ds: DataSourceService,
    private cus: CurrentUserService,
    private dcs: DataCommService,
    private router: Router,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    // this.cus.isAuthenticated.subscribe(res =>{
    //   this.currentUserInfo = this.cus.getCurrentUser();
    //   console.log(this.currentUserInfo);
    // });
    this.appointments.label = "";
    this.appointments.collapsed = false;
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
    this.createForm();
    this.getAppointments();
  }
  createForm(){
    this.appointmentEditForm = this.fb.group({
      firstName:[''],
      lastName:[''],
      phoneNumber:[''],
      patientEmail:[''],
      month: [''],
      day: [''],
      year: [''],
      preferredContact: [''],
      aptMonth: [''],
      aptDay: [''],
      aptYear: [''],
      cleaning:[''],
      surgery: [''],
      pain: [''],
      dentures: [''],
      infection: [''],
      damage: [''],
      patientCoverage: [''],
      patientCoverageId: [''],
      notes: ['']
    })
  };
  getAppointments(){
    this.reqObj.email = this.cus.getCurrentUser();
    this.ds.getAppointments(this.reqObj).subscribe(res =>{
      this.response = res;
      if(this.response.status == 'ok'){
        this.appointmentList = this.response.details_array;
        //this.appointmentList = this.getAppointmentList(this.response);
        console.log(res)
        console.dir(this.appointmentList)
      }
    }, err =>{
      console.log(err);
    });
  };

  getAppointmentList(response){
    if((response.appointments.length || response.details_array.length) && (response.appointments.length == response.details_array.length)){
      var apl:any[] =[];
      apl = response.appointments;
      for(let i =0; i<response.details_array.length;++i){
        var pi:any = {};
        pi.patient_name = response.details_array[i]['patient_name'];
        pi.patient_dob = response.details_array[i]['patient_dob'];
        apl[i]['patientInfo'] = pi;
      }
      return apl;
    } else {
      return [];
    }
  };


  checkModelValue(event){
    this.appointmentAction = event.currentTarget.value;
    console.log(event.currentTarget.value);
    this.dcs.setAppointmentAction(this.appointmentAction);
    if (this.appointmentAction === 'Edit') {
      this.router.navigate(['/create-appointment']);
    }
  }

  openAppointmentAction(data) {
    if (data) {
      this.appointments.label = 'Edit';
      this.getAppointmentDetails(data);
      console.log(data);
      this.isAppointmentEdit = true;
    } else {
      this.appointments.label = 'Create';
      this.isAppointmentEdit = false;
      this.createForm();
    }
    this.appointments.collapsed = true;
  }
  editAppointment() {
    console.log(this.appointmentEditForm.value)
    this.appointments.label = 'Edit';
    if (this.isAppointmentEdit) {
      this.reqObj.email = this.cus.getCurrentUser();
       this.reqObj.first_name =  this.appointmentEditForm.value.firstName;
      console.log(this.reqObj);
        this.ds.updateAppointment(this.reqObj).subscribe(res => {
          this.response = res;
          console.log(res);
          if (this.response.status === 'ok') {

          }
        });
    } else {
      this.reqObj = {};
    }
    this.appointments.collapsed = false;
  }

  createAppointment() {

  }

  getAppointmentDetails(data: any) {
    this.reqObj.email = this.cus.getCurrentUser();
    this.reqObj.appointment_id = data.appointment_id;
    this.ds.getAppointmentDetails(this.reqObj).subscribe(res => {
      this.response = res;
      console.log(res);
      if (this.response.status === 'ok') {
        const apptDetails = this.response.appointment_hash;
        (<FormGroup>this.appointmentEditForm)
          .patchValue({firstName: apptDetails.first_name}, {onlySelf: true});
        (<FormGroup>this.appointmentEditForm)
          .patchValue({lastName: apptDetails.last_name}, {onlySelf: true});
        (<FormGroup>this.appointmentEditForm)
          .patchValue({phoneNumber: apptDetails.phone_number}, {onlySelf: true});
        (<FormGroup>this.appointmentEditForm)
          .patchValue({patientEmail: apptDetails.patient_email}, {onlySelf: true});
        console.log(this.appointmentEditForm.value);
      }
    }, err => {
      console.log(err);
    });
  }
}

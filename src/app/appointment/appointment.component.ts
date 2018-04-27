import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(
    private ds: DataSourceService, 
    private cus: CurrentUserService, 
    private dcs: DataCommService,
    private router: Router) {
    
  }

  ngOnInit() {
    // this.cus.isAuthenticated.subscribe(res =>{
    //   this.currentUserInfo = this.cus.getCurrentUser();
    //   console.log(this.currentUserInfo);
    // });
    this.getAppointments();
  }
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
        pi.patient_dob= response.details_array[i]['patient_dob'];
        apl[i]['patientInfo'] = pi;
      }
      return apl;
    }else{
      return [];
    }
  };

  checkModelValue(event){
    this.appointmentAction = event.currentTarget.value;
    console.log(event.currentTarget.value);
    this.dcs.setAppointmentAction(this.appointmentAction);
    if(this.appointmentAction === 'Edit'){
      this.router.navigate(['/create-appointment']);
    }
  };

}

import { Component, OnInit } from '@angular/core';
//import { FormsModule } from '@angular/forms';
import { DataSourceService } from '../shared/services/data-source.service';
import { CurrentUserService } from '../shared/services/current-user.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  providers:[DataSourceService]
})

export class AppointmentComponent implements OnInit {
  appointmentList: any[];
  userAction = {};
  currentUserInfo:any;
  reqObj:any ={};
  response: any = {};
 
  constructor(private ds: DataSourceService, private cus: CurrentUserService) {
    
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
        this.appointmentList = this.getAppointmentList(this.response);
        console.log(res)
        console.dir(this.appointmentList)
      }
    }, err =>{
      console.log(err);
    });
  }

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
  }

}

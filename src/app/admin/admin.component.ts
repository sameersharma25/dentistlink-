import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray} from '@angular/forms';
import { DataSourceService } from '../shared/services/data-source.service';
import { CurrentUserService } from '../shared/services/current-user.service';
import { DataCommService } from '../shared/services/data-comm.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  usersList: any[];
  reqObj:any ={};
  response: any = {};
  constructor(
    private ds: DataSourceService,
    private cus: CurrentUserService,
    private dcs: DataCommService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // this.users = [{uName:'user1',type:'PCP'},{uName:'user2',type:'CC'}];
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.reqObj.email = this.cus.getCurrentUser();
    this.ds.getUsers(this.reqObj).subscribe(res =>{
      this.response = res;
      if(this.response.status == 'ok'){
        this.usersList = this.response.users_data;
        console.log(this.usersList);
        //this.appointmentList = this.getAppointmentList(this.response);
      }
    }, err =>{
      console.log(err);
    });
  };


}

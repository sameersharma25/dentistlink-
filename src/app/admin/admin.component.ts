import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../shared/services/data-source.service';
import { CurrentUserService } from '../shared/services/current-user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userList: any[];
  reqObj:any ={};
  response: any = {};
  currentUserInfo:any;

  constructor(private ds: DataSourceService, private cus: CurrentUserService) {

  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.reqObj.email = this.cus.getCurrentUser();
    this.ds.getUsers(this.reqObj).subscribe(res =>{
      this.response = res;
      if(this.response.status == 'ok'){
        this.userList = this.getUserList(this.response);
        console.log(res)
        console.dir(this.userList)
      }
    }, err =>{
      console.log(err);
    });
  }

  getUserList(response){
    if ((response.users_data.length )){
      var ul:any[] = [];
      ul = response.users_data;
      for(let i =0; i<response.users_data.length;++i){
        var ui: any = {};
        ui.name = response.users_data[i]['name'];
        ui.email= response.users_data[i]['email'];
        ui.cc= response.users_data[i]['email'];
        ui.pcp = response.users_data[i]['email'];
        ul[i]['userInfo'] = ui;
      }
      return ul;
    } else {
      return [];
    }
  }

}

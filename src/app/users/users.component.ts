import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CurrentUserService } from '../shared/services/current-user.service';
import { DataSourceService } from '../shared/services/data-source.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  createUserForm: FormGroup;
  reqObj: any = {};
  response: any = {};

  constructor(private fb: FormBuilder, private cus: CurrentUserService, private ds: DataSourceService) {
    this.createForm();
   }

  createForm(){
    this.createUserForm = this.fb.group({
      user_name: '',
      user_email: '',
      password: '',
      confirmPassword: '',
      isAdmin: false,
      purpose: null
    });
  }
  // creat new user
  createUser(){
    this.reqObj.email = this.cus.getCurrentUser();
    this.reqObj.user_email = this.createUserForm.value.user_email;
    this.reqObj.user_name = this.createUserForm.value.user_name;
    this.reqObj.cc = this.createUserForm.value.purpose == 'coordinator'? true:false;
    this.reqObj.pcp = this.createUserForm.value.purpose == 'pcp'? true:false;
    this.ds.createNewUser(this.reqObj).subscribe(res =>{
      this.response = res;
      if(this.response.status == 'ok'){
        alert(this.response.message);
      }else{
        alert("user not created");
      }
      console.log(this.response)
    }, err =>{
      console.log(err);
    });
  };

  ngOnInit() {
  }

}

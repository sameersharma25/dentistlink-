import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CurrentUserService } from '../shared/services/current-user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  createUserForm: FormGroup;
  reqObj: any = {};

  constructor(private fb: FormBuilder, private cus: CurrentUserService) {
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
    this.reqObj = this.createUserForm.value;
    this.reqObj.email = this.cus.getCurrentUser();
    console.log(this.reqObj)
  };

  ngOnInit() {
  }

}

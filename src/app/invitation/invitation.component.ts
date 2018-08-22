import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { CurrentUserService } from '../shared/services/current-user.service';
import { DataSourceService } from '../shared/services/data-source.service';
import {Email} from '../shared/model/common-model';
import { UserAuthService} from '../shared/services/user-auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {
  setPasswordForm: FormGroup;
  userInfo: loginType;
  reqTokenObj = <authType>{};
  token = String;
  response: any;
  invitaion_token: String
  email: String
  user_email: String
  constructor(private fb: FormBuilder, private router: Router, private uAuthService: UserAuthService, private cs: CurrentUserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let user_email = params['user_email'];
       this.user_email = user_email;

    });
    console.log("Params areeeeeee: "+ this.invitaion_token);

    this.createForm();
  }

  createForm() {
    this.setPasswordForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  };

  setpassword() {
    this.userInfo = this.setPasswordForm.value;
    if (this.userInfo.password && this.userInfo.confirmPassword) {

      this.activatedRoute.queryParams.subscribe((params: Params) => {
        let invite_token = params['invitation_token'];
        let user_name = params['user_email'];
        this.invitaion_token = invite_token;
        this.email = user_name
        console.log(invite_token + " "+ user_name )
      });
      this.reqTokenObj.invitation_token = this.invitaion_token;
      this.reqTokenObj.email = this.email;
      // this.reqTokenObj.email = this.userInfo.userName;
      this.reqTokenObj.password = this.userInfo.password;
      this.reqTokenObj.password_confirmation = this.userInfo.confirmPassword;

      this.uAuthService.setPassword(this.reqTokenObj).subscribe(res => {
        this.response = res;
        if (this.response.message == "Password is set") {
          this.router.navigate(['/login']);
        }  else {
          alert(this.response.message);
        }
      }, err => {
        console.log(err);
      });

    } else {
      return false;
    }
  };

}

interface loginType{
  password: any,
  confirmPassword: any
}

interface authType{
  email: String,
  password: String,
  confirmPassword: any,
  invitation_token: String,
  password_confirmation: String
}

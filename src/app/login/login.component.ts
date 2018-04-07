import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserAuthService} from '../shared/services/user-auth.service';
import { CurrentUserService } from '../shared/services/current-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // initialize variables
  loginForm: FormGroup;
  userInfo :loginType;
  reqTokenObj = <authType>{};
  token = String;
  response:any;

  constructor(private fb: FormBuilder, private router: Router, private uAuthService: UserAuthService, private cs: CurrentUserService) { 
    this.createForm();
  }
  ngOnInit() {
  }
  createForm(){
    this.loginForm = this.fb.group({
      userName:['', Validators.required],
      userPassword: ['', Validators.required]
    })
  };
  login(){
    this.userInfo = this.loginForm.value;
    if(this.userInfo.userName && this.userInfo.userPassword){
      this.reqTokenObj.email = this.userInfo.userName;
      this.reqTokenObj.password = this.userInfo.userPassword;
      this.uAuthService.getAuthToken(this.reqTokenObj).subscribe(res => {
        this.response = res;
        if(this.response.authentication_token){
          this.router.navigate(['/home']);
        }else{
          alert(this.response.message)
        }
      }, err => {
        console.log(err) 
      });
      
    }else{
      return false;
    }
  };

  guest(){
    this.router.navigate(['/create-appointment']);
  }

}

interface loginType{
  userName: String,
  userPassword: any
}
interface authType{
  email: String,
  password: String
}
interface authTokenType{
  application_representative: any,
  authentication_token: String,
  cc: any,
  email: String,
  pcp: any
 }
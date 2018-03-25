import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // initialize variables
  loginForm: FormGroup;
  userInfo :loginType;

  constructor(private fb: FormBuilder, private router: Router) { 
    this.createForm();
  }
  createForm(){
    this.loginForm = this.fb.group({
      userName:['', Validators.required],
      userPassword: ['', Validators.required]
    })
  };
  onSubmit(){
    this.userInfo = this.loginForm.value;
    console.log(this.userInfo)
    if(this.userInfo.userName && this.userInfo.userPassword){
      this.router.navigate(['/home']);
    }else{
      return false;
    }
  };

  ngOnInit() {
  }

}

interface loginType{
  userName: String,
  userPassword: any
}
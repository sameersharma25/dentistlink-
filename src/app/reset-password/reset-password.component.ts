import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.resetPasswordForm = this.fb.group({
      reset_for:['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  };

  resetPassword(){
    console.log(this.resetPasswordForm.value);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  createUserForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  createForm(){
    this.createUserForm = this.fb.group({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isAdmin: false
    });
  }

  ngOnInit() {
  }

}

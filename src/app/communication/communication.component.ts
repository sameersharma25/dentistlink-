import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CurrentUserService } from '../shared/services/current-user.service';
import { DataSourceService } from '../shared/services/data-source.service';
import {ActivatedRoute, Params} from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit {
	replyToggle: Boolean = false;
	reqObj: any = {};
	messages: any = [];
  constructor(
  	private cus: CurrentUserService,
    private dss: DataSourceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
  	this.getCommunication()
  }


 getCommunication(){
 	this.reqObj.patient_id = "5b8425a65fd8db7ae1281a1c"
   this.reqObj.email = this.cus.getCurrentUser()
   this.dss.commList(this.reqObj).subscribe(res => {
      const response: any = res;
     if (response.status === 'ok') {
       console.log("Communcation response", response)
     this.messages = response.comm_data
     console.log("message", this.messages)
 	}

 })
 }


}

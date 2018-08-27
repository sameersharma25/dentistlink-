import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CurrentUserService } from '../shared/services/current-user.service';
import { DataSourceService } from '../shared/services/data-source.service';
import {ActivatedRoute} from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
	messageForm: FormGroup
	reqObj: any = {};

  constructor(
  	private cus: CurrentUserService,
    private dss: DataSourceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
  	this.createForm();
  }

createForm(){
     this.messageForm = this.fb.group({
       comm_id: [''],
       message: [''],
     })
}

sendReply(){
	this.reqObj = {
		comm_id: this.messageForm.value.comm_id,
		message: this.messageForm.value.message,
	}
	this.dss.sendReply(this.reqObj).subscribe(res => {
     let response:any = res;
     if(response.status == 'ok'){
       alert("Message Sent")
       this.messageForm.reset()
       //add call for input window to close
     }
   }, err => {
     console.log("Error::"+err)
   })
 }










}


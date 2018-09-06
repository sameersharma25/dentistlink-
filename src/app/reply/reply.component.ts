import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CurrentUserService } from '../shared/services/current-user.service';
import { DataSourceService } from '../shared/services/data-source.service';
import {ActivatedRoute, Params} from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
	messageForm: FormGroup
	reqObj: any = {};
	communication_id: string 
  msgForm: Boolean = false;
  sendResponse: string;

  constructor(
  	private cus: CurrentUserService,
    public dss: DataSourceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
  	this.createForm();

  	  this.route.queryParams.subscribe(params => {
      let comm_id = params['comm_id']
      this.communication_id = comm_id
      console.log("Comm ID ID ID", comm_id)
    })
  }

createForm(){
     this.messageForm = this.fb.group({
       comm_id: [''],
       message: [''],
     })
}

sendReply(){
  
  console.log(this.communication_id)
	this.reqObj = {
		comm_id: this.communication_id,
		message: this.messageForm.value.message,
	}
	this.dss.sendReply(this.reqObj).subscribe(res => {
     let response:any = res;
     if(response.status ==='ok'){
this.msgForm = true;
  this.sendResponse = "Your message has been sent. Thank you!"
     }
     

   }, err => {
     console.log("Error::"+err)
   })
 }










}


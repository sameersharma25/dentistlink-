import { Component, OnInit, AfterViewInit} from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { CurrentUserService } from '../shared/services/current-user.service';
import { DataSourceService } from '../shared/services/data-source.service';


@Component({
  selector: 'app-patient-page',
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.scss']
})
export class PatientPageComponent implements OnInit {
	patientId: any = [];
	reqObj: any = {};
	pDetails: any = [];
  //
  panelState: Boolean = true;
  isCollapsed: Boolean = false;
  isCollapsed1: Boolean = false;
  isOpen: Boolean = false;

	//
	patientName: string;
	patientZipCode: string;
	patientContact: string;
  patientDistance: number;
	patientAddress: string;
	patientCity: string;
	patientState: string;
	patientPhone: string;
	patientEmail: string;


  constructor(
  	private cus: CurrentUserService,
    private dss: DataSourceService,
  	) { }

	ngOnInit(){
    //this.patientName = "Tushar"

  }

   strangers(data){
     console.log("Data from Component",data)
     this.getPatientsDetails(data)
   }

  getPatientsDetails(data: any) {
    this.patientId = data.patient_id
    console.log("Checking for ID",this.patientId)
    this.reqObj.email = this.cus.getCurrentUser();
    this.reqObj.patient_id = this.patientId;
    this.dss.getPatientsDetails(this.reqObj).subscribe(res => {
      const response: any = res;
      console.log("What is my response", res)
      this.pDetails = res
      this.patientName = this.pDetails.patients_details.first_name
      console.log("I have results!",res);
       if (response.status === 'ok') {
  			this.patientName = this.pDetails.patients_details.first_name
        console.log("second component", this.patientName)
      }
 
    }, err => {
      console.log(err);

    });
  }


}

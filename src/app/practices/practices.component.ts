import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CurrentUserService } from '../shared/services/current-user.service';
import { DataSourceService } from '../shared/services/data-source.service';
import {MatPaginatorModule} from '@angular/material/paginator';


@Component({
  selector: 'app-practices',
  templateUrl: './practices.component.html',
  styleUrls: ['./practices.component.scss']
})
export class PracticesComponent implements OnInit {
	//For HTML CSS
	panelState: Boolean = true;
	isCollapsed: Boolean = false;
	isCollapsed1: Boolean = false;
	isOpen: Boolean = false;
	hasOtherOptions: boolean = false;
	radiusOp: any[];
  ageOp: any[];
  treatmentOp: any[];
  numLimit = 2;
  zipSearch: string
  searchDetails: FormGroup;
	//
	reqObj: any = {};
	serviceProvider: any = [];
	selectedProvider: any = [];
  backitup: any = [];
	value = '';
  // form values
  formZipcode: string ="&zip="
  formRadius: string ="&radius="
  formAge: string ="&age="
  formTreatment: string = "&treatment="
  //
  // Map&List
  hideList: boolean = false;
  hideMap: boolean = false;
  lat: number = 47.622537
  lng: number = -122.333854
  array1: any =[]
  array2: any = []



	// Provider Details
  providerId: string;
  providerFlag: boolean;
  providerDescription: string;
  providerDescription2: string;
	providerName: string;
	providerZipCode: string;
	providerContact: string;
  providerDistance: number;
	providerAddress: string;
	providerCity: string;
	providerState: string;
	providerPhone: string;
	providerEmail: string;
		//checkbox
	providerApple: boolean
	providerDelta: boolean
	providerUninsured: boolean
	providerPediatric: string
	providerAdult: string
		//services
	providerCleaning: boolean
	providerPain: boolean
	providerExtraction: boolean
	providerOrtho: string
	providerDentures: string
  //provider Details


  //Pagination
  iterations: any = [];
  startS: number = 0;
  endS: number = 50;




  constructor(
  	private cus: CurrentUserService,
    private dss: DataSourceService,
    private fb: FormBuilder,) {
    this.radiusOp=[10,20,30,40,50];
    this.ageOp = ["5 or less", "Between 6-20", "Above 20"]
    this.treatmentOp=["Cleaning","Pain","Extraction","Orthodontics","Dentures"]}

  ngOnInit() {
  	this.getProviders();
    this.createForm();
  }



  createForm(){
    this.searchDetails = this.fb.group({
      zipcode: [''],
      radius: [''],
      age: [''],
      treatment: ['']
    })
  }


  flagFunc(value1,value2){
    console.log("What I'm passing", value1,value2)
    if(confirm("Are you sure to flag this provider?")) {
    console.log("Implement delete functionality here", value1);
      this.reqObj.providerId= value1
      this.reqObj.providerFlag= value2
    this.dss.flagPractice(this.reqObj).subscribe(res =>{
   console.log("Flagging",this.reqObj)
     let response:any = res;
     if(response.status == 'ok'){
       alert("Flagged Provider")
       //add call for input window to close
     }
   }, err => {
     console.log("Error::"+err)
   })
  }
  }


  theChecker(){
    var grandURL = ""
    console.log("zipcode",this.searchDetails.value.zipcode)
    //Z I P C O D E
    if (this.searchDetails.value.zipcode != '') {
      grandURL = grandURL+this.formZipcode+this.searchDetails.value.zipcode
    }  // R A D I U S
    if(this.searchDetails.value.radius != ''){
      grandURL = grandURL+this.formRadius+this.searchDetails.value.radius
    }
    // T R E A T M E N T
    if(this.searchDetails.value.treatment != ''){
      grandURL = grandURL+this.formTreatment+this.searchDetails.value.treatment
    }
    // A G E
    if(this.searchDetails.value.age == ''){
      grandURL = grandURL
    }else if(this.searchDetails.value.age == '5 or less') {
      grandURL = grandURL+this.formAge+'5_or_less'
    }else if(this.searchDetails.value.age == 'Between 6-20'){
        grandURL = grandURL+this.formAge+'between_6-20'
    }else if(this.searchDetails.value.age == 'Above 20'){
        grandURL = grandURL+this.formAge+'Above_20'
    } else {
      return grandURL
    }

    console.log("GRAND",grandURL)
    this.searchZipcode(grandURL)
  }

  updatePanel(data){
    console.log("What is this value",data)
    this.openProviderAction(data)
  }

  mapFunction(){
  	this.hideList = true;
  	this.hideMap = false;
  }
  listFunction(){
  	this.hideList = false;
  	this.hideMap = true;
  }

  getProviders(){
  	this.reqObj.email = this.cus.getCurrentUser();
  	this.dss.allProviders(this.reqObj).subscribe(res => {
  		this.serviceProvider = res;
      this.breakitdown(res);
  		console.log("All Providers", res);
      this.lat = this.serviceProvider[0].Geolocation__c.latitude
      this.lng = this.serviceProvider[0].Geolocation__c.longitude
  	})

  } //End getProviders


  searchZipcode(value){
  	this.reqObj.email = this.cus.getCurrentUser();
  	this.dss.searchZip(this.reqObj,value).subscribe(res => {
  		this.serviceProvider = res;
      this.breakitdown(res);
  		console.log("can I get a length",this.serviceProvider.length)
  		if(this.serviceProvider.length === 0){
  			alert("There are no practices in this zipcode")
  		}
  	})
  }

  breakitdown(data){
    this.backitup = data
   // for (var i =0; i< this.backitup.length/50; i++ ) {
   //   //Array[i] = this.backitup.slice(this.startS,this.endS)
   //   this.iterations.push(this.backitup.slice(this.startS,this.endS))
   //   console.log("Pagination?",this.iterations)
   //   this.startS = this.startS+50;
   //   this.endS =this.endS+50;
   // }
    if(this.backitup.length > 50){
    this.array1 = this.backitup.slice(0,50)
    } else
    this.array1 = this.backitup

  }
  newnewnew(data){
    console.log(data)

  }

 openProviderAction(data){
      //Basic Info
      this.providerId = data.Id
      this.providerName = data.Name
      this.providerFlag = data.Flagged_Provider__c
      this.providerDescription = data.Description
      this.providerDescription2 = data.External_Description__c
      this.providerZipCode = data.BillingAddress.postalCode
      this.providerState = data.BillingAddress.state
      this.providerAddress = data.BillingAddress.street
      this.providerCity = data.BillingAddress.city
      this.providerPhone = data.Phone
      this.providerEmail = data.Provider_Email__c
      this.isCollapsed1 = true;
      //checkbox
      this.providerApple = data.Apple_Health__c
      this.providerDelta = data.Delta_Dental_of_WA__c
      this.providerPediatric = data.Pediatric__c
      this.providerAdult = data.Adult__c
      //missing cleaning,pain,extraction,denture
      this.providerOrtho = data.Orthodontics__c
      this.providerCleaning = data.Cleaning__c
      this.providerPain = data.Pain__c
      this.providerExtraction = data.Extractions__c
      this.providerOrtho = data.Orthodontics__c
      this.providerDentures = data.Dentures__c

 }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CurrentUserService } from '../shared/services/current-user.service';
import { DataSourceService } from '../shared/services/data-source.service';

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
  treatmentOp: any[];
  numLimit = 2;
  zipSearch: string
  searchDetails: FormGroup;
	//
	reqObj: any = {};
	serviceProvider: any = [];
	selectedProvider: any = [];
	value = '';
  // form values
  formZipcode: string ="?zip="
  formRadius: string ="&radius="
  formAge: string ="&age="
  //
  // Map&List
  hideList: boolean = false;
  hideMap: boolean = false;
  lat: number = 47.622537
  lng: number = -122.333854



	// Provider Details
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





  constructor(
  	private cus: CurrentUserService,
    private dss: DataSourceService,
    private fb: FormBuilder,) {
    this.radiusOp=[5,10,15];
    this.treatmentOp=["5 or Younger","6 - 20", "20 & Above"]}

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
  theChecker(){
    var grandURL = ""
    console.log("zipcode",this.searchDetails.value.zipcode)
    if (this.searchDetails.value.zipcode != '') {
      grandURL = grandURL+this.formZipcode+this.searchDetails.value.zipcode
    } else{
      this.formZipcode =""
    }
    if(this.searchDetails.value.radius != ''){
      grandURL = grandURL+this.formRadius+this.searchDetails.value.radius
    } else {
      this.formRadius =""
    }

    if(this.searchDetails.value.age != '') {
      grandURL = grandURL+this.formAge+this.searchDetails.value.age
    } else {
      this.formAge =""
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
  		this.serviceProvider = res
  		console.log("All Providers", res);
  	})
  } //End getProviders

  searchZipcode(value){

  	this.reqObj.email = this.cus.getCurrentUser();
  	this.dss.searchZip(this.reqObj,value).subscribe(res => {
  		this.serviceProvider = res;
  		console.log("Need to set up Location", res)
  		this.lat = res[0].Geolocation__c.latitude
  		this.lng = res[0].Geolocation__c.longitude
  		console.log("can I get a length",this.serviceProvider.length)
  		if(this.serviceProvider.length === 0){
  			alert("There are no practices in this zipcode")
  		}
      this.zipSearch =''
  	})
  }

 openProviderAction(data){
      //Basic Info
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
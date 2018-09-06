import { Component, OnInit} from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CurrentUserService } from '../shared/services/current-user.service';
import { DataSourceService } from '../shared/services/data-source.service';
import {ActivatedRoute, Params} from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras} from '@angular/router';



@Component({
  selector: 'app-patient-page',
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.scss']
})
export class PatientPageComponent implements OnInit {
	patientId: any = [];
	reqObj: any = {};
	pDetails: any = [];
  patientAction: any = {};
  patientDetails:any = {};
  taskDetails: any = [];
  referralDetail: any = [];
  //
  panelState: Boolean = true;
  isCollapsed: Boolean = false;
  isCollapsed1: Boolean = false;
  isOpen: Boolean = false;
	//
	patientName: string;
  patientNameLast: string;
  patientDOB: string;
  patientMOC: string;
  patientInsurance: string;
	patientZipCode: string;
	patientContact: string;
  patientDistance: number;
	patientAddress: string;
	patientCity: string;
	patientState: string;
	patientPhone: string;
	patientEmail: string;
  //referral form
  referralDetailForm: FormGroup
  taskDetailForm: FormGroup
  patientDetailsEditForm: FormGroup
  patientAppointmentForm: FormGroup
  messageForm: FormGroup
  //for date
  dateOfBirth: any = {};
  dateOfAppointment: any = {};
  // Panel Control
  InputFormR: Boolean = false;
  InputFormT: Boolean = false;
  patientPanel: Boolean = false; 
  // Task & Referrals
  editT:Boolean = false;
  editR:Boolean = false;
  selectedTask: any = [];
  selectedReferral: any = [];
  referral_id: string;
  taskId: string;
  sourceType: any = [];
  taskType: any = [];
  urgencyType: any = [];
  treatmentOp: any = [];
  statusType: any =[];
  taskLength: number;
  appointmentFields: Boolean = false; 
  taskPanel:Boolean = false;
  //messages
  messages: any = [];
  msgPanel: Boolean = false;
  replyMSG: Boolean = false;
  replyID: string; 
  interval: any; 




  constructor(
  	private cus: CurrentUserService,
    private dss: DataSourceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  	) { }

  ngOnInit(){
    this.createForm();
    //this.patientName = "Tushar"
     this.route.queryParams.subscribe(params => {
      let id = params['patient_id'];
      if (id) {
        this.getPatientsDetails(id);
        this.referralDetailForm.value.patient_id = id;
      } else {
        this.patientAction.label ='Create'
      }
    });

    this.dateOfBirth.months = [
      {value: 1, viewValue:'JANUARY'},
      {value: 2, viewValue:'FEBUARY'},
      {value: 3, viewValue:'MARCH'},
      {value: 4, viewValue:'APRIL'},
      {value: 5, viewValue:'MAY'},
      {value: 6, viewValue:'JUNE'},
      {value: 7, viewValue:'JULY'},
      {value: 8, viewValue:'AUGUST'},
      {value: 9, viewValue:'SEPTEMBER'},
      {value: 10, viewValue:'OCTOBER'},
      {value: 11, viewValue:'NOVEMBER'},
      {value: 12, viewValue:'DECEMBER'}
    ];
    this.dateOfBirth.days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    this.dateOfBirth.years = [];
    this.dateOfAppointment.years = [2017,2018,2019,2020,2021];
    let year = new Date().getFullYear();

    if (year < 1900) {
      year = year + 1900;
    }
    let date = year - 101;
    let future = year + 100;
    while (date < future) {
      this.dateOfBirth.years.push(date);
      date++;

    }
    this.sourceType =["EHR", "EDR", "ExtCC","Internal", "Self"]
    this.taskType = ["Appointment","Support","UserDefined","Delegated Referral"]
    this.urgencyType = ["Critical" ,"High", "Moderate", "Low"]
    this.treatmentOp=["Cleaning","Pain","Extraction","Orthodontics","Dentures"];
    this.statusType =["New","Pending","Urgent","Closed"]
    this.patientPanel = true;
    this.getReferral();

  }



  createForm(){
    this.referralDetailForm = this.fb.group({
      referral_email: [''],
      patient_id: [''],
      source: [''],
      referral_name: [''],
      referral_description: [''],
      urgency: [''],
      due_date: [''],
    })
    this.taskDetailForm = this.fb.group({
      referral_id: [''],
      task_type: [''],
      task_status: [''],
      task_owner: [''],
      provider: [''],
      task_deadline: [''],
      task_description: [''],
      task_treatment: ['']
    })
    this.patientDetailsEditForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      month: [''],
      day: [''],
      year: [''],
      phoneNumber: [''],
      email: [''],
      preferredContact: [''],
      zipCode: [''],
      ethnicity: [''],
      gender: [''],
      patientAddress: [''],
      patientCoverage: [''],
      patientCoverageId: [''],
    })
     this.patientAppointmentForm = this.fb.group({
      month: [''],
      day: [''],
      year: [''],
      reasonForVisit: this.fb.group({
        cleaning: false,
        surgery: false,
        pain: false,
        dentures: false,
        infection: false,
        damage: false,
        others: false,
      })
    })
     this.messageForm = this.fb.group({
       task_id: [''],
       sender_id: [''],
       recipient_id: [''],
       recipient_type: [''],
       comm_subject: [''],
       comm_message: [''],

     })
  }

//Get Patient Info
  getPatientsDetails(data: any) {
    this.patientId = data;
    this.referralDetailForm.value.patient_id = data

    this.reqObj.email = this.cus.getCurrentUser();
    this.reqObj.patient_id = this.patientId;
    this.dss.getPatientsDetails(this.reqObj).subscribe(res => {
      const response: any = res;

      this.pDetails = res
      this.patientName = this.pDetails.patients_details.first_name
      this.patientNameLast = this.pDetails.patients_details.last_name

       if (response.status === 'ok') {


        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({firstName: this.pDetails.patients_details.first_name}, {onlySelf: true});
        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({lastName: this.pDetails.patients_details.last_name}, {onlySelf: true});
        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({phoneNumber: this.pDetails.patients_details.ph_number}, {onlySelf: true});
        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({email: this.pDetails.patients_details.patient_email}, {onlySelf: true});
        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({patientCoverage: this.pDetails.patients_details.healthcare_coverage}, {onlySelf: true});
        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({patientCoverageId: this.pDetails.patients_details.patient_coverage_id}, {onlySelf: true});
            const dateObj: any = this.getDateObject(this.pDetails.patients_details.date_of_birth);
        (<FormGroup>this.patientDetailsEditForm)
           .patchValue({day: dateObj.day}, {onlySelf: true});
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({month: dateObj.month}, {onlySelf: true});
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({year: dateObj.year}, {onlySelf: true});
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({preferredContact: this.pDetails.patients_details.mode_of_contact}, {onlySelf: true});
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({zipCode: this.pDetails.patients_details.patient_zipcode}, {onlySelf: true});
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({ethnicity: this.pDetails.patients_details.ethnicity}, {onlySelf: true});
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({gender: this.pDetails.patients_details.gender}, {onlySelf: true});
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({patientAddress: this.pDetails.patients_details.patient_address}, {onlySelf: true});
 

      }
        //this.patientAddress = this.pDetails.patients_details.patient_address
        //this.patientName = this.pDetails.patients_details.first_name
        //this.patientNameLast = this.pDetails.patients_details.last_name
        //this.patientDOB = this.pDetails.patients_details.date_of_birth
        //this.patientPhone = this.pDetails.patients_details.ph_number
        //this.patientEmail = this.pDetails.patients_details.patient_email
        //this.patientMOC = this.pDetails.patients_details.mode_of_contact
        //this.patientInsurance = this.pDetails.patients_details.healthcare_coverage
        //this.patientZipCode = this.pDetails.patients_details.patient_zipcode

    }, err => {
      console.log(err);

    });
  }



//CRUD USer
  editPatientInfo() {

    if(this.patientAction.label == 'Create'){
      let patient_dob = this.getDate(this.patientDetailsEditForm.value);
      let reqObj: any = {
        email: this.cus.getCurrentUser(),
        first_name: this.patientDetailsEditForm.value.firstName,
        last_name: this.patientDetailsEditForm.value.lastName,
        date_of_birth: patient_dob,
        patient_email: this.patientDetailsEditForm.value.email,
        patient_phone: this.patientDetailsEditForm.value.phoneNumber,
        patient_coverage_id: this.patientDetailsEditForm.value.patientCoverageId,
        healthcare_coverage: this.patientDetailsEditForm.value.patientCoverage,
        mode_of_contact: this.patientDetailsEditForm.value.preferredContact,
        patient_zipcode: this.patientDetailsEditForm.value.zipCode,
        ethnicity: this.patientAppointmentForm.value.ethnicity,
        gender: this.patientAppointmentForm.value.gender,
        patient_address: this.patientAppointmentForm.value.patientAddress

      };
      console.log("EditPatientInfo",this.patientDetailsEditForm.value.patientCoverage)
      this.dss.createPatient(reqObj).subscribe(res => {
        let response:any = res;
        if(response.status == 'ok'){
          this.patientPanel = false ;

          alert(response.message);
          this.router.navigate(['/patients']);

        }
      }, err => {
        console.log(err)
      });
    }else{
      var patientObj:any;
      patientObj = this.getPatientUpdate(this.patientDetailsEditForm, this.patientDetails);
      this.dss.updatePatient(patientObj).subscribe(res =>{
        let response:any = res;
        if(response.status == 'ok'){
          this.patientPanel = false ;
          alert(response.message);


        }
      }, err =>{
        console.log("Error in fetching data from server::" + err);
      })
    }

  }

    getPatientUpdate(formData, patientDetails){
    let patientObj:any = {};
    patientObj.patient_id = this.patientId;
    patientObj.first_name = formData.value.firstName;
    patientObj.last_name = formData.value.lastName;
    patientObj.date_of_birth = this.getDate(formData.value)? this.getDate(formData.value):patientDetails.date_of_birth;
    patientObj.patient_email = formData.value.email? formData.value.email : patientDetails.patient_email;
    patientObj.patient_phone = formData.value.phoneNumber? formData.value.phoneNumber : patientDetails.patient_phone;
    patientObj.patient_coverage_id = formData.value.patientCoverageId;
    patientObj.healthcare_coverage = formData.value.patientCoverage;
    patientObj.mode_of_contact = formData.value.preferredContact;
    patientObj.patient_zipcode = formData.value.zipCode;
    patientObj.ethnicity = formData.value.ethnicity;
    patientObj.gender = formData.value.gender;
    patientObj.patient_address = formData.value.patientAddress;
    console.log("UPDATE PATIENT",formData.value.patientCoverage)
    console.log("UPDATE PATIENT",formData.value.patientCoverageId)
    console.log("UPDATE ZIPCODE",formData.value.zipCode)
    this.patientPanel = false; 

    return patientObj;
  }

  // date format
  getDate(value){
    if(!value.day && !value.month && !value.year)
      return false;
    let tempDate: string ='';
    tempDate = `${value.year}-${value.month}-${value.day}`;
    return new Date(tempDate);
  }
    getDateObject(date){
    if(date){
      let tempDate:any = date;
      let dateObj: any = {
        day: new Date(tempDate).getDate(),
        month: new Date(tempDate).getMonth() + 1,
        year: new Date(tempDate).getFullYear()
      };
      return dateObj;
    }
    return;
  }


  onChange(event){
    console.log(event)
    if (event == 'Appointment'){
      this.appointmentFields = true;
    }
    else if (event == 'Support'){
      this.appointmentFields = false;
    }
    else if (event == 'UserDefined'){
      this.appointmentFields = false;
    }
    else if (event == 'Delegated Referral'){
      this.appointmentFields = false;
    } else {
      this.appointmentFields = false;
    }

}

editReferral(data){
  this.editR = true; 
  this.InputFormR = true;
  this.selectedReferral = data;
  this.referral_id = data.referral_id
  console.log("selected Referral", this.selectedReferral);

  (<FormGroup>this.referralDetailForm)
    .patchValue({source: this.selectedReferral.source}, {onlySelf: true});

  (<FormGroup>this.referralDetailForm)
    .patchValue({referral_name: this.selectedReferral.referral_name}, {onlySelf: true});

  (<FormGroup>this.referralDetailForm)
    .patchValue({urgency: this.selectedReferral.urgency}, {onlySelf: true});

  (<FormGroup>this.referralDetailForm)
    .patchValue({due_date: this.selectedReferral.due_date}, {onlySelf: true});

  (<FormGroup>this.referralDetailForm)
    .patchValue({referral_description: this.selectedReferral.referral_description}, {onlySelf: true});

  (<FormGroup>this.referralDetailForm)
    .patchValue({referral_id: this.selectedReferral.referral_id}, {onlySelf: true});

} //

updateReferral(){
  let reqObj: any = {
      referral_id: this.referral_id,
      source: this.referralDetailForm.value.source,
      referral_name: this.referralDetailForm.value.referral_name,
      referral_description: this.referralDetailForm.value.referral_description,
      urgency: this.referralDetailForm.value.urgency,
      due_date: this.referralDetailForm.value.due_date,
    };
    this.dss.updateReferral(reqObj).subscribe(res => {
      let response:any = res;
      if(response.status == 'ok'){
        alert("referral updated")
        this.referralDetailForm.reset()
        this.editR = false; 
        this.getReferral();
        //add call for input window to close
      }
    }, err => {
      console.log("Error::"+err)
    })
}


 getReferral(){
   console.log("patientID",this.patientId)
   this.reqObj.email = this.cus.getCurrentUser()
   this.reqObj.patient_id = this.patientId
   this.dss.getReferral(this.reqObj).subscribe(res => {
      const response: any = res;
     if (response.status === 'ok') {
       console.log("Referral response", response)
     this.referralDetail = response.referral_list 
 
     console.log("R ID Please", this.referralDetail.referral_id)
 
   }
 })
 }

  createReferral(){
    let reqObj: any = {
      email: this.cus.getCurrentUser(),
      patient_id: this.patientId,
      source: this.referralDetailForm.value.source,
      referral_name: this.referralDetailForm.value.referral_name,
      referral_description: this.referralDetailForm.value.referral_description,
      urgency: this.referralDetailForm.value.urgency,
      due_date: this.referralDetailForm.value.due_date,
    };
    this.dss.referralCreate(reqObj).subscribe(res => {
      let response:any = res;
      if(response.status == 'ok'){
        alert("referral created")
        //add call for input window to close
        this.referralDetailForm.reset()
        this.getReferral();
      }
    }, err => {
      console.log("Error::"+err)
    })
  }

  getTask(value){
    this.referralDetailForm.reset();
    this.taskDetailForm.reset();
    this.InputFormT = true;
    this.taskPanel = true;
    this.editT = false;
    this.editR = false;
    this.referral_id = value
    this.reqObj.referral_id = value
    this.reqObj.email = this.cus.getCurrentUser()
    this.dss.getTaskDetails(this.reqObj).subscribe(res =>{
  const response: any = res;
     if (response.status === 'ok') {
       console.log("Task response", response)
     this.taskDetails = response.task_list 
     this.taskLength = response.task_list.length
   }

 })
 }

// update this
  createTask(){
    let reqObj: any = {
      referral_id: this.referral_id,
      task_type: this.taskDetailForm.value.task_type,
      task_status: this.taskDetailForm.value.task_status,
      task_owner: this.taskDetailForm.value.task_owner,
      provider: this.taskDetailForm.value.provider,
      task_deadline: this.taskDetailForm.value.task_deadline,
      task_description: this.taskDetailForm.value.task_description, 
      additional_fields: this.taskDetailForm.value.task_treatment
    };
   this.dss.createTask(reqObj).subscribe(res => {
     let response:any = res;
     if(response.status == 'ok'){
       alert("Task created")
       this.getTask(this.referral_id);
       this.taskDetailForm.reset();   
     }
   }, err => {
     console.log("Error::"+err)
   })
  }

  editTask(data){
    this.editT = true;
    this.InputFormT = true;
    this.selectedTask = data;
    this.taskId = this.selectedTask.task_id;

  (<FormGroup>this.taskDetailForm)
    .patchValue({task_type: this.selectedTask.task_type}, {onlySelf: true});

  (<FormGroup>this.taskDetailForm)
    .patchValue({task_status: this.selectedTask.task_status}, {onlySelf: true});

  (<FormGroup>this.taskDetailForm)
    .patchValue({task_owner: this.selectedTask.task_owner}, {onlySelf: true});

  (<FormGroup>this.taskDetailForm)
    .patchValue({task_deadline: this.selectedTask.task_deadline}, {onlySelf: true});

  (<FormGroup>this.taskDetailForm)
    .patchValue({task_description: this.selectedTask.task_description}, {onlySelf: true});

 }
 updateTask(){
     let reqObj: any = {
      task_id: this.taskId,
      task_type: this.taskDetailForm.value.task_type,
      task_status: this.taskDetailForm.value.task_status,
      task_owner: this.taskDetailForm.value.task_owner,
      provider: this.taskDetailForm.value.provider,
      task_deadline: this.taskDetailForm.value.task_deadline,
      task_description: this.taskDetailForm.value.task_description, 
    };
    this.dss.updateTask(reqObj).subscribe(res => {
     let response:any = res;
     if(response.status == 'ok'){
       alert("Task Updated")
       this.getTask(this.referral_id)
       this.taskDetailForm.reset()
       this.editT = false; 
       //add call for input window to close
     }
   }, err => {
     console.log("Error::"+err)
   })
 }

  getCommunication(value){
    console.log("no value",value)
    if (value === undefined) {
      value = this.taskId
      console.log("What is my value",this.taskId)
    }
    this.replyMSG = false;
    this.taskId = value;
    this.msgPanel = true;
   console.log("looking for task_id",value)
  // this.reqObj.patient_id = this.patientId;
   this.reqObj.task_id = value
   this.reqObj.email = this.cus.getCurrentUser()
   this.dss.commList(this.reqObj).subscribe(res => {
      const response: any = res;
     if (response.status === 'ok') {
       console.log("Communcation response", response)
     this.messages = response.comm_data;
     console.log("message", this.messages) 
   }

 })
 }

//independent function to reload the data



 passMsgID(data){
   this.replyMSG = true;
   console.log("Message ID",data)
   this.replyID = data;

 }

 sendMessage(){

   if (this.replyID.length > 1) {
     console.log("message to SP")
     this.reqObj = {
         comm_message: this.messageForm.value.comm_message,
         comm_id: this.replyID,
         sender_id: this.cus.getCurrentUser(),
         };
         } else {
           console.log("message to Patient")
           this.reqObj = {
           task_id: this.taskId,
           sender_id: this.cus.getCurrentUser(),
           recipient_id: this.patientId,
           recipient_type: "patient", 
           comm_subject: "blank", 
           comm_message: this.messageForm.value.comm_message,
           };
   };
   console.log("What i'm messaging",this.reqObj)
   this.dss.sendMessage(this.reqObj).subscribe(res => {
    let response:any = res;
    if(response.status == 'ok'){
      alert("Message Sent")
      this.messageForm.reset()
      this.getCommunication(this.taskId);
      //add call for input window to close
    }
  }, err => {
    console.log("Error::"+err)
  })
 }

}

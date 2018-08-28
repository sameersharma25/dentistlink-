import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { CurrentUserService } from '../shared/services/current-user.service';
import { DataSourceService } from '../shared/services/data-source.service';
import {Email} from '../shared/model/common-model';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras} from '@angular/router';
import { PatientPageComponent } from '../patient-page/patient-page.component';




@Component({ 
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  patientAction: any = {}; 
  patientAptAction: any = {};
  selectedPatient: any = {};
  selectedPatientId: string ='';
  selectedProvider: string;
  selectedAppointmentId: string ='';
  dateOfBirth: any = {};
  dateOfAppointment: any = {};
  patientList: any = [];
  panelState: Boolean = true;
  patientEditForm: FormGroup;
  patientDetailsEditForm: FormGroup;
  patientAppointmentForm: FormGroup;

  referralDetailForm: FormGroup
  taskDetailForm: FormGroup
  taskDetails: any = [];
  referralDetail: any = [];
  selectedTask: any = [];
  selectedReferral: any = [];
  referral_id: string;
  taskId: string;
  editT:Boolean = false;
  editR:Boolean = false;
  InputFormR: Boolean = false;
  InputFormT: Boolean = false;

  isCollapsed: Boolean = false;
  isCollapsed1: Boolean = false;
  isOpen: Boolean = false;
  reqObj:any ={};
  appointmentList: any[];
  patientDetails:any = {};
  patientId: number;
  selectedAppointment: any;
  serviceProvider: any = [];
  hasOtherOptions: boolean = false;
  lat: number = 47.622537
  lng: number = -122.333854
  numLimit = 2;
  searchFlag = false;
  searchPat = '';
  // PROvider form
  searchDetails: FormGroup;
  formZipcode: string ="&zip="
  formRadius: string ="&radius="
  formAge: string ="&age="
  formTreatment: string = "&treatment="
  radiusOp: any[];
  ageOp: any[];
  treatmentOp: any[];
  backitup: any = []; 
  array1: any =[];
  mapArray: any =[];
  sourceType: any =[];
  taskType: any =[];
  urgencyType: any =[];
  taskPanel:Boolean = false;
  startA: number = 0;
  finishA: number = 25;
  appointmentFields: Boolean = false;
  messageForm: FormGroup;
  messages: any = [];


  constructor(
    private router: Router,
    private cus: CurrentUserService,
    private dss: DataSourceService,
    private fb: FormBuilder,
    public ppc: PatientPageComponent
  ) { 
    this.radiusOp=[10,20,30,40,50]; 
    this.ageOp = ["5 or less", "Between 6-20", "Above 20"];
    this.treatmentOp=["Cleaning","Pain","Extraction","Orthodontics","Dentures"];
    this.sourceType =["EHR", "EDR", "ExtCC","Internal", "Self"]
    this.taskType = ["Appointment","Support","UserDefined","Delegated Referral"]
    this.urgencyType = ["Critical" ,"High", "Moderate", "Low"]
  }





  ngOnInit() {
    this.patientAction.label = "";
    this.patientAptAction.label = "";
    this.patientAction.isOpened = false;
    this.patientAction.collapsed = false;
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

    this.getAllPatients();
    this.createForm();
    


  }



  createForm(){
    this.patientEditForm = this.fb.group({
      notes: ['']
    });

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
    });

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
        others: false
      }),
      otherOptions: [''],
      notes: [''],
      serviceProvider: [''],
    });

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
    this.searchDetails = this.fb.group({
      zipcode: [''],
      radius: [''],
      age: [''],
      treatment: ['']
    })
    this.messageForm = this.fb.group({
       task_id: [''],
       sender_id: [''],
       recipient_id: [''],
       recipient_type: [''],
       comm_subject: [''],
       comm_message: [''],

     })
  };


   getData(value){

     const navigationExtras: NavigationExtras = {
       queryParams: {
         'patient_id': value.patient_id
       }
     };
     this.router.navigate(['/patient-page'], navigationExtras);
  }

    createData(){
     this.router.navigate(['/patient-page']);
  }

  saveProvider(value){
    this.isCollapsed1=false;

    (<FormGroup>this.taskDetailForm)
    .patchValue({provider: value}, {onlySelf: true});

    this.taskDetailForm.value.provider = value;

    //this.setProvider(value);
  };


  createAppointmentForm() {
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
      }),
      otherOptions: [''],
      patientCoverage: [''],
      patientCoverageId: [''],
      notes: [''],
      serviceProvider: [''],
    });
  }

  getAllPatients(searchKey?: string){
    let currentUserMail: Email;
    currentUserMail = this.cus.getCurrentUser();
    this.reqObj.email = currentUserMail;
    if(searchKey){
      this.reqObj.search = searchKey;
    } else {
      this.reqObj.search = "";
    }
    this.dss.getAllPatientList(this.reqObj).subscribe(res =>{
      const response:any = res;
      if(response.status == 'ok'){
        this.patientList = response.patients_details;
        //this.appointmentList = this.getAppointmentList(this.response);
      }
    }, err =>{
      console.log(err);
    });
  };

  // right panel action for patient
  openPatientAction(data) {

    this.getCommunication(data.patient_id);
    this.getReferral(data.patient_id);
    this.patientAction.isOpened = false;
    this.patientAction.collapsed = false;
    if (data) {
      this.patientAction.label = 'Edit';
      this.selectedPatient = data;
      this.selectedPatientId = data.patient_id;
      this.getPatientsDetails(data);

      this.getAppointments(data);
      //this.isAppointmentEdit = true;

    } else {
      this.patientAction.label = 'Create';
      this.createForm();
      this.reset();

    }
    this.patientAction.collapsed = true;

     //this.isCollapsed1=false;
     this.setProvider(data);
  }

  // open appoint form for patient
  openPatientAppointment(status,data){

    this.selectedAppointment = data;
    this.patientAction.isOpened = true;


    if(status === 'new'){
      
      this.createForm();
      this.patientAptAction.label = "new";
      this.isCollapsed1 = false;
        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({firstName: this.patientDetails.first_name}, {onlySelf: true});
          (<FormGroup>this.patientDetailsEditForm)
          .patchValue({lastName: this.patientDetails.last_name}, {onlySelf: true});
        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({phoneNumber: this.patientDetails.ph_number}, {onlySelf: true});
        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({email: this.patientDetails.patient_email}, {onlySelf: true});
        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({patientCoverage: this.patientDetails.healthcare_coverage}, {onlySelf: true});

        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({patientCoverageId: this.patientDetails.patient_coverage_id}, {onlySelf: true});
            const dateObj: any = this.getDateObject(this.patientDetails.date_of_birth);

         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({day: dateObj.day}, {onlySelf: true});
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({month: dateObj.month}, {onlySelf: true});
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({year: dateObj.year}, {onlySelf: true});
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({preferredContact: this.patientDetails.mode_of_contact}, {onlySelf: true});
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({zipCode: this.patientDetails.patient_zipcode}, {onlySelf: true});
         //const zipParam = this.patientDetails.patient_zipcode
          //this.getProvider(zipParam,[ dateObj.day, dateObj.month, dateObj.year ] );
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({ethnicity: this.patientDetails.ethnicity}, {onlySelf: true});
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({gender: this.patientDetails.gender}, {onlySelf: true});
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({patientAddress: this.patientDetails.patient_address}, {onlySelf: true});

    } else if(status === 'edit'){
      this.selectedAppointmentId = data.appointment_id;
      this.createAppointmentForm();
      let dateObj: any = this.getDateObject(this.selectedAppointment.date_of_appointment);
      this.patientAptAction.label = "edit";
      (<FormGroup>this.patientAppointmentForm)
      .patchValue({day: dateObj.day}, {onlySelf: true});
      (<FormGroup>this.patientAppointmentForm)
          .patchValue({month: dateObj.month}, {onlySelf: true});
      (<FormGroup>this.patientAppointmentForm)
          .patchValue({year: dateObj.year}, {onlySelf: true});
      this.setVisitReason(this.selectedAppointment.rov);
      // (<FormGroup>this.patientAppointmentForm)
      //     .patchValue({reasonForVisit: this.selectedAppointment.rov}, {onlySelf: true});
      (<FormGroup>this.patientAppointmentForm)
          .patchValue({reasonForVisit: this.selectedAppointment.rov}, {onlySelf: true});
      this.setProvider(this.selectedAppointment.sp_id);
      (<FormGroup>this.patientAppointmentForm)
        .patchValue({notes: this.selectedAppointment.note}, {onlySelf: true});
    }
  }

  setProvider(sp_id) {
    for(let sp in this.serviceProvider) {
      if (sp_id == this.serviceProvider[sp].Id) {
        (<FormGroup>this.patientAppointmentForm)
          .patchValue({serviceProvider: this.serviceProvider[sp].Id}, {onlySelf: true});

         this.selectedProvider = this.serviceProvider[sp].Name
         //this.lat = this.serviceProvider[sp].Geolocation__c.latitude
         //this.lng = this.serviceProvider[sp].Geolocation__c.longitude
       }
    }
  }

  getPatientsDetails(data: any) {
    this.taskPanel = false;
    this.patientId = data.patient_id;
    this.reqObj.email = this.cus.getCurrentUser();
    this.reqObj.patient_id = this.patientId;
    this.dss.getPatientsDetails(this.reqObj).subscribe(res => {
      const response: any = res;
      console.log("patient Detail",res);
       if (response.status === 'ok') {
        this.patientDetails = response.patients_details;
        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({firstName: this.patientDetails.first_name}, {onlySelf: true});
        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({lastName: this.patientDetails.last_name}, {onlySelf: true});

        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({phoneNumber: this.patientDetails.ph_number}, {onlySelf: true});

        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({email: this.patientDetails.patient_email}, {onlySelf: true});
//Add Patient Coverage
        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({patientCoverage: this.patientDetails.healthcare_coverage}, {onlySelf: true});

        (<FormGroup>this.patientDetailsEditForm)
          .patchValue({patientCoverageId: this.patientDetails.patient_coverage_id}, {onlySelf: true});

          this.lat = this.patientDetails.patient_lat
          this.lng = this.patientDetails.patient_lng


  const dateObj: any = this.getDateObject(this.patientDetails.date_of_birth);
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({day: dateObj.day}, {onlySelf: true});
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({month: dateObj.month}, {onlySelf: true});
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({year: dateObj.year}, {onlySelf: true});
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({preferredContact: this.patientDetails.mode_of_contact}, {onlySelf: true});
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({zipCode: this.patientDetails.patient_zipcode}, {onlySelf: true});
         //const zipParam = this.patientDetails.patient_zipcode
         // this.getProvider(zipParam,[ dateObj.day, dateObj.month, dateObj.year ] );
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({ethnicity: this.patientDetails.ethnicity}, {onlySelf: true});
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({gender: this.patientDetails.gender}, {onlySelf: true});
         (<FormGroup>this.patientDetailsEditForm)
           .patchValue({patientAddress: this.patientDetails.patient_address}, {onlySelf: true});
          
           //fill practice search parameters
         (<FormGroup>this.searchDetails)
          .patchValue({zipcode: this.patientDetails.patient_zipcode}, {onlySelf: true});
          this.formZipcode = this.formZipcode + this.patientDetails.patient_zipcode;
          //this.urlBuilder(this.formZipcode,this.patientDetails.age);
          this.urlBuilder(this.formZipcode);
      }
    }, err => {
      console.log(err);

    });
  }

  urlBuilder(zip){
   var initialURL = ""
   initialURL = initialURL + this.formZipcode 
   this.formRadius = this.formRadius + "10"
   initialURL = initialURL + this.formRadius
   
  // if (age <= 5) {
  //   initialURL = initialURL+ this.formAge+'5_or_less'
  // } else if (age >= 20){ 
  //   initialURL = initialURL+this.formAge+'Above_20'}
  // else {
  //     initialURL = initialURL+this.formAge+'between_6-20'
  // }
   console.log("URL",initialURL)
   this.searchZipcode(initialURL)
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

  //
  searchZipcode(value){
    this.reqObj.email = this.cus.getCurrentUser();
    this.dss.searchZip(this.reqObj,value).subscribe(res => {
      this.serviceProvider = res;
      console.log("am i getting a response",this.serviceProvider)
      this.array1 = this.serviceProvider.slice(0,20)
      this.mapArray = this.serviceProvider.slice(0,20)
      console.log("maparray", this.mapArray)
      this.formZipcode = "&zip="
      console.log("can I get a length",this.serviceProvider.length)
      if(this.serviceProvider.length === 0){
        alert("There are no practices in this zipcode")
      }
    })
  }


  next(data){
    this.backitup = this.serviceProvider

    if (data == "up"){
      this.startA = this.startA+25
      this.finishA = this.finishA+25
      this.array1 = this.backitup.slice(this.startA,this.finishA)
    } else if (data == "down"){
      this.startA = this.startA-25
      this.finishA = this.finishA-25
      this.array1 = this.backitup.slice(this.startA,this.finishA)
    } else {
      this.array1 = this.backitup.slice(this.startA,this.finishA)
    }
    console.log("nextup",this.array1)
  }



  // Pulls providers from AWS LAMDA
//  getProvider(zip, dob) {
//    this.reqObj.zip = zip
//     this.dss.getProvider(this.reqObj, zip, dob).subscribe(res => {
//       console.log("??Checkres",res);
//       this.serviceProvider = res;
//       //TEMPORARY SOLUTION FOR BAD ZIPCODE
//       if (this.serviceProvider.length != 10) {
//       console.log("SHOULD SHOW TEN", this.serviceProvider.length)
//       this.serviceProvider = null
//       alert("There are no service providers here yet.")
//      }
//       //if res.ErrorType
//    }, err => {
//      console.log(err);
//      console.log("Every CLick");
//
//    });
//}

  patientAppointment(appointmentData) {
    if(this.patientAptAction.label == 'new'){
      let reqObj: any = {
        email: this.cus.getCurrentUser(),
        patient_id: this.patientId,
        date_of_appointment: this.getDate(this.patientAppointmentForm.value),
        reason_for_visit: this.getVisitReason(this.patientAppointmentForm.value.reasonForVisit),
        note: this.patientAppointmentForm.value.notes
      };
      this.dss.createPatientAppoint(reqObj).subscribe(res => {
        let response:any = res;
        if(response.status == 'ok'){
          this.getAllPatients()
          alert(response.message);
          this.createForm();
          this.patientAction.collapsed = false;
          this.isCollapsed1 = false;

        }
      }, err => {
        console.log("Error in fetching data from server::" + err);
      })
    }else if(this.patientAptAction.label == 'edit'){
      let patientName = this.selectedAppointment.patient_name.split(' ');
      let reqObj: any = {
        email: this.cus.getCurrentUser(),
        reason_for_visit: this.getVisitReason(this.patientAppointmentForm.value.reasonForVisit),
        appointment_id: this.selectedAppointment.appointment_id,
        date_of_appointment: this.getDate(this.patientAppointmentForm.value),
        first_name: patientName[0],
        last_name: patientName[1],
        patient_phone: this.selectedPatient.ph_number,
        dob: this.selectedAppointment.patient_dob,
        sp_id: this.patientAppointmentForm.value.serviceProvider,
        note: this.patientAppointmentForm.value.notes
      };

      this.dss.updateAppointment(reqObj).subscribe(res => {
        let response:any = res;
        if(response.status == 'ok'){
          this.getAllPatients()
          alert(response.message);
          this.patientAction.collapsed = false;
          this.isCollapsed1 = false;
        }
      }, err => {
        console.log("Error in fetching data from server::" + err)
      });
    }
  }

  setOthers(){
    this.hasOtherOptions? this.hasOtherOptions = false : this.hasOtherOptions = true;
  }

  // create & update patient info
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

// added Patient
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
          this.getAllPatients()
          alert(response.message);
          this.patientAction.collapsed = false;
          this.isCollapsed1 = false;

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
          this.getAllPatients()
          alert(response.message);
          this.patientAction.collapsed = false;
          this.isCollapsed1 = false;

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


    return patientObj;
  }


  getAppointments(patient){
    this.reqObj = {};
    this.reqObj.patient_id = patient.patient_id;
    this.reqObj.email = this.cus.getCurrentUser();
    this.dss.getPatientsAppointments(this.reqObj).subscribe(res => {
      const response: any = res;
      if (response.status === 'ok') {
        this.appointmentList = response.details_array;
      }
    }, err => {
      console.log(err);
    });
  }

  // date format
  getDate(value){
    if(!value.day && !value.month && !value.year)
      return false;
    let tempDate: string ='';
    tempDate = `${value.year}-${value.month}-${value.day}`;
    return new Date(tempDate);
  }
  // get day,month & year by date format
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

  getVisitReason(visitObj){
    let visits: any = [];
    for(let visitName in visitObj){
      if(visitObj[visitName] === true){
        if(visitName == 'others'){
          visits.push(this.patientAppointmentForm.value.otherOptions);
        }else{
          visits.push(visitName);
        }
      }
    }
    return visits;
  }

  setVisitReason(rov){
    const visits: any = ['cleaning','surgery','pain','dentures','infection','damage'];
    for(let i of rov){
      if(visits.includes(i)){
        this.hasOtherOptions = false;
        this.patientAppointmentForm.controls['reasonForVisit'].get(i).setValue(true);
      }else{
        this.patientAppointmentForm.controls['reasonForVisit'].get('others').setValue(true);
        this.hasOtherOptions = true;
        (<FormGroup>this.patientAppointmentForm)
          .patchValue({otherOptions: i}, {onlySelf: true});
      }
    }

  }
// REFERRALS AND TASK

editReferral(data){
  this.InputFormR = true;
  this.editR = true;
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
        this.getReferral(this.patientId);
        //add call for input window to close
      }
    }, err => {
      console.log("Error::"+err)
    })
}


 getReferral(data){
   console.log("patientID PLEASE", data)
   this.reqObj.email = this.cus.getCurrentUser()
   this.reqObj.patient_id = data
   this.dss.getReferral(this.reqObj).subscribe(res => {
      const response: any = res;
     if (response.status === 'ok') {
       console.log("Referral response", response)
     this.referralDetail = response.referral_list 
 
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
        this.getReferral(this.patientId);
      }
    }, err => {
      console.log("Error::"+err)
    })
  }

  getTask(value){
    this.taskPanel = true;
    this.InputFormT = true;
    this.referralDetailForm.reset();
    this.taskDetailForm.reset();

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
    };
   //UPDATE THIS TO THE CORRECT API
   this.dss.createTask(reqObj).subscribe(res => {
     let response:any = res;
     if(response.status == 'ok'){
       alert("Task created")
       this.getTask(this.referral_id);
       this.taskDetailForm.reset();   
       //add call for input window to close
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
    .patchValue({provider: this.selectedTask.provider}, {onlySelf: true});

  (<FormGroup>this.taskDetailForm)
    .patchValue({task_owner: this.cus.getCurrentUser()}, {onlySelf: true});

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

 sendMessage(value){
   console.log(value)
   console.log("messge Task_ID",this.taskId)
   console.log("Patient ID present?", this.patientId)
   let recpType: number;
   if (value == "toPat"){
     recpType = this.patientId
   } else {
     recpType = value
   }
   console.log("passing value", recpType)
   let reqObj: any = {
     task_id: this.taskId,
     sender_id: this.cus.getCurrentUser(),
     recipient_id: recpType,
     recipient_type: "patient", 
     comm_subject: "blank", 
     comm_message: this.messageForm.value.comm_message
    };
    this.dss.sendMessage(reqObj).subscribe(res => {
     let response:any = res;
     if(response.status == 'ok'){
       //alert("Message Sent")
       this.messageForm.reset()
       //add call for input window to close
     }
   }, err => {
     console.log("Error::"+err)
   })
 }

  getCommunication(data){
    console.log("Patient ID",data)
   this.reqObj.patient_id = data
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


 //





  // reset data
  reset():void{
    this.appointmentList = [];
    this.selectedPatient = {};
    this.selectedAppointment = {};
  }

  searchPatients(value) {
    this.searchFlag = true;
    this.getAllPatients(value);
  }


  clearSearch() {
    this.searchPat ='';
    this.searchFlag = false;
    this.getAllPatients();
  }
}

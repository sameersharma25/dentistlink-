import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray} from '@angular/forms';
//import { FormsModule } from '@angular/forms';
import { DataSourceService } from '../shared/services/data-source.service';
import { CurrentUserService } from '../shared/services/current-user.service';
import { DataCommService } from '../shared/services/data-comm.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})

export class AppointmentComponent implements OnInit {
  appointmentList: any[];
  userAction = {};
  currentUserInfo:any;
  reqObj:any ={};
  response: any = {};
  appointmentAction: string = '';
  appointmentEditForm: FormGroup;
  dateOfBirth: any ={};
  isCollapsed: Boolean = false;
  appointments: any = {};
  isAppointmentEdit: Boolean = false;
  hasOtherOptions: boolean = false;

  constructor(
    private ds: DataSourceService,
    private cus: CurrentUserService,
    private dcs: DataCommService,
    private router: Router,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    // this.cus.isAuthenticated.subscribe(res =>{
    //   this.currentUserInfo = this.cus.getCurrentUser();
    //   console.log(this.currentUserInfo);
    // });
    this.appointments.label = "";
    this.appointments.collapsed = false;
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
    this.dateOfBirth.days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    this.dateOfBirth.years = [1985,1986,1987,1998,1999,2000];
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
    this.createForm();
    this.getAppointments();
  }
  createForm(){
    this.appointmentEditForm = this.fb.group({
      firstName:[''],
      lastName:[''],
      phoneNumber:[''],
      patientEmail:[''],
      month: [''],
      day: [''],
      year: [''],
      preferredContact: [''],
      zipCode: [''],
      ethnicity: [''],
      gender: [''],
      patientAddress: [''],
      aptMonth: [''],
      aptDay: [''],
      aptYear: [''],
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
      serviceProvider: [''],
      patientCoverage: [''],
      patientCoverageId: [''],
      notes: [''],
    })
  };
  getAppointments(){
    this.reqObj.email = this.cus.getCurrentUser();
    this.ds.getAppointments(this.reqObj).subscribe(res =>{
      this.response = res;
      if(this.response.status == 'ok'){
        this.appointmentList = this.response.details_array;
        console.log(this.appointmentList);
        //this.appointmentList = this.getAppointmentList(this.response);
      }
    }, err =>{
      console.log(err);
    });
  };

  getAppointmentList(response){
    if((response.appointments.length || response.details_array.length) && (response.appointments.length == response.details_array.length)){
      var apl:any[] =[];
      apl = response.appointments;
      for(let i =0; i<response.details_array.length;++i){
        var pi:any = {};
        pi.patient_name = response.details_array[i]['patient_name'];
        pi.patient_dob= response.details_array[i]['patient_dob'];
        apl[i]['patientInfo'] = pi;
      }
      return apl;
    }else{
      return [];
    }
  };


  checkModelValue(event){
    this.appointmentAction = event.currentTarget.value;
    this.dcs.setAppointmentAction(this.appointmentAction);
    if(this.appointmentAction === 'Edit'){
      this.router.navigate(['/create-appointment']);
    }
  }

  openAppointmentAction(data) {
    if (data) {
      this.appointments.label = 'Edit';
      this.createForm();
      this.getAppointmentDetails(data);
      console.log(data);
      this.isAppointmentEdit = true;
    } else {
      this.appointments.label = 'Create';
      this.isAppointmentEdit = false;
      this.createForm();
    }
    this.appointments.collapsed = true;
  }
  editAppointment() {
    this.appointments.label = 'Edit';
    if (this.isAppointmentEdit) {
      this.reqObj.email = this.cus.getCurrentUser();
       this.reqObj.first_name =  this.appointmentEditForm.value.firstName;
        this.ds.updateAppointment(this.reqObj).subscribe(res => {
          this.response = res;
          if (this.response.status === 'ok') {
            alert("appointment updated successfully.");
          }
        });
    } else {
      const appointFormData: any = this.appointmentEditForm.value;
      this.reqObj = {
        email: this.cus.getCurrentUser(),
        first_name: appointFormData.firstName,
        last_name: appointFormData.lastName,
        patient_phone: appointFormData.phoneNumber,
        reason_for_visit: this.getVisitList(appointFormData.reasonForVisit),
        patient_coverage: appointFormData.patientCoverage
      };
      this.ds.create(this.reqObj).subscribe((response)=>{
        let res:any = response;
        console.log(res)
        if(res.status == 'ok'){
          this.getAppointments();
          alert("Appointment Created Successfully.");
        }
      }, (err)=>{
        console.log("Error in fetching data from server::" + err)
      })
    }
    this.appointments.collapsed = false;
  }
  getVisitList(visitData){
    var visits: string ='';
    for(let vd in visitData){
      if(visitData[vd]){
        visits += vd + ',';
      }
    }
    return visits = visits.slice(0, visits.length-1);
  }

  createAppointment() {

  }

  getAppointmentDetails(data: any) {
    this.reqObj.email = this.cus.getCurrentUser();
    this.reqObj.appointment_id = data.appointment_id;
    this.ds.getAppointmentDetails(this.reqObj).subscribe(res => {
      this.response = res;
      console.log(res);
      if (this.response.status === 'ok') {
        const apptDetails = this.response.appointment_hash;
        (<FormGroup>this.appointmentEditForm)
          .patchValue({firstName: apptDetails.first_name}, {onlySelf: true});
        (<FormGroup>this.appointmentEditForm)
          .patchValue({lastName: apptDetails.last_name}, {onlySelf: true});
        (<FormGroup>this.appointmentEditForm)
          .patchValue({phoneNumber: apptDetails.patient_phone_number}, {onlySelf: true});
        (<FormGroup>this.appointmentEditForm)
          .patchValue({patientEmail: apptDetails.patient_email}, {onlySelf: true});
        (<FormGroup>this.appointmentEditForm)
          .patchValue({preferredContact: apptDetails.mode_of_contact}, {onlySelf: true});
        this.setVisitReason(apptDetails.reason_for_visit);

        let dateObj: any = this.getDateObject(apptDetails.appointment_date);

        (<FormGroup>this.appointmentEditForm)
          .patchValue({aptDay: dateObj.day}, {onlySelf: true});
        (<FormGroup>this.appointmentEditForm)
          .patchValue({aptMonth: dateObj.month}, {onlySelf: true});
        (<FormGroup>this.appointmentEditForm)
          .patchValue({aptYear: dateObj.year}, {onlySelf: true});


        (<FormGroup>this.appointmentEditForm)
          .patchValue({zipCode: apptDetails.patient_zipcode}, {onlySelf: true});
        const zipParam = apptDetails.patient_zipcode
        //this.getProvider(zipParam,[ dateObj.day, dateObj.month, dateObj.year ] );
        (<FormGroup>this.appointmentEditForm)
          .patchValue({ethnicity: apptDetails.ethnicity}, {onlySelf: true});
        (<FormGroup>this.appointmentEditForm)
          .patchValue({gender: apptDetails.gender}, {onlySelf: true});
        (<FormGroup>this.appointmentEditForm)
          .patchValue({patientAddress: apptDetails.patient_address}, {onlySelf: true});



        console.log(this.appointmentEditForm.value);
      }
    }, err => {
      console.log(err);
    });
  }


  setOthers(){
    this.hasOtherOptions? this.hasOtherOptions = false : this.hasOtherOptions = true;
  }


  setVisitReason(rov){
    const visits: any = ['cleaning','surgery','pain','dentures','infection','damage'];
    for(let i of rov){
      if(visits.includes(i)){
        this.hasOtherOptions = false;
        this.appointmentEditForm.controls['reasonForVisit'].get(i).setValue(true);
      }else{
        this.appointmentEditForm.controls['reasonForVisit'].get('others').setValue(true);
        this.hasOtherOptions = true;
        (<FormGroup>this.appointmentEditForm)
          .patchValue({otherOptions: i}, {onlySelf: true});
      }
    }

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




}

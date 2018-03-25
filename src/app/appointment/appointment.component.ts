import { Component, OnInit } from '@angular/core';
//import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  appointmentList: any[];
  userAction = {};

  constructor() {
    this.appointmentList = [1,2,3,4];
   }

  ngOnInit() {
  }

}

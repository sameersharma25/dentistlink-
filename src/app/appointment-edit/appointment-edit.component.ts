import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})
export class AppointmentEditComponent implements OnInit {

  public coverageType: string[] = [];
  appointmentEditForm: FormGroup;

  constructor() {
    this.coverageType = ['Aenta','Cigna','Blue Cross','No Insurance'];
  }

  ngOnInit() {
  }

}

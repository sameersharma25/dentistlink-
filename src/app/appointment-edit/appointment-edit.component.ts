import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})
export class AppointmentEditComponent implements OnInit {

  public coverageType: string[] = [];

  constructor() { 
    this.coverageType = ['Aenta','Cigna','Blue Cross','No Insurance'];
  }

  ngOnInit() {
  }

}

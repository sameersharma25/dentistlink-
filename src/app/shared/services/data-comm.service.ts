import { Injectable } from '@angular/core';

@Injectable()
export class DataCommService {
  private appointmentAction: string;
  constructor() { }

  setAppointmentAction(action){
    this.appointmentAction = action;
  };

  getAppointmentAction(){
    return this.appointmentAction;
  };

}

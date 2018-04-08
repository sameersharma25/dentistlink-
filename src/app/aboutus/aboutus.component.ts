import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../shared/services/current-user.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  public isAuthUser:boolean = false;
  constructor(private cus: CurrentUserService) { }

  ngOnInit() {
    if(this.cus.populate()){
      this.isAuthUser = this.cus.populate();
    }
  }

}

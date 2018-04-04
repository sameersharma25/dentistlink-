import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from './shared/services/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  isValid:boolean = false;
  constructor(private cus: CurrentUserService){}
  ngOnInit(){
    //this.checkSession();
  }
  checkSession(){
    if(this.cus.populate()){
      this.isValid = this.cus.populate();
      alert("valid session")
    }else{
      this.isValid = this.cus.populate();
      alert("invalid session")
    }
  }
}

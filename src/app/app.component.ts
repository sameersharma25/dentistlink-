/**
 * Author: @om prakash
 */
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { CurrentUserService } from './shared/services/current-user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  isValid: boolean = false;
  path: string;
  constructor(private cus: CurrentUserService, private router: Router){}
  ngOnInit(){
    this.checkSession();
  }
  checkSession(){
    if(this.cus.populate()){
      this.isValid = this.cus.populate();
      this.path = this.cus.getRedirectUrl();
      this.router.navigate([this.path]);
      console.log("valid session")
    }else{
      this.isValid = this.cus.populate();
      this.router.navigate(['']);
      console.log("Invalid session");
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../services/current-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss']
})
export class HomeNavbarComponent implements OnInit {
  loggedUserInfo:any;
  constructor(private cs: CurrentUserService, private router:Router) { }

  ngOnInit() {
    this.loggedUserInfo = this.cs.getCurrentUser();
  }

  // logout
  logout(){
    this.cs.purgeAuth();
    this.router.navigate(['/login']);
  };
}


interface userInfo{
  name:string,
  email: string
}
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: any[];
  constructor() { 
    this.users = [{uName:'user1',type:'PCP'},{uName:'user2',type:'CC'}];
  }

  ngOnInit() {
  }

}

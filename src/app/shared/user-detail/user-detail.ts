import { Component } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  imports: [],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})

export class UserDetail {

  userDetail: any = {};


  constructor() {
    this.userDetails();
  }

  userDetails() {
    const counsellor = JSON.parse(
      sessionStorage.getItem('counsellor') || '{}'
    );
    this.userDetail = counsellor;
  }

}

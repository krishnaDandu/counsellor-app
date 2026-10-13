import { Component } from '@angular/core';
import { UserDetail } from '../user-detail/user-detail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-panel',
  standalone: true,
  imports: [UserDetail],
  templateUrl: './header-panel.html',
  styleUrl: './header-panel.scss',
})
export class HeaderPanel {

  userDetail: any = {};
  constructor(private router: Router) {
    this.userDetails();
  }

  logout() {
    sessionStorage.removeItem('counsellor');
    localStorage.removeItem('isLoggedIn');

    this.router.navigate(['/login']);
  }

  userDetails() {
    const counsellor = JSON.parse(
      sessionStorage.getItem('counsellor') || '{}'
    );
    this.userDetail = counsellor;
  }
}

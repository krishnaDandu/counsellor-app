import { Component, OnInit, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EnquiryAddComponent } from '../enquiry-add/enquiry-add';
import { EnquiryListComponent } from '../enquiry-list/enquiry-list';
import { HeaderPanel } from '../../shared/header-panel/header-panel';
import { commonApiService } from '../../services/commonApiService';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, EnquiryListComponent, HeaderPanel],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {

  dashboard: any = {};

  userDetail: any = {};

  ngOnInit() {
    this.getDashboardChartData();
  }

  enquiryAddComponent = viewChild(EnquiryAddComponent);

  constructor(private router: Router, private commonApiService: commonApiService) { }

  logout() {

    sessionStorage.removeItem('counsellor');
    localStorage.removeItem('isLoggedIn');

    this.router.navigate(['/login']);

  }

  getDashboardChartData() {
    this.commonApiService.getApi<any>('enquiries/dashboardChart').subscribe({
      next: (res) => {
        if (res) {
          this.dashboard = res;
          console.log('Dashboard data:', this.dashboard);
        }
      },
      error: (err) => {
        console.error('Error fetching dashboard data:', err);
      }
    });
  }

  addEnquiry() {
    // Load the enquiry form
    this.router.navigate(['/enquiries/add']);
  }

}
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-enquiry-list',
//   imports: [],
//   templateUrl: './enquiry-list.html',
//   styleUrl: './enquiry-list.scss',
// })
// export class EnquiryList {

// }


import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { commonApiService } from '../../services/commonApiService';

@Component({
  selector: 'app-enquiry-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enquiry-list.html',
  styleUrl: './enquiry-list.scss'
})
export class EnquiryListComponent implements OnInit {

  enquiries: any[] = [];
  message: string = '';

  // enquiries = [
  //   {
  //     enqId: 1,
  //     stuName: 'Ravi Kumar',
  //     stuPhno: '9876543210',
  //     courseName: 'Java Full Stack',
  //     classMode: 'ONLINE',
  //     enqStatus: 'NEW'
  //   },
  //   {
  //     enqId: 2,
  //     stuName: 'Suresh Kumar',
  //     stuPhno: '9123456789',
  //     courseName: 'Angular',
  //     classMode: 'OFFLINE',
  //     enqStatus: 'ENROLLED'
  //   },
  //   {
  //     enqId: 3,
  //     stuName: 'Anil Kumar',
  //     stuPhno: '9988776655',
  //     courseName: 'Python Full Stack',
  //     classMode: 'ONLINE',
  //     enqStatus: 'LOST'
  //   }
  // ];

  constructor(private router: Router, private commonApiService: commonApiService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.getEnquiries();
  }

  getEnquiries() {
    const counsellor = JSON.parse(
      sessionStorage.getItem('counsellor') || '{}'
    );

    //? counsellorId = 13
    this.commonApiService.getApi('enquiries/getAllEnquiries', { counsellorId: counsellor.counsellorId }).subscribe({
      next: (response: any) => {
        console.log('Enquiries Response:', response);
        this.enquiries = response.data;
        this.message = response.message;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching enquiries:', error);
      }
    });
  }

  editEnquiry(id: number) {

    this.router.navigate(['/enquiries/edit', id]);

  }

  addEnquiry() {

    this.router.navigate(['/enquiries/add']);

  }

  searchEnquiries() {
    const counsellor = JSON.parse(
      sessionStorage.getItem('counsellor') || '{}'
    );
  }

}
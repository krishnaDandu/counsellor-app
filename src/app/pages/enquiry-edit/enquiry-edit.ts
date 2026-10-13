// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-enquiry-edit',
//   imports: [],
//   templateUrl: './enquiry-edit.html',
//   styleUrl: './enquiry-edit.scss',
// })
// export class EnquiryEdit {

// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-enquiry-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './enquiry-edit.html',
  styleUrl: './enquiry-edit.scss'
})
export class EnquiryEditComponent {

  enquiryId!: number;

  enquiry = {
    stuName: 'Ravi Kumar',
    stuPhno: '9876543210',
    classMode: 'ONLINE',
    enqStatus: 'NEW',
    courseId: 1
  };

  courses = [
    {
      courseId: 1,
      courseName: 'Java Full Stack'
    },
    {
      courseId: 2,
      courseName: 'Angular'
    },
    {
      courseId: 3,
      courseName: 'Python Full Stack'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {

    this.enquiryId =
      Number(this.route.snapshot.paramMap.get('id'));

    console.log('Editing Enquiry:', this.enquiryId);

  }

  updateEnquiry() {

    console.log(
      'Updated Enquiry:',
      this.enquiry
    );

    alert('Enquiry updated successfully');

    this.goToEnquiries();

   // this.router.navigate(['/enquiries']);

  }

  goToEnquiries() {
    this.router.navigate(['/enquiries']);
  }

}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderPanel } from '../../shared/header-panel/header-panel';
import { commonApiService } from '../../services/commonApiService';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-enquiry-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderPanel
  ],
  templateUrl: './enquiry-edit.html',
  styleUrl: './enquiry-edit.scss'
})
export class EnquiryEditComponent {

  enquiryId!: number;

  currentEnquiry = {
    stuName: '',
    stuPhno: '',
    classMode: '',
    enqStatus: '',
    courseId: null,
    enqId: null,
    createdAt: '',
    updatedAt: '',
    courseName: ''
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
    public router: Router,
    private commonApiService: commonApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {



    this.currentEnquiry = history.state.enquiry;
    console.log('Editing Enquiry:', this.currentEnquiry);
    // if (!thiscurrentEnquiry) {
    //   this.router.navigate(['/enquiries']);
    //   return;
    // }

  }

  updateEnquiry() {

    console.log('Updated Enquiry:', this.currentEnquiry);
    const reqPayload = {
      stuPhno: this.currentEnquiry.stuPhno,
      classMode: this.currentEnquiry.classMode,
      //stuName: this.currentEnquiry.stuName,
      // enqStatus: this.currentEnquiry.enqStatus,
      courseId: this.currentEnquiry.courseId
    }

    this.commonApiService.putAPI(`enquiries/updateenquiry/${this.currentEnquiry.enqId}`, reqPayload).subscribe({
      next: (response: any) => {
        this.snackBar.open(
          response.message || "Enquiry updated successfully",
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
      },
      error: (error) => {
        console.error('Error updating enquiry:', error);
      }

    });


    this.goToEnquiries();


  }

  goToEnquiries() {
    this.router.navigate(['/enquiries']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
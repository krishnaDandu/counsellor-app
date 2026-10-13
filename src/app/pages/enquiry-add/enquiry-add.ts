import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { commonApiService } from '../../services/commonApiService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderPanel } from '../../shared/header-panel/header-panel';

@Component({
  selector: 'app-enquiry-add',
  standalone: true,
  imports: [
    HeaderPanel,
    CommonModule,
    FormsModule
  ],

  templateUrl: './enquiry-add.html',
  styleUrl: './enquiry-add.scss'
})
export class EnquiryAddComponent implements OnInit, AfterViewInit {

  enquiry = {
    stuName: '',
    stuPhno: '',
    classMode: '',
    enqStatus: '',
    courseId: null
  };


  courses: any[] = [];

  constructor(private router: Router,
    private commonApiService: commonApiService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.getAllCourses();
  }

  saveEnquiry() {
    const counsellor = JSON.parse(
      sessionStorage.getItem('counsellor') || '{}'
    );
    if (counsellor) {
      const counsellorId = counsellor.counsellorId;

      console.log('Counsellor ID:', counsellorId);

      // Call your enquiry API here
      this.commonApiService.postAPI('enquiries/save', this.enquiry).subscribe({

        next: (response: any) => {
          this.snackBar.open(
            "Enquiry saved successfully" + response,
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
          // Navigate to the enquiry list page after successful save
          this.router.navigate(['/dashboard']);

        },
        error: (error) => {
          console.error('Error saving enquiry:', error);
        }

      });
    }

  };

  // Add handler method
  goToEnquiries() {
    this.router.navigate(['/dashboard']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  getAllCourses() {
    this.commonApiService.getApi('courses').subscribe({
      next: (response: any) => {
        console.log('Courses fetched successfully:', response);
        this.courses = response;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      }
    });
  }

}
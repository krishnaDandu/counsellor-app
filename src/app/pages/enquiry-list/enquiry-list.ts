
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { commonApiService } from '../../services/commonApiService';

@Component({
  selector: 'app-enquiry-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enquiry-list.html',
  styleUrl: './enquiry-list.scss'
})
export class EnquiryListComponent implements OnInit {

  enquiries: any[] = [];
  courses: any[] = [];
  message: string = '';

  filters = {
    stuName: '',
    stuPhno: '',
    courseId: null as number | null
  };

  constructor(
    private router: Router, private commonApiService: commonApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getCourses();
    this.getEnquiries();
  }

  // Get all enquiries for the logged-in counsellor
  getEnquiries(): void {
    const counsellor = JSON.parse(sessionStorage.getItem('counsellor') || '{}');

    this.commonApiService.getApi<any>('enquiries/getAllEnquiries', {
      counsellorId: counsellor.counsellorId
    })
      .subscribe({
        next: (response: any) => {
          this.enquiries = response.data ?? [];
          this.message = response.message ?? '';
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error fetching enquiries:', error);
        }
      });
  }

  // Load courses for the dropdown
  getCourses(): void {
    this.commonApiService
      .getApi<any>('courses')
      .subscribe({
        next: (response: any) => {
          this.courses = Array.isArray(response)
            ? response
            : response.data ?? [];

          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error fetching courses:', error);
        }
      });
  }

  // Search enquiries using the selected filters
  searchEnquiries() {
    const params: Record<string, string | number> = {};

    if (this.filters.stuName.trim()) {
      params['stuName'] = this.filters.stuName.trim();
    }

    if (this.filters.stuPhno.trim()) {
      params['stuPhno'] = this.filters.stuPhno.trim();
    }

    if (this.filters.courseId != null) {
      params['courseId'] = this.filters.courseId;
    }

    this.commonApiService.getApi<any>(
      'enquiries/search',
      params
    ).subscribe({
      next: (response) => {
        this.enquiries = response.data;
        this.message = response.message;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error searching enquiries:', error);
      }
    });
  }

  // Clear filters and reload enquiries
  resetFilters(): void {
    this.filters = {
      stuName: '',
      stuPhno: '',
      courseId: null
    };

    this.getEnquiries();
  }

  editEnquiry(id: number): void {
    this.router.navigate(['/enquiries/edit', id]);
  }

  addEnquiry(): void {
    this.router.navigate(['/enquiries/add']);
  }
}

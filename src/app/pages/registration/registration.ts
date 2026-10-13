import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { core } from '@angular/compiler';
import { commonApiService } from '../../services/commonApiService';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './registration.html',
  styleUrl: './registration.scss'
})
export class RegistrationComponent {

  message = '';

  counsellor = {
    name: '',
    email: '',
    phno: '',
    pwd: ''
  };

  constructor(private router: Router, private commonApiService: commonApiService,
    private snackBar: MatSnackBar,
    private http: HttpClient) { }


  register() {

    console.log('Registering counsellor:', this.counsellor);

    this.commonApiService
      .postTextAPI('counsellors/register', this.counsellor)
      .subscribe({

        next: (response: string) => {

          this.snackBar.open(
            response,
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );

          if (response !== 'Email already registered') {
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2500);
          }
        },

        error: (error) => {

          console.error('Registration failed:', error);

          this.snackBar.open(
            error.error?.message || 'Registration failed. Please try again.',
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            }
          );
        }
      });
  }
}








// this.http.post('http://localhost:8080/api/counsellors/register', this.counsellor, { responseType: 'text' })
//   .subscribe({
//     next: (response) => {
//       console.log('Registration successful: dirstc', response);
//     },
//     error: (error) => {
//       console.error('Registration failed:', error);
//     }
//   });
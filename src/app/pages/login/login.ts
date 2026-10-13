
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { commonApiService } from '../../services/commonApiService';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Counsellor {
  counsellorId: number;
  name: string;
  email: string;
  phno: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  loginData = {
    email: '',
    pwd: ''
  };

  loginError: string = '';
  //isLoading: boolean = false;
  isLoading = signal(false);

  constructor(private router: Router, private commonApiService: commonApiService,
    private snackBar: MatSnackBar,
  ) { }

  // login() {
  //   if (this.loginData.email && this.loginData.pwd) {
  //     this.isLoading = true;
  //     this.loginError = '';

  //     this.commonApiService.postAPI('counsellors/login', this.loginData).subscribe({
  //       next: (response) => {
  //         console.log('Login Response:', response);
  //         const counsellor = response;
  //         sessionStorage.setItem('counsellor', JSON.stringify(counsellor));
  //         this.snackBar.open(
  //           JSON.stringify(response),
  //           'Close',
  //           {
  //             duration: 3000,
  //             horizontalPosition: 'center',
  //             verticalPosition: 'top',
  //           }
  //         );

  //         // localStorage.setItem('isLoggedIn', 'true');
  //         this.isLoading = false;
  //         this.router.navigate(['/dashboard']);
  //       },
  //       error: (error) => {
  //         this.loginError = JSON.parse(error.error)?.message || 'Invalid email or password. Please try again.';
  //         this.isLoading = false;
  //       },
  //       complete: () => {
  //         this.isLoading = false;
  //       }
  //     });


  //   }

  // }

  login() {

    if (this.loginData.email && this.loginData.pwd) {

      this.isLoading.set(true);
      this.loginError = '';

      this.commonApiService
        .postAPI<Counsellor>('counsellors/login', this.loginData)
        .subscribe({

          next: (response) => {

            console.log('Login Response:', response);

            sessionStorage.setItem(
              'counsellor',
              JSON.stringify(response)
            );

            this.isLoading.set(false);
            this.router.navigate(['/dashboard']);
          },

          error: (error) => {
            console.log('Login Error:', error);
            this.loginError =
              error.error?.message ||
              'Invalid email or password. Please try again.';
            this.isLoading.set(false);
          }
        });
    }
  }
}
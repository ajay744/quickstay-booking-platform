import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupData = {
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'user' 
  };

  isSubmitting = false;

  constructor(
    private router: Router,
    private snackbar: SnackbarService,
    private apiService: ApiService,
    
  ) { }

  signup(): void {
    this.isSubmitting = true;

    this.apiService.post(environment.apiEndpoints.auth.register, this.signupData).pipe(
      tap(() => {
        this.snackbar.success('Signup successful!');
        this.router.navigate(['/owner/login']);
        this.isSubmitting = false;
      }),
      catchError(error => {
        console.error('Signup error:', error);
        this.snackbar.error('Signup failed. Please try again.');
        this.isSubmitting = false;
        return of(null);
      })
    ).subscribe();
  }

  goToLogin(): void {
    this.router.navigate(['/user/login']);
  }
}

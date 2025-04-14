import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { TokenService } from 'src/app/core/services/token.service';
import { environment } from 'src/environments/environment';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router,
    private tokenService: TokenService,
    private apiService: ApiService,
    private snackbar: SnackbarService,

  ) { }

  login(): void {
    this.apiService.get<any[]>(environment.apiEndpoints.auth.login).pipe(
      map(users => users.find(
        user =>
          user.email === this.email &&
          user.password === this.password &&
          user.role === 'owner'
      )),
      tap(matchedUser => {
        if (matchedUser) {
          this.tokenService.setUserSession(matchedUser);
          this.snackbar.success('Login successful!');
          this.router.navigate(['/owner']);
        } else {
          this.snackbar.error('Invalid credentials or not an owner');
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        this.snackbar.error('Something went wrong. Please try again.');
        return of(null); // gracefully handle error
      })
    ).subscribe();
  }
  
  goToSignup() {
    this.router.navigate(['/owner/signup']);
  }

}

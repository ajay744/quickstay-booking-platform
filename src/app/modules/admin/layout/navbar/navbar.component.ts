import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router,
    private tokenService: TokenService,
    private snackbar: SnackbarService,

  ) { }
  navigateToProfile() {
    this.router.navigate(['/admin/profile']);
  }

  logout(): void {
    this.tokenService.clearToken();
    this.snackbar.info('You have been logged out successfully.');
    this.router.navigate(['/admin/login'], { replaceUrl: true });
  }
}

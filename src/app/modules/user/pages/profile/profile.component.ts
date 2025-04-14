import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  ownerData = {
    name: '',
    email: '',
    phone: '',
    address: '123 Main Street, Indore, Madhya Pradesh',
    profilePicture: 'https://plus.unsplash.com/premium_photo-1681408249337-61b5752bdb76?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  };

  constructor(private tokenService: TokenService,
    private snackbar: SnackbarService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const userInfo = this.tokenService.getUserInfo();
    this.ownerData.name = userInfo.name || '';
    this.ownerData.email = userInfo.email || '';
    this.ownerData.phone = userInfo.phone || '';
  }
  logout(): void {
    this.tokenService.clearToken();
    this.snackbar.info('You have been logged out successfully.');
    this.router.navigate(['/user/login'], { replaceUrl: true });
  }
}

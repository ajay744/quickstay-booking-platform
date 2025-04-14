import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  recentBookings = [
    { user: 'Ajay Jat', property: 'Boys PG - Indore', date: 'April 10, 2025' },
    { user: 'Riya Gupta', property: 'Private Room - Bhopal', date: 'April 09, 2025' },
    { user: 'Soham Patel', property: 'Shared Room - Pune', date: 'April 08, 2025' }
  ];
}

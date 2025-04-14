import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns: string[] = ['property', 'date', 'amount'];
  recentBookings = [
    { property: 'Royal Residency', date: '2025-04-09', amount: 15000 },
    { property: 'Urban Nest', date: '2025-04-06', amount: 12000 },
    { property: 'Green Villa', date: '2025-04-04', amount: 10000 }
  ];

  notifications = [
    { message: 'New booking for Royal Residency.', time: '2 hours ago' },
    { message: 'Payment received from Urban Nest.', time: '1 day ago' },
    { message: 'User review added for Green Villa.', time: '3 days ago' }
  ];

}

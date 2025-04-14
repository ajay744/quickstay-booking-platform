import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/core/models/responses/booking-response.model';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  bookingData: any[] = [];
  isLoading = false;

  constructor(
    private api: ApiService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.isLoading = true;

    this.api.get<Booking[]>(environment.apiEndpoints.pg.booking).subscribe({
      next: (res) => {
        this.bookingData = res || [];
        this.isLoading = false;
    
        if (this.bookingData.length === 0) {
          this.snackbar.warn('No bookings found.');
        }
      },
      error: (err) => {
        console.error('Failed to fetch bookings:', err);
        this.snackbar.error('Error fetching booking data. Please try again.');
        this.isLoading = false;
      }
    });
    
  }
}

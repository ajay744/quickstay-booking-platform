import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { ApiService } from 'src/app/core/services/api.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { environment } from 'src/environments/environment';

import { BookingRequest } from 'src/app/core/models/requests/booking-request.model';
import { PgDetails } from 'src/app/core/models/responses/pg-details.model';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent {
  pgData!: PgDetails;

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly snackbar: SnackbarService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const data = navigation?.extras?.state?.['data'];
    if (data) {
      this.pgData = data;
    } else {
      this.snackbar.error('No PG details found.');
      this.router.navigate(['/']);
    }
  }

  bookNow(data: PgDetails): void {
    const userName = localStorage.getItem('userName') || 'Guest';
    const userId = localStorage.getItem('userId') || 'unknown';
    const userEmail = localStorage.getItem('userEmail') || 'user@gmail.com';

    const bookingData: BookingRequest = {
      pgId: data.id,
      pgName: data.name,
      pgType: data.pgType,
      location: data.location,
      city: data.city,
      price: data.price,
      image: data.image,
      description: data.description,
      features: {
        cleaning: data.features.cleaning ?? false,
        ac: data.features.ac ?? false,
        wifi: data.features.wifi ?? false,
        food: data.features.food ?? false,
        laundry: data.features.laundry ?? false
      },
      rating: data.rating,
      contact: data.contact,
      userName,
      userEmail,
      userId,
      date: new Date(),
      status: 'Payment Done'
    };

    of(bookingData).pipe(
      tap(() => this.snackbar.info('Processing your booking...')),

      switchMap(payload =>
        this.apiService.post(environment.apiEndpoints.pg.booking, payload)
      ),

      tap(() => {
        this.snackbar.success('Booking successful!');
        this.snackbar.warn('Payment Confirmed');
        this.router.navigate(['/user/booking'], { state: { data: bookingData } });
      }),

      catchError((error) => {
        console.error('Booking failed:', error);
        this.snackbar.error('Booking failed. Please try again.');
        return of(null);
      })
    ).subscribe();
  }

  contactOwner(): void {
    console.log('Contacting owner for PG:', this.pgData?.name);
    this.snackbar.info(`Contact: ${this.pgData?.contact}`);
  }
      // bookPgrazorpa(pg: any): void {
  //   this.razorpayService.openPaymentGateway(pg, (response) => {
  //     if (response && response.razorpay_payment_id) {
  //       // Payment was successful
  //       this.snackbar.success('PG booked successfully! Payment ID: ' + response.razorpay_payment_id, 4000);
  
  //       // Optional: Save to DB
  //       // this.pgService.saveBooking(pg, response).subscribe(...);
  
  //     } else {
  //       // Fallback if response is malformed
  //       this.snackbar.warn('Payment response invalid. Please contact support.', 4000);
  //     }
  //   });
  // }
}

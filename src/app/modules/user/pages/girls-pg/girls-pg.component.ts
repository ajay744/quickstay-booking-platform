import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import { PgService } from 'src/app/core/services/pg.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

import { GirlsPg } from 'src/app/core/models/responses/girlsPg-response.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-girls-pg',
  templateUrl: './girls-pg.component.html',
  styleUrls: ['./girls-pg.component.scss']
})
export class GirlsPgComponent implements OnInit {
  pgList: GirlsPg[] = [];
  searchText = '';
  sortOption = '';
  isLoading = false;

  constructor(
    private api: ApiService,
    private pgService: PgService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchGirlsPGs();
  }

  fetchGirlsPGs(): void {
    this.isLoading = true;
    this.api.get<GirlsPg[]>(environment.apiEndpoints.girlsPg.get).pipe(
      tap(data => this.pgList = data),
      catchError(err => {
        console.error('Error fetching PG data:', err);
        this.snackbar.error('Failed to fetch Girls PG list. Please try again later.');
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  viewDetails(pg: GirlsPg): void {
    this.router.navigate(['/user/view-details'], { state: { data: pg } });
  }

  get filteredPgList(): GirlsPg[] {
    return this.pgService.filterAndSortPgList(this.pgList, this.searchText, this.sortOption);
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

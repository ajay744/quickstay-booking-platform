import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'pgType', 'location', 'city', 'price', 'rating', 'contact'];
  dataSource = new MatTableDataSource<any>([]);
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private apiService: ApiService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.isLoading = true;
    this.apiService.get<any[]>(environment.apiEndpoints.pg.booking).subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.snackbar.success('Bookings loaded successfully');
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch bookings:', err);
        this.snackbar.error('Failed to load bookings');
        this.isLoading = false;
      }
    });
  }
}

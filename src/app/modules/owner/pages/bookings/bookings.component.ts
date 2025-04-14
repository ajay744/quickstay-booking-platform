import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'pgType', 'location', 'city', 'price', 'rating', 'contact'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService, private http: HttpClient) {}

  ngOnInit(): void {
    this.apiService.get(environment.apiEndpoints.pg.booking ).subscribe({
      next: (res: any) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Failed to fetch bookings:', err);
      }
    });
  }
}

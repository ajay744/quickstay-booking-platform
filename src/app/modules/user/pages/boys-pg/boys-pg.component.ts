import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import { PgService } from 'src/app/core/services/pg.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

import { environment } from 'src/environments/environment';
import { BoysPg } from 'src/app/core/models/responses/boysPg-response.model';

@Component({
  selector: 'app-boys-pg',
  templateUrl: './boys-pg.component.html',
  styleUrls: ['./boys-pg.component.scss']
})
export class BoysPgComponent implements OnInit {
  pgList: BoysPg[] = [];
  searchText: string = '';
  sortOption: string = '';
  isLoading = false;

  constructor(
    private apiService: ApiService,
    private pgService: PgService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBoysPgData();
  }

  getBoysPgData(): void {
    this.isLoading = true;
    this.apiService.get<BoysPg[]>(environment.apiEndpoints.boysPg.get).pipe(
      tap((data) => this.pgList = data),
      catchError((error) => {
        console.error('Failed to load PG list:', error);
        this.snackbar.error('Failed to load PG data. Please try again later.');
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  viewDetails(pg: BoysPg): void {
    this.router.navigate(['/user/view-details'], { state: { data: pg } });
  }

  get filteredPgList(): BoysPg[] {
    return this.pgService.filterAndSortPgList(this.pgList, this.searchText, this.sortOption);
  }
}

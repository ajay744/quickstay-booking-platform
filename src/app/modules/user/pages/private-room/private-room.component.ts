import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import { PgService } from 'src/app/core/services/pg.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

import { PrivateRoomPg } from 'src/app/core/models/responses/privateRoom-response.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-private-room',
  templateUrl: './private-room.component.html',
  styleUrls: ['./private-room.component.scss']
})
export class PrivateRoomComponent implements OnInit {
  pgList: PrivateRoomPg[] = [];
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
    this.fetchPrivateRooms();
  }

  fetchPrivateRooms(): void {
    this.isLoading = true;
    this.api.get<PrivateRoomPg[]>(environment.apiEndpoints.privateRoom.get).pipe(
      tap(data => this.pgList = data),
      catchError(err => {
        console.error('Error fetching PG data:', err);
        this.snackbar.error('Failed to load Private Rooms. Please try again later.');
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  viewDetails(pg: PrivateRoomPg): void {
    this.router.navigate(['/user/view-details'], { state: { data: pg } });
  }

  get filteredPgList(): PrivateRoomPg[] {
    return this.pgService.filterAndSortPgList(this.pgList, this.searchText, this.sortOption);
  }
}

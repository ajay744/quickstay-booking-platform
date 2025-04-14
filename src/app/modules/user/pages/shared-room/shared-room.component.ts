import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import { PgService } from 'src/app/core/services/pg.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

import { SharedRoomPg } from 'src/app/core/models/responses/sharedRoom-response.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shared-room',
  templateUrl: './shared-room.component.html',
  styleUrls: ['./shared-room.component.scss']
})
export class SharedRoomComponent implements OnInit {
  pgList: SharedRoomPg[] = [];
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
    this.fetchSharedRooms();
  }

  fetchSharedRooms(): void {
    this.isLoading = true;
    this.api.get<SharedRoomPg[]>(environment.apiEndpoints.sharedRoom.get).pipe(
      tap(data => this.pgList = data),
      catchError(err => {
        console.error('Error fetching Shared Room PGs:', err);
        this.snackbar.error('Failed to load Shared Rooms. Please try again later.');
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  viewDetails(pg: SharedRoomPg): void {
    this.router.navigate(['/user/view-details'], { state: { data: pg } });
  }

  get filteredPgList(): SharedRoomPg[] {
    return this.pgService.filterAndSortPgList(this.pgList, this.searchText, this.sortOption);
  }
}

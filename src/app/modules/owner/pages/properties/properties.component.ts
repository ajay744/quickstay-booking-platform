import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin, Subject, of } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit, AfterViewInit, OnDestroy {
  allProperties: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'pgType', 'city', 'price', 'rating', 'contact', 'source', 'actions'];
  dataSource = new MatTableDataSource<any>();
  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private apiService: ApiService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    this.loadProperties();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadProperties() {
    const endpoints = [
      { url: environment.apiEndpoints.boysPg.get, source: 'boysPg' },
      { url: environment.apiEndpoints.girlsPg.get, source: 'girlsPg' },
      { url: environment.apiEndpoints.privateRoom.get, source: 'privateRoom' },
      { url: environment.apiEndpoints.sharedRoom.get, source: 'sharedRoom' }
    ];

    const requests = endpoints.map(endpoint =>
      this.apiService.get<any[]>(endpoint.url).pipe(
        map(data => data.map(item => ({ ...item, source: endpoint.source }))),
        catchError(error => {
          console.error(`Error loading ${endpoint.source}`, error);
          this.snackbar.error(`Failed to load ${endpoint.source}`);
          return of([]); // Return empty array on error
        })
      )
    );

    forkJoin(requests)
      .pipe(takeUntil(this.destroy$))
      .subscribe((responses) => {
        this.allProperties = responses.flat();
        this.dataSource.data = this.allProperties;
        this.snackbar.success('Properties loaded successfully!');
      });
  }

  editProperty(id: number, source: string) {
    console.log(`Edit property with id ${id} from ${source}`);
    // Add routing or modal edit logic if needed
  }

  deleteProperty(id: number, source: string) {
    const url = `${environment.baseUrl}/${source}/${id}`;
    this.apiService.delete(url)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.allProperties = this.allProperties.filter(p => !(p.id === id && p.source === source));
          this.dataSource.data = this.allProperties;
          this.snackbar.success('Property deleted successfully.');
        },
        error: () => {
          this.snackbar.error('Failed to delete property.');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

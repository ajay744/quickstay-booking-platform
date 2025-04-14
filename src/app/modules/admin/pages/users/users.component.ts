import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'role', 'actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoading = false;

  constructor(
    private apiService: ApiService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.isLoading = true;
    this.apiService.get<any[]>(environment.apiEndpoints.users.getAll).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.snackbar.success('Users loaded successfully');
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load users:', err);
        this.snackbar.error('Failed to load users');
        this.isLoading = false;
      }
    });
  }

  onEdit(user: any): void {
    this.snackbar.info(`Edit logic not implemented yet for user: ${user.name}`);
  }

  onDelete(userId: string): void {
    this.snackbar.warn(`Delete logic not implemented yet for ID: ${userId}`);
  }
}

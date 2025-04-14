import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderService } from 'src/app/core/services/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from 'src/app/core/services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService,
    private snackBar: MatSnackBar,
    private tokenService: TokenService // Inject TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show(); // Start spinner

    //  Get token
    const token = this.tokenService.getToken();

    //  Clone request and attach token if available
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(() => error); // Forward error
      }),
      finalize(() => {
        this.loaderService.hide(); // Always hide spinner
      })
    );
  }

  private handleError(error: HttpErrorResponse): void {
    let errorMessage = '❌ An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `⚠️ Client Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 0:
          errorMessage = '🚫 No connection. Please check your network.';
          break;
        case 400:
          errorMessage = '⚠️ Bad Request';
          break;
        case 401:
          errorMessage = '🔐 Unauthorized. Please login again.';
          break;
        case 403:
          errorMessage = '🚫 Access Denied.';
          break;
        case 404:
          errorMessage = '❓ Resource Not Found';
          break;
        case 500:
          errorMessage = '💥 Internal Server Error';
          break;
        default:
          errorMessage = `❌ Error ${error.status}: ${error.message}`;
      }
    }

    this.snackBar.open(errorMessage, 'Close', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
  }
}

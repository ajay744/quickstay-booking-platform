import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Generic GET
  get<T>(endpoint: string, params?: any, headers?: any): Observable<T> {
    return this.http.get<T>(this.buildUrl(endpoint), {
      params: this.buildParams(params),
      headers: this.buildHeaders(headers)
    }
  );
  }

  // Generic POST
  post<T>(endpoint: string, body: any, headers?: any): Observable<T> {
    return this.http.post<T>(this.buildUrl(endpoint), body, {
      headers: this.buildHeaders(headers)
    });
  }

  // Generic PUT
  put<T>(endpoint: string, body: any, headers?: any): Observable<T> {
    return this.http.put<T>(this.buildUrl(endpoint), body, {
      headers: this.buildHeaders(headers)
    });
  }

  // Generic DELETE
  delete<T>(endpoint: string, params?: any, headers?: any): Observable<T> {
    return this.http.delete<T>(this.buildUrl(endpoint), {
      params: this.buildParams(params),
      headers: this.buildHeaders(headers)
    });
  }

  // Build full URL
  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  // Optional query parameters
  private buildParams(params?: any): HttpParams | undefined {
    if (!params) return undefined;
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return httpParams;
  }

  // Optional headers
  private buildHeaders(headers?: any): HttpHeaders | undefined {
    if (!headers) return undefined;
    let httpHeaders = new HttpHeaders();
    Object.keys(headers).forEach(key => {
      httpHeaders = httpHeaders.set(key, headers[key]);
    });
    return httpHeaders;
  }
}

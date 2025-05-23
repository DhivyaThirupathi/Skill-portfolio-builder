import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Portfolio, ApiResponse } from '../models/portfolio.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = 'http://localhost:3000/api/portfolios';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  getAllPortfolios(): Observable<Portfolio[]> {
    return this.http.get<ApiResponse<Portfolio[]>>(this.apiUrl).pipe(
      map(response => response.data || []),
      catchError(error => {
        this.notificationService.showError('Failed to fetch portfolios');
        return throwError(() => error);
      })
    );
  }

  getPortfolioById(id: string): Observable<Portfolio> {
    return this.http.get<ApiResponse<Portfolio>>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        if (!response.data) {
          throw new Error('Portfolio not found');
        }
        return response.data;
      }),
      catchError(error => {
        this.notificationService.showError('Failed to fetch portfolio details');
        return throwError(() => error);
      })
    );
  }

  createPortfolio(portfolio: Portfolio): Observable<Portfolio> {
    return this.http.post<ApiResponse<Portfolio>>(this.apiUrl, portfolio).pipe(
      map(response => {
        this.notificationService.showSuccess('Portfolio created successfully');
        return response.data as Portfolio;
      }),
      catchError(error => {
        this.notificationService.showError('Failed to create portfolio');
        return throwError(() => error);
      })
    );
  }

  updatePortfolio(id: string, portfolio: Portfolio): Observable<Portfolio> {
    return this.http.put<ApiResponse<Portfolio>>(`${this.apiUrl}/${id}`, portfolio).pipe(
      map(response => {
        this.notificationService.showSuccess('Portfolio updated successfully');
        return response.data as Portfolio;
      }),
      catchError(error => {
        this.notificationService.showError('Failed to update portfolio');
        return throwError(() => error);
      })
    );
  }

  deletePortfolio(id: string): Observable<boolean> {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        this.notificationService.showSuccess('Portfolio deleted successfully');
        return true;
      }),
      catchError(error => {
        this.notificationService.showError('Failed to delete portfolio');
        return throwError(() => error);
      })
    );
  }
}
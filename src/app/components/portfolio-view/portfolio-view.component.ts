import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Import RouterModule
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { CommonModule } from '@angular/common'; // Import CommonModule

import { PortfolioService } from '../../services/portfolio.service';
import { PdfService } from '../../services/pdf.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component'; // Import ConfirmDialogComponent
import { Portfolio } from '../../models/portfolio.model';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component'; // <-- Import LoadingSpinnerComponent

// Import necessary Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button'; // Add MatButtonModule for mat-icon used in buttons

@Component({
  selector: 'app-portfolio-view',
  standalone: true, // <-- Mark as standalone
  imports: [ // <-- Add or update imports array for standalone components
    CommonModule,
    RouterModule, // Import RouterModule
    MatDialogModule, // Import MatDialogModule for the dialog service
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    ConfirmDialogComponent, // Import standalone components used directly (like in a dialog)
    LoadingSpinnerComponent // <-- Import LoadingSpinnerComponent
  ],
  templateUrl: './portfolio-view.component.html',
  styleUrls: ['./portfolio-view.component.css']
})
export class PortfolioViewComponent implements OnInit {
  portfolio: Portfolio | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private portfolioService: PortfolioService,
    private pdfService: PdfService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog // MatDialog is a service, injected here
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPortfolio(id);
    } else {
      this.errorMessage = 'Portfolio ID not provided';
      this.isLoading = false;
    }
  }

  loadPortfolio(id: string): void {
    this.isLoading = true;
    this.portfolioService.getPortfolioById(id).subscribe({
      next: (data) => {
        this.portfolio = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load portfolio details';
        this.isLoading = false;
        // Consider showing an error notification here
      }
    });
  }

  editPortfolio(): void {
    if (this.portfolio?._id) {
      this.router.navigate(['/portfolios/edit', this.portfolio._id]);
    }
  }

  deletePortfolio(): void {
    if (!this.portfolio?._id) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, { // ConfirmDialogComponent is used here
      width: '350px',
      data: {
        title: 'Delete Portfolio',
        message: 'Are you sure you want to delete this portfolio? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.portfolio?._id) {
        this.portfolioService.deletePortfolio(this.portfolio._id).subscribe({
          next: () => {
            this.router.navigate(['/portfolios']);
          },
          error: () => {
             // Consider showing an error notification here
          }
        });
      }
    });
  }

  exportToPdf(): void {
    if (this.portfolio) {
      this.pdfService.generatePortfolioPdf(this.portfolio);
    }
  }

  goBack(): void {
    this.router.navigate(['/portfolios']);
  }

  getFormattedDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
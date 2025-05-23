import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Import RouterModule
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { CommonModule, SlicePipe } from '@angular/common'; // Import CommonModule and SlicePipe
import { PortfolioService } from '../../services/portfolio.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component'; // Import ConfirmDialogComponent
import { Portfolio } from '../../models/portfolio.model';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component'; // Import LoadingSpinnerComponent

// Import necessary Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button'; // For buttons within cards

@Component({
  selector: 'app-portfolio-gallery',
  standalone: true, // <-- Mark as standalone
  imports: [ // <-- Add imports array
    CommonModule,
    RouterModule, // Import RouterModule
    MatDialogModule, // Import MatDialogModule for the dialog service
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    LoadingSpinnerComponent, // Import LoadingSpinnerComponent
    ConfirmDialogComponent // Import ConfirmDialogComponent as it's used in dialog.open()
    // SlicePipe // You can import SlicePipe specifically, but CommonModule includes it
  ],
  templateUrl: './portfolio-gallery.component.html',
  styleUrls: ['./portfolio-gallery.component.css']
})
export class PortfolioGalleryComponent implements OnInit {
  portfolios: Portfolio[] = [];
  isLoading = true;
  breakpointColumns = 3;

  constructor(
    private portfolioService: PortfolioService,
    private router: Router,
    private dialog: MatDialog // MatDialog service is injected
  ) {}

  ngOnInit(): void {
    this.loadPortfolios();
    this.updateGridColumns(window.innerWidth);
  }

  onResize(event: any): void {
    this.updateGridColumns(event.target.innerWidth);
  }

  updateGridColumns(width: number): void {
    if (width < 600) {
      this.breakpointColumns = 1;
    } else if (width < 960) {
      this.breakpointColumns = 2;
    } else {
      this.breakpointColumns = 3;
    }
  }

  loadPortfolios(): void {
    this.isLoading = true;
    this.portfolioService.getAllPortfolios().subscribe({
      next: (data) => {
        this.portfolios = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        // Consider showing an error notification here
      }
    });
  }

  viewPortfolio(id: string): void {
    this.router.navigate(['/portfolios', id]);
  }

  editPortfolio(id: string, event: Event): void {
    event.stopPropagation(); // Prevent card click from triggering viewPortfolio
    this.router.navigate(['/portfolios/edit', id]);
  }

  deletePortfolio(id: string, event: Event): void {
    event.stopPropagation(); // Prevent card click from triggering viewPortfolio

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
      if (result) {
        this.portfolioService.deletePortfolio(id).subscribe({
          next: () => {
            this.portfolios = this.portfolios.filter(p => p._id !== id);
          },
          error: () => {
             // Consider showing an error notification here
          }
        });
      }
    });
  }

  createNewPortfolio(): void {
    this.router.navigate(['/portfolios/new']);
  }

  getFormattedDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
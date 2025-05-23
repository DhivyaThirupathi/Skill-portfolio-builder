import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Import necessary Angular Material and Flex Layout Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FlexLayoutModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Or './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) {}

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateToGallery(): void {
    this.router.navigate(['/portfolios']);
  }

  createNewPortfolio(): void {
    this.router.navigate(['/portfolios/new']);
  }
}
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Import RouterModule
import { CommonModule } from '@angular/common'; // Import CommonModule

// Import necessary Angular Material Modules used in the template
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; // Likely needed if cards have buttons or icons within buttons

@Component({
  selector: 'app-home',
  standalone: true, // <-- Mark as standalone
  imports: [ // <-- Add imports array
    CommonModule,
    RouterModule, // Import RouterModule if using router directives in template
    MatCardModule,
    MatIconModule,
    MatButtonModule // Add if you use buttons
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToGallery(): void {
    this.router.navigate(['/portfolios']);
  }

  createNewPortfolio(): void {
    this.router.navigate(['/portfolios/new']);
  }
}
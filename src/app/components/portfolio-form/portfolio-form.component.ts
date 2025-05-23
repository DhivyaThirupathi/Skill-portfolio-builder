import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Import RouterModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { COMMA, ENTER } from '@angular/cdk/keycodes';

// Import necessary Angular Material Modules
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips'; // Import MatChipsModule and MatChipInputEvent type
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // MatFormField often requires MatInput
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; // For buttons (Submit, Cancel, Add/Remove project)

import { PortfolioService } from '../../services/portfolio.service';
import { NotificationService } from '../../services/notification.service';
import { Portfolio } from '../../models/portfolio.model';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component'; // Import LoadingSpinnerComponent

@Component({
  selector: 'app-portfolio-form',
  standalone: true, // <-- Mark as standalone
  imports: [ // <-- Add imports array
    CommonModule,
    ReactiveFormsModule, // Import ReactiveFormsModule for form directives
    RouterModule, // Import RouterModule if using router directives in template
    MatCardModule,
    MatFormFieldModule,
    MatInputModule, // Necessary for <input> or <textarea> within mat-form-field
    MatChipsModule, // For mat-chip-grid, mat-chip-row, matChipInput directives/events
    MatIconModule,
    MatButtonModule,
    LoadingSpinnerComponent // Import the standalone component
  ],
  templateUrl: './portfolio-form.component.html',
  styleUrls: ['./portfolio-form.component.css']
})
export class PortfolioFormComponent implements OnInit {
  portfolioForm!: FormGroup;
  isEditMode = false;
  portfolioId: string | null = null;
  isLoading = false;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: string[] = [];

  constructor(
    private fb: FormBuilder,
    private portfolioService: PortfolioService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.portfolioId = this.route.snapshot.paramMap.get('id');
    if (this.portfolioId) {
      this.isEditMode = true;
      this.loadPortfolio(this.portfolioId);
    }
  }

  initForm(): void {
    this.portfolioForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      aboutMe: ['', [Validators.required, Validators.minLength(50)]],
      skills: [this.skills],
      projects: this.fb.array([]),
      achievements: ['']
    });
  }

  loadPortfolio(id: string): void {
    this.isLoading = true;
    this.portfolioService.getPortfolioById(id).subscribe({
      next: (portfolio) => {
        this.populateForm(portfolio);
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.showError('Failed to load portfolio');
        this.isLoading = false;
        this.router.navigate(['/portfolios']);
      }
    });
  }

  populateForm(portfolio: Portfolio): void {
    this.skills = [...portfolio.skills];

    // Set the form values except for projects
    this.portfolioForm.patchValue({
      fullName: portfolio.fullName,
      aboutMe: portfolio.aboutMe,
      skills: this.skills,
      achievements: portfolio.achievements
    });

    // Clear existing projects
    const projectsArray = this.portfolioForm.get('projects') as FormArray;
    while (projectsArray.length) {
      projectsArray.removeAt(0);
    }

    // Add each project
    portfolio.projects.forEach(project => {
      this.addProject(project.title, project.description);
    });
  }

  get projectsArray(): FormArray {
    return this.portfolioForm.get('projects') as FormArray;
  }

  addProject(title: string = '', description: string = ''): void {
    this.projectsArray.push(
      this.fb.group({
        title: [title, Validators.required],
        description: [description, Validators.required]
      })
    );
  }

  removeProject(index: number): void {
    this.projectsArray.removeAt(index);
  }

  addSkill(event: MatChipInputEvent): void { // MatChipInputEvent type is now recognized
    const value = (event.value || '').trim();
    if (value) {
      this.skills.push(value);
      this.portfolioForm.patchValue({ skills: this.skills });
    }
    event.chipInput!.clear();
  }

  removeSkill(skill: string): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
      this.portfolioForm.patchValue({ skills: this.skills });
    }
  }

  onSubmit(): void {
    if (this.portfolioForm.invalid) {
      this.portfolioForm.markAllAsTouched();
      this.notificationService.showError('Please fix the errors in the form before submitting');
      return;
    }

    const portfolioData: Portfolio = {
      ...this.portfolioForm.value,
      skills: this.skills
    };

    this.isLoading = true;

    if (this.isEditMode && this.portfolioId) {
      this.portfolioService.updatePortfolio(this.portfolioId, portfolioData).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/portfolios', this.portfolioId]);
        },
        error: () => {
          this.isLoading = false;
          // Consider showing an error notification here as well
        }
      });
    } else {
      this.portfolioService.createPortfolio(portfolioData).subscribe({
        next: (newPortfolio) => {
          this.isLoading = false;
          this.router.navigate(['/portfolios', newPortfolio._id]);
        },
        error: () => {
          this.isLoading = false;
           // Consider showing an error notification here as well
        }
      });
    }
  }

  cancelEdit(): void {
    if (this.isEditMode && this.portfolioId) {
      this.router.navigate(['/portfolios', this.portfolioId]);
    } else {
      this.router.navigate(['/portfolios']);
    }
  }
}
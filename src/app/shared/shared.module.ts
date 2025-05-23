import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
// Remove imports for components declared as standalone
// import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
// import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    // Remove standalone components from declarations
    // LoadingSpinnerComponent, // Remove
    // ConfirmDialogComponent // Remove
  ],
  imports: [
    CommonModule,
    MaterialModule, // Keep MaterialModule if it's an NgModule or used here
    FlexLayoutModule // Keep FlexLayoutModule if it's an NgModule or used here
  ],
  exports: [
    // Remove standalone components from exports
    // LoadingSpinnerComponent, // Remove
    // ConfirmDialogComponent, // Remove
    FlexLayoutModule // Keep exporting FlexLayoutModule if you want to make it available to modules importing SharedModule
  ]
})
export class SharedModule { }
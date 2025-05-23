import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Keep RouterModule if used for routing

// Remove imports for components declared as standalone
// import { AppComponent } from './app.component';
// import { HomeComponent } from './components/home/home.component';
// import { PortfolioFormComponent } from './components/portfolio-form/portfolio-form.component';
// import { PortfolioGalleryComponent } from './components/portfolio-gallery/portfolio-gallery.component';
// import { PortfolioViewComponent } from './components/portfolio-view/portfolio-view.component';

import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module'; // Keep AppRoutingModule if used

@NgModule({
  declarations: [
    // Remove standalone components from declarations
    // AppComponent, // Remove
    // HomeComponent, // Remove
    // PortfolioFormComponent, // Remove
    // PortfolioGalleryComponent, // Remove
    // PortfolioViewComponent // Remove
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // RouterModule, // Keep RouterModule
    SharedModule, // Keep SharedModule if it's not standalone or its contents are needed by non-standalone parts
    MaterialModule, // Keep MaterialModule if it's an NgModule or used by non-standalone parts
    AppRoutingModule // Keep AppRoutingModule
  ],
  providers: [],
  bootstrap: [] // If AppComponent is standalone, you might need to change the bootstrapping method in main.ts
})
export class AppModule { }
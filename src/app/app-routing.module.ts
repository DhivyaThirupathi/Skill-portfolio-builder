import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PortfolioFormComponent } from './components/portfolio-form/portfolio-form.component';
import { PortfolioGalleryComponent } from './components/portfolio-gallery/portfolio-gallery.component';
import { PortfolioViewComponent } from './components/portfolio-view/portfolio-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'portfolios', component: PortfolioGalleryComponent },
  { path: 'portfolios/new', component: PortfolioFormComponent },
  { path: 'portfolios/edit/:id', component: PortfolioFormComponent },
  { path: 'portfolios/:id', component: PortfolioViewComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
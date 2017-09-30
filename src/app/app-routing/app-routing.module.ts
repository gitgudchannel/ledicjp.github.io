import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { HomeComponent } from '../home/home.component';
import { ContactComponent } from '../contact/contact.component';
import { BioComponent } from '../bio/bio.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'portfolio',
    component: PortfolioComponent
  },
  {
    path: 'bio',
    component: BioComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}

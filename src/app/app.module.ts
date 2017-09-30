import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { BioComponent } from './bio/bio.component';
import { NavComponent } from './nav/nav.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ParticlesComponent } from './particles/particles.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    BioComponent,
    NavComponent,
    PortfolioComponent,
    ParticlesComponent,
    HomeComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ParticlesHeaderComponent } from './particles-header/particles-header.component';

@NgModule({
  declarations: [
    AppComponent,
    ParticlesHeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

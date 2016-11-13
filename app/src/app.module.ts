import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router"

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar.component";
import { AnalysisBoardComponent } from './analysis.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule
  ],
  declarations: [ 
    AppComponent, 
    NavbarComponent,
    AnalysisBoardComponent 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
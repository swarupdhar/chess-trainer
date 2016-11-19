import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router"

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar.component";
import { AnalysisBoardComponent } from './analysis.component';
import { PlayBoardComponent } from './play.component';
import { ModalService } from './modal.service';
import { ModalComponent } from './modal.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule
  ],
  declarations: [ 
    AppComponent, 
    NavbarComponent,
    AnalysisBoardComponent,
    PlayBoardComponent,
    ModalComponent
  ],
  providers: [ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
import { Component } from '@angular/core';

@Component({
  selector: 'App',
  templateUrl: 'template/app.component.html'
})
export class AppComponent {
// TODO: figure out if I want to create modal services or use electron modals

  public mode:string;

  constructor(){
    this.mode = 'analysis';
  }

  handleNavEvents(e){
    switch(e){
      case 'new-analysis-board':
        this.mode = 'analysis';
      break;
      case 'new-play-comp':
        //TODO: prompt user for prefs
        this.mode = 'play';
      break;
      case 'new-analysis-board':
        this.mode = 'analysis';
      break;
    }
  }
}

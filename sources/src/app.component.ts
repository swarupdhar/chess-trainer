import { Component } from '@angular/core';

@Component({
  selector: 'App',
  templateUrl: 'template/app.component.html'
})
export class AppComponent {
// TODO: figure out if I want to create modal services or use electron modals

  public mode:string;
  public modalSetting;

  constructor(){
    this.mode = 'analysis';
    this.modalSetting = {
      isOpen: false,
      title: "",
      body: "",
      footer:""
    };
  }

  toggleModal(){
    this.modalSetting.isOpen = !this.modalSetting.isOpen;
  }

  handleNavEvents(e){
    switch(e){
      case 'new-analysis-board':
        this.mode = 'analysis';
      break;
      case 'new-play-comp':
        //TODO: prompt user for prefs
        this.modalSetting.title = 'Play Computer';
        this.modalSetting.body = `testing`;
        this.modalSetting.footer = 'More tests';
        this.toggleModal();
        this.mode = 'play';
      break;
      case 'new-play-friend':
      break;
      case 'new-analysis-board':
        this.mode = 'analysis';
      break;
    }
  }
}

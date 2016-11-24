import { Component } from '@angular/core';

@Component({
  selector: 'App',
  templateUrl: 'template/app.component.html'
})
export class AppComponent {

  private mode:string;
  private modalSetting;
  private playSettings;

  constructor(){
    this.mode = 'analysis';
    this.modalSetting = {
      isOpen: false,
      type: ''
    };
    this.playSettings = {
      type: 'play-friend',
      strength: 0
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
        this.modalSetting.type = "play-comp";
        // this.toggleModal();
        this.mode = 'play';
      break;
      case 'new-play-friend':
        this.modalSetting.type = "play-friend";
        this.mode = 'play';        
      break;
      case 'new-analysis-board':
        this.mode = 'analysis';
      break;
    }
  }

  handleModalEvents(e){
    console.log(e);
    if(e.event == "modal-close"){
      this.toggleModal();
    }
  }
}

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
      type: ''
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
        this.modalSetting.type = "test";
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

  handleModalEvents(e){
    console.log(e);
    if(e.event == "modal-close"){
      this.toggleModal();
    }
  }
}

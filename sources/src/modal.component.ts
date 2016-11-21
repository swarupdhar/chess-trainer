import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'Modal',
  templateUrl: 'template/modal.component.html'
})
export class ModalComponent{

  @Input() type;
  @Output() modalEvents = new EventEmitter();
  
  constructor(){
  }

  sendEvent(e){
    this.modalEvents.emit(e);
  }
}
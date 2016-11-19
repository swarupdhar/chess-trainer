import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'Modal',
  templateUrl: 'template/modal.component.html'
})
export class ModalComponent{

  @Input() title;
  @Input() body;
  @Input() footer;

  @Output() modalEvents = new EventEmitter();

  private modalTitleElm;
  private modalBodyElm;
  private modalFooterElm;

  constructor(){
  }

  ngOnInit(){
    this.modalTitleElm = document.getElementById('modal-title');
    this.modalBodyElm = document.getElementById('modal-body');
    this.modalFooterElm = document.getElementById('modal-footer');
    this.modalTitleElm.innerHTML = this.title;
    this.modalBodyElm.innerHTML = this.body;
    this.modalFooterElm.innerHTML = this.footer;
  }

  sendEvent(e){
    this.modalEvents.emit(e);
  }

}
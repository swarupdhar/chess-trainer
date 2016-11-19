import { Component, Input } from '@angular/core';

@Component({
  selector: 'PlayBoard',
  templateUrl: 'template/play-board.component.html'
})
export class PlayBoardComponent{

  @Input() type;

  constructor(){
  }

}
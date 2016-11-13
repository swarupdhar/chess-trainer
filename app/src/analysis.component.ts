import { Component } from '@angular/core';
import { Chess } from './libs/chess';
import { ChessBoard } from './libs/chessboard';
import { Move } from './move';

@Component({
  selector: 'AnalysisBoard',
  templateUrl: 'template/analysis-board.component.html'
})
export class AnalysisBoardComponent {
  private game; // chess js (logic)
  private board; // chessboardjs (display)
  private boardID: string; // div id
  private config:Object; // configuration for chessboardjs
  private rootMove:Move; // root node for the chess moves
  private headMove:Move; // the head node
  public boardMenuItems = "board-menu-items";

// TODO: notation and engine analysis

  constructor(){
    this.boardID = "board";
    this.game = new Chess();
    this.rootMove = new Move(this.game.fen(), '');
    this.headMove = this.rootMove;
    this.config = {
      orientation: 'white',
      position: 'start',
      dropOffBoard: 'snapback',
      pieceTheme: 'img/chesspieces/wikipedia/{piece}.png',
      draggable: true,
      onDragStart: (source, piece/*, position, orientation*/)=>{
        // only let user move the piece if it is their turn and the game is not over
        if (this.game.game_over() === true || (this.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
           (this.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
              return false;
        }
      },
      onDrop: (source, target, piece, position, orientation)=>{
        let promotion = undefined; // check if promotion needs to be passed to function
        if((piece == 'wP' || piece == 'bP') && (target.includes('1') || target.includes('8'))){
          promotion = 'q'; // NOTE: always promoting to queen for simplicity
        }
        // see if the move is legal
        let move = this.game.move({from: source, to: target, promotion: promotion});
        if(move == null) return 'snapback'; // illegal move
        else{//if legal handle the nodes
          let moveNode:Move = new Move(this.game.fen(), move.san, this.headMove);          
          let index = this.headMove.hasNextMove(moveNode); // see if the move already exists (index is undefined if it does not)
          if(index == undefined){
            // create a new node and add it to the next moves list
            this.headMove.addNextMove(moveNode);
            this.headMove = moveNode; // advance the head to the new node
          }else{
            // just advance the head to the new node
            this.headMove = this.headMove.getNextMove(index);
          }
        }
      },
      onSnapEnd : ()=>{
        this.board.position(this.game.fen());
      }
    };
  }

  ngOnInit(){
    this.board = ChessBoard(this.boardID, this.config, 'analysis');
    window.onresize = this.board.resize;
    document.addEventListener('keydown', this.keyListener.bind(this));
  }

  keyListener(event){
    switch(event.keyCode){
      case 39: //right arrow key (go forward)
        this.goForward();
      break;
      case 37: // left key (go back)
        this.goBack();
      break;
    }
  }

  goForward(){
    if(this.headMove.getMainLine()){
      this.headMove = this.headMove.getMainLine();
      this.board.position(this.headMove.fenPosition);
      this.game.load(this.headMove.fenPosition);
    }
  }

  goBack(){
    if(this.headMove.getPreviousMove()){
      this.headMove = this.headMove.getPreviousMove();
      this.board.position(this.headMove.fenPosition);
      this.game.load(this.headMove.fenPosition);
    }
  }

  newBoard(){
    this.game = new Chess();
    this.rootMove = new Move(this.game.fen(), '');
    this.headMove = this.rootMove;
    this.board.position(this.headMove.fenPosition);
  }

  toggleMenu(){
    if(this.boardMenuItems === 'board-menu-items'){
      this.boardMenuItems = 'board-menu-items board-menu-show';
    }else{
      this.boardMenuItems = 'board-menu-items';
    }
  }

  flipBoard(){
    if(this.board){
      this.board.flip();
    }
  }
}

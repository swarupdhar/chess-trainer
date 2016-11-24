import { Component, Input } from '@angular/core';
import { Move } from './move';
import { Chess } from '../libs/chess.js';
import { ChessBoard } from './../libs/chessboard.js';

@Component({
  selector: 'PlayBoard',
  templateUrl: 'template/play-board.component.html'
})
export class PlayBoardComponent{

  @Input() settings;
  private game; // chess js (logic)
  private board; // chessboardjs (display)
  private boardID: string; // div id
  private config:Object; // configuration for chessboardjs
  private history = [];
  private atHead:boolean;

  constructor(){
    this.boardID = "board-play";
    this.game = new Chess();
    this.atHead = true;
  }

  ngOnInit(){
    this.init();
    this.board = ChessBoard(this.boardID, this.config);
    window.onresize = this.board.resize;
    document.addEventListener("keydown", this.keyListener.bind(this));
  }

  init(){
    // if playing against computer
    if(this.settings.type == 'play-comp'){
      this.config = {
        orientation: 'white',
        position: 'start',
        dropOffBoard: 'snapback',
        pieceTheme: 'img/chesspieces/wikipedia/{piece}.png',
        draggable: true,
        onDragStart: (source, piece)=>{
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
          else{//if legal handle history
            this.history.push(this.game.fen());
          }
        },
        onSnapEnd : ()=>{
          this.board.position(this.game.fen());
        }
      };
    }
    //if playing against a friend
    else{
      this.config = {
        orientation: 'white',
        position: 'start',
        dropOffBoard: 'snapback',
        pieceTheme: 'img/chesspieces/wikipedia/{piece}.png',
        draggable: true,
        onDragStart: (source, piece)=>{
          // only let user move the piece if it is their turn and the game is not over
          if (this.game.game_over() === true || (this.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (this.game.turn() === 'b' && piece.search(/^w/) !== -1) || !this.atHead) {
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
          else{//if legal handle history
            this.history.push(this.game.fen());
            if(this.board.orientation() == 'white'){
              this.board.orientation('black');
            }else{
              this.board.orientation('white');
            }
          }
        },
        onSnapEnd : ()=>{
          this.board.position(this.game.fen());
        }
      };
    }
  }

  keyListener(e){
  }

}
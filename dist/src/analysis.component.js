"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const chess_1 = require('./libs/chess');
const chessboard_1 = require('./libs/chessboard');
const move_1 = require('./move');
let AnalysisBoardComponent = class AnalysisBoardComponent {
    // TODO: notation and engine analysis
    constructor() {
        this.boardMenuItems = "board-menu-items";
        this.boardID = "board";
        this.game = new chess_1.Chess();
        this.rootMove = new move_1.Move(this.game.fen(), '');
        this.headMove = this.rootMove;
        this.config = {
            orientation: 'white',
            position: 'start',
            dropOffBoard: 'snapback',
            pieceTheme: 'img/chesspieces/wikipedia/{piece}.png',
            draggable: true,
            onDragStart: (source, piece /*, position, orientation*/) => {
                // only let user move the piece if it is their turn and the game is not over
                if (this.game.game_over() === true || (this.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
                    (this.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
                    return false;
                }
            },
            onDrop: (source, target, piece, position, orientation) => {
                let promotion = undefined; // check if promotion needs to be passed to function
                if ((piece == 'wP' || piece == 'bP') && (target.includes('1') || target.includes('8'))) {
                    promotion = 'q'; // NOTE: always promoting to queen for simplicity
                }
                // see if the move is legal
                let move = this.game.move({ from: source, to: target, promotion: promotion });
                if (move == null)
                    return 'snapback'; // illegal move
                else {
                    let moveNode = new move_1.Move(this.game.fen(), move.san, this.headMove);
                    let index = this.headMove.hasNextMove(moveNode); // see if the move already exists (index is undefined if it does not)
                    if (index == undefined) {
                        // create a new node and add it to the next moves list
                        this.headMove.addNextMove(moveNode);
                        this.headMove = moveNode; // advance the head to the new node
                    }
                    else {
                        // just advance the head to the new node
                        this.headMove = this.headMove.getNextMove(index);
                    }
                }
            },
            onSnapEnd: () => {
                this.board.position(this.game.fen());
            }
        };
    }
    ngOnInit() {
        this.board = chessboard_1.ChessBoard(this.boardID, this.config, 'analysis');
        window.onresize = this.board.resize;
        document.addEventListener('keydown', this.keyListener.bind(this));
    }
    keyListener(event) {
        switch (event.keyCode) {
            case 39:
                this.goForward();
                break;
            case 37:
                this.goBack();
                break;
        }
    }
    goForward() {
        if (this.headMove.getMainLine()) {
            this.headMove = this.headMove.getMainLine();
            this.board.position(this.headMove.fenPosition);
            this.game.load(this.headMove.fenPosition);
        }
    }
    goBack() {
        if (this.headMove.getPreviousMove()) {
            this.headMove = this.headMove.getPreviousMove();
            this.board.position(this.headMove.fenPosition);
            this.game.load(this.headMove.fenPosition);
        }
    }
    newBoard() {
        this.game = new chess_1.Chess();
        this.rootMove = new move_1.Move(this.game.fen(), '');
        this.headMove = this.rootMove;
        this.board.position(this.headMove.fenPosition);
    }
    toggleMenu() {
        if (this.boardMenuItems === 'board-menu-items') {
            this.boardMenuItems = 'board-menu-items board-menu-show';
        }
        else {
            this.boardMenuItems = 'board-menu-items';
        }
    }
    flipBoard() {
        if (this.board) {
            this.board.flip();
        }
    }
};
AnalysisBoardComponent = __decorate([
    core_1.Component({
        selector: 'AnalysisBoard',
        templateUrl: 'template/analysis-board.component.html'
    }), 
    __metadata('design:paramtypes', [])
], AnalysisBoardComponent);
exports.AnalysisBoardComponent = AnalysisBoardComponent;

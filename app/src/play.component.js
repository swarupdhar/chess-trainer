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
const chess_js_1 = require('../libs/chess.js');
const chessboard_js_1 = require('./../libs/chessboard.js');
let PlayBoardComponent = class PlayBoardComponent {
    constructor() {
        this.history = [];
        this.boardID = "board-play";
        this.game = new chess_js_1.Chess();
        this.atHead = true;
    }
    ngOnInit() {
        this.init();
        this.board = chessboard_js_1.ChessBoard(this.boardID, this.config);
        window.onresize = this.board.resize;
        document.addEventListener("keydown", this.keyListener.bind(this));
    }
    init() {
        // if playing against computer
        if (this.settings.type == 'play-comp') {
            this.config = {
                orientation: 'white',
                position: 'start',
                dropOffBoard: 'snapback',
                pieceTheme: 'img/chesspieces/wikipedia/{piece}.png',
                draggable: true,
                onDragStart: (source, piece) => {
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
                        this.history.push(this.game.fen());
                    }
                },
                onSnapEnd: () => {
                    this.board.position(this.game.fen());
                }
            };
        }
        else {
            this.config = {
                orientation: 'white',
                position: 'start',
                dropOffBoard: 'snapback',
                pieceTheme: 'img/chesspieces/wikipedia/{piece}.png',
                draggable: true,
                onDragStart: (source, piece) => {
                    // only let user move the piece if it is their turn and the game is not over
                    if (this.game.game_over() === true || (this.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
                        (this.game.turn() === 'b' && piece.search(/^w/) !== -1) || !this.atHead) {
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
                        this.history.push(this.game.fen());
                        if (this.board.orientation() == 'white') {
                            this.board.orientation('black');
                        }
                        else {
                            this.board.orientation('white');
                        }
                    }
                },
                onSnapEnd: () => {
                    this.board.position(this.game.fen());
                }
            };
        }
    }
    keyListener(e) {
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], PlayBoardComponent.prototype, "settings", void 0);
PlayBoardComponent = __decorate([
    core_1.Component({
        selector: 'PlayBoard',
        templateUrl: 'template/play-board.component.html'
    }), 
    __metadata('design:paramtypes', [])
], PlayBoardComponent);
exports.PlayBoardComponent = PlayBoardComponent;

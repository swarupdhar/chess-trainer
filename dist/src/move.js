"use strict";
class Move {
    constructor(fenPos, notation, prevMove) {
        // TODO: use some kind of hashing to keep diferentiate one move to another
        this.fenPosition = "";
        this.notation = "";
        this.nextMoves = [];
        this.fenPosition = fenPos;
        this.notation = notation;
        this.previousMove = prevMove || undefined;
    }
    equals(node) {
        //return this.fenPosition.slice(0, this.fenPosition.length-1) === node.fenPosition.slice(0, this.fenPosition.length-1);
        return this.fenPosition === node.fenPosition;
    }
    hasNextMove(node) {
        for (let i = 0, len = this.nextMoves.length; i < len; i++) {
            if (this.nextMoves[i].equals(node))
                return i;
        }
        return undefined;
    }
    getNextMove(index) { return this.nextMoves[index]; }
    getMainLine() { return this.nextMoves[0] || undefined; }
    getPreviousMove() { return this.previousMove; }
    addNextMove(node) {
        if (!this.hasNextMove(node))
            return this.nextMoves.push(node);
    }
}
exports.Move = Move;

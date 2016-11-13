export class Move {

// TODO: use some kind of hashing to keep diferentiate one move to another

  public fenPosition:string = "";
  public notation:string = "";
  private nextMoves:Move[] = [];
  private previousMove:Move;

  constructor(fenPos:string, notation:string, prevMove?:Move){
    this.fenPosition = fenPos;
    this.notation = notation;
    this.previousMove = prevMove || undefined;
  }

  equals(node:Move):boolean{
    //return this.fenPosition.slice(0, this.fenPosition.length-1) === node.fenPosition.slice(0, this.fenPosition.length-1);
    return this.fenPosition === node.fenPosition;
  }

  hasNextMove(node:Move):number{
    for(let i = 0, len = this.nextMoves.length; i < len; i++){
      if(this.nextMoves[i].equals(node)) return i;
    }
    return undefined;
  }

  getNextMove(index:number):Move{ return this.nextMoves[index]; }

  getMainLine():Move{ return this.nextMoves[0] || undefined; }

  getPreviousMove():Move{ return this.previousMove; }

  addNextMove(node:Move):Number{
    if(!this.hasNextMove(node)) return this.nextMoves.push(node);
  }
}

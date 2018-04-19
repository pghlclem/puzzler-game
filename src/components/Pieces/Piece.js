import GameBoard from '../GameBoard';
import Engine from '../Engine';

function Piece(id, x, y) {
  this.id = id;
  this.size = GameBoard.pieceSize;
  this.width = this.size;
  this.height = this.size;
  this.x = x;
  this.y = y;
  this.color = 'rgb(255, 0, 0)';
};

Piece.prototype.update = function() {
  // No logic needed at this point
};

Piece.prototype.render = function() {
  GameBoard.ctx.fillStyle = '#ff0000';
  GameBoard.ctx.fillRect(this.x, this.y, this.width, this.height);
};

export default Piece;
import GameBoard from '../GameBoard';
import Engine from '../Engine';

function Piece(id, x, y) {
  this.id = id;
  this.size = GameBoard.pieceSize;
  this.width = this.size;
  this.height = this.size;
  this.x = x;
  this.y = y;
  this.initialX = this.x;
  this.initialY = this.y;
  this.opacity = 1;
  this.color = 'rgb(255, 0, 0)';
  this.variation = Math.floor(Math.random() * 3) + 1;
  this.border = GameBoard.assets['piece_' + this.variation + '.png'];
};

Piece.prototype.update = function() {
  // No logic needed at this point
};

Piece.prototype.render = function() {

  // Set global alpha to hide the empty space
  GameBoard.ctx.globalAlpha = this.opacity;

  // Slice the puzzle image
  GameBoard.ctx.drawImage(
    GameBoard.assets['monks.jpg'],
    this.initialX,
    this.initialY,
    this.width,
    this.height,
    this.x,
    this.y,
    this.width,
    this.height
  );

  // Draw border
  GameBoard.ctx.drawImage(this.border, this.x, this.y);

  // Reset global alpha
  GameBoard.ctx.globalAlpha = 1;
};

export default Piece;
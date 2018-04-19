import GameBoard from '../GameBoard';
import PieceManager from './PieceManager';
import Engine from '../Engine';
import Helpers from '../Helpers'

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
  this.color = 'rgb(105, 191, 180)';
  this.status = 'active';
  this.variation = Math.floor(Math.random() * 3) + 1;
  this.border = GameBoard.assets['piece_' + this.variation + '.png'];
};

Piece.prototype.update = function() {
  let status;

  if (Helpers.getObjectsDistance(this, PieceManager.empty) <= this.size + GameBoard.pieceGutter) {
    status = 'active';
  } else {
    status = 'inactive';
  }
  
  this.color = PieceManager.colors[status];
};

Piece.prototype.render = function() {

  // Set global alpha to hide the empty space
  GameBoard.ctx.globalAlpha = this.opacity;

  // Draw status color
  GameBoard.ctx.fillStyle = this.color;
  GameBoard.ctx.fillRect(this.x, this.y, this.width, this.height);

  // Slice the puzzle image
  GameBoard.ctx.drawImage(
    GameBoard.assets['monks.jpg'],
    this.initialX,
    this.initialY,
    this.width,
    this.height,
    this.x + 4,
    this.y + 4,
    this.width - 8,
    this.height - 8
  );

  // Draw border
  GameBoard.ctx.drawImage(this.border, this.x, this.y);

  // Reset global alpha
  GameBoard.ctx.globalAlpha = 1;
};

export default Piece;
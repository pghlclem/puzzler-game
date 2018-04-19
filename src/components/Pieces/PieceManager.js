import GameBoard from '../GameBoard';
import Helpers from '../Helpers';
import Piece from './Piece';

const PieceManager = {
  pieces: [],

  add: function(id, x, y) {
    const piece = new Piece(id, x, y);
    PieceManager.pieces.push(piece);

    return piece;
  },

  update: function() {
    PieceManager.pieces.forEach((piece) => piece.update());
  },

  render: function() {
    PieceManager.pieces.forEach((piece) => piece.render());
  }
}

export default PieceManager;
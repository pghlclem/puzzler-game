import GameBoard from '../GameBoard';
import Helpers from '../Helpers';
import Piece from './Piece';
import _ from 'lodash';

const PieceManager = {
  pieces: [],
  colors: {
    active: 'rgb(105, 191, 180)',
    inactive: 'rgb(190, 25, 25)',
    success: 'rgb(25, 215, 25)'
  },
  empty: null,

  add: function(id, x, y) {
    const piece = new Piece(id, x, y);
    PieceManager.pieces.push(piece);

    return piece;
  },

  move: function(piece) {
    let x = PieceManager.empty.x;
    let y = PieceManager.empty.y;

    // Move piece to empty position
    var tl = new TimelineMax({onComplete: PieceManager.onMoveComplete})
    .to(piece, 0.32, {x: x, y: y, ease: Power2.easeInOut});

    // Swap empty position to old piece position
    PieceManager.empty.x = piece.x;
    PieceManager.empty.y = piece.y;

    // Swap Array index for piece and empty
    let a = PieceManager.pieces.indexOf(piece);
    let b = PieceManager.pieces.indexOf(PieceManager.empty);
    PieceManager.pieces[a] = PieceManager.empty;
    PieceManager.pieces[b] = piece;
  },
  
  shuffle: function() {
    // Shuffle pieces using underscore
    PieceManager.pieces = _.shuffle(PieceManager.pieces);

    // Update positions for the shuffled pieces
    PieceManager.pieces.forEach((piece, index) => {
      piece.x = GameBoard.grid[index].x;
      piece.y = GameBoard.grid[index].y;
    });
  },

  getPieceByClick: function() {
    let selected = PieceManager.pieces.filter((piece) =>
      // Filter down to pieces surrounding the empty space
      Helpers.getObjectsDistance(piece, PieceManager.empty) <= piece.size + GameBoard.pieceGutter
    ).find((piece) =>
      // Find which movable piece that was selected
      Helpers.getPointCollision(GameBoard.mousePos, piece)
    );

    // Ignore the empty piece
    selected = (selected !== PieceManager.empty) ? selected : undefined;

    return selected;
  },

  onMoveComplete: function() {
    GameBoard.interactable = true;
    GameBoard.validateBoard();
  },

  update: function() {
    PieceManager.pieces.forEach((piece) => piece.update());
  },

  render: function() {
    PieceManager.pieces.forEach((piece) => piece.render());
  }
}

export default PieceManager;
import Engine from './Engine';
import Helpers from './Helpers';
import PieceManager from './Pieces/PieceManager';

const GameBoard = {
  mousePos: {x: null, y: null},
  assets: [],
  grid: [],
  difficuly: 4,
  pieceSize: 100,
  pieceGutter: 2,
  interactable: true,
  success: false,

  init: function() {
    GameBoard.shuffleBtn = document.getElementById('shuffle-btn');
    GameBoard.canvas = document.getElementById('game-canvas');
    GameBoard.ctx = GameBoard.canvas.getContext('2d');
    
    // Create grid
    for (let i = 0; i < GameBoard.difficuly; i++) {
      for (let j = 0; j < GameBoard.difficuly; j++) {
        GameBoard.grid.push({
          x: (GameBoard.pieceSize + GameBoard.pieceGutter) * j,
          y: (GameBoard.pieceSize + GameBoard.pieceGutter) * i
        });
      }
    }
   
    // Create pieces
    GameBoard.grid.forEach((grid, index) => {
      let piece = PieceManager.add(index, grid.x, grid.y);
      
      // Set reference for empty piece and hide it
      if (index === GameBoard.grid.length - 1) {
        PieceManager.empty = piece;
        piece.opacity = 0;
      }
    });

    // Run the engine
    Engine.addToGameLoop(PieceManager);
    Engine.start();

    // Add mouse listeners
    GameBoard.canvas.addEventListener('click', GameBoard.onMouseClickHandler);
    GameBoard.canvas.addEventListener('mousemove', GameBoard.onMouseMoveHandler);
    GameBoard.shuffleBtn.addEventListener('click', GameBoard.shuffleBoard);
  },

  shuffleBoard: function() {
     // Shuffle pieces
     var tl = new TimelineMax();
     for (var i = 0; i < 20; i++) {
       tl.call(PieceManager.shuffle, [], this, "+= 0.05")
     }
     
     // Activate interaction
     tl.call(() => GameBoard.interactable = true);
  },

  validateBoard: function() {
    // Validate the empty piece position
    if (PieceManager.pieces[PieceManager.pieces.length - 1] !== PieceManager.empty) return;

    // If empty piece is in the correct place, validate rest of board
    let success = PieceManager.pieces.every((piece, index) => {
      return piece.id === index;
    });

    if (success) GameBoard.onSuccess();
  },

  onSuccess: function() {
    GameBoard.interactable = false;
    GameBoard.success = true;
    GameBoard.shuffleBtn.style.display = 'none';
    TweenMax.to(PieceManager.empty, 0.32, {opacity: 1, ease: Power2.easeInOut});
  },
  
  onMouseClickHandler: function(e) {
    if (!GameBoard.interactable) return;

    // Find clicked piece
    let piece = PieceManager.getPieceByClick();

    // If clicked piece is a valid move
    if (piece) {
      GameBoard.interactable = false;
      PieceManager.move(piece);
    }
  },
  
  onMouseMoveHandler: function(e) {
    GameBoard.mousePos = Helpers.getMousePos(GameBoard.canvas, e);
  }
}

export default GameBoard;
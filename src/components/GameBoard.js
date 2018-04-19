import Engine from './Engine';
import Helpers from './Helpers';
import PieceManager from './Pieces/PieceManager';

const GameBoard = {
  mousePos: {x: null, y: null},
  grid: [],
  difficuly: 4,
  pieceSize: 100,
  pieceGutter: 2,

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
    console.log('Shuffle');
 },
  
  onMouseClickHandler: function(e) {
    console.log('Click');
  },
  
  onMouseMoveHandler: function(e) {
    GameBoard.mousePos = Helpers.getMousePos(GameBoard.canvas, e);
  }
}

export default GameBoard;
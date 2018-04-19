import Engine from './Engine';

const GameBoard = {
  mousePos: {x: null, y: null},

  init: function() {
    GameBoard.shuffleBtn = document.getElementById('shuffle-btn');
    GameBoard.canvas = document.getElementById('game-canvas');
    GameBoard.ctx = GameBoard.canvas.getContext('2d');

    // Run the engine
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
    console.log('Move');
  }
}

export default GameBoard;
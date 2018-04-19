import GameBoard from "./GameBoard";

const Engine = {
  isRunning: false,
  objectsToUpdate: [],
  then: undefined,

  start: function() {
    Engine.isRunning = true;
    Engine.gameLoop();
  },

  addToGameLoop: function(object) {
    Engine.objectsToUpdate.push(object);
  },

  removeFromGameLoop: function(object) {
    var length = Engine.objectsToUpdate.length;

    for (i = 0; i < length; i++) {
      if (Engine.objectsToUpdate[i] == object) {
        console.log("Removing object: ", object);
        return;
      }
    }
  },

  gameLoop: function() {
    var now = Date.now();
    var delta = now - Engine.then;

    if (Engine.isRunning) {
      Engine.render();
      Engine.update(delta);
      requestAnimationFrame(Engine.gameLoop);
    }

    Engine.then = now;
  },

  update: function(delta) {
    var length = Engine.objectsToUpdate.length;
    
    for (let i = 0; i < length; i++) {  
      if (typeof(Engine.objectsToUpdate[i].update) !== 'undefined') {
        Engine.objectsToUpdate[i].update(delta);

        if (typeof(Engine.objectsToUpdate[i].render) !== 'undefined') {
          Engine.objectsToUpdate[i].render();
        }
      } else {
        throw new Error('Engine::update: ' + Engine.objectsToUpdate[i] + ' is missing an update() function');
        return;
      }
    }
  },

  render: function() {
    GameBoard.ctx.clearRect(0, 0, GameBoard.canvas.width, GameBoard.canvas.height);
  }
}

export default Engine;
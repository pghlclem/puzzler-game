import GameBoard from './components/GameBoard';
import styles from './index.css';

(function(global) {

  // Require all assets
  const assets = importAll(require.context('./assets/', false, /\.(png|jpe?g|svg)$/));
  let assetsLoaded = 0;

  // Preload assets
  assets.forEach(asset => {
    let img = new Image();
    img.src = asset;
    
    img.onload = () => {
      GameBoard.assets[asset] = img;
      assetsLoaded++;

      // Initiate GameBoard when all assets are loaded
      if (assetsLoaded === assets.length) {
        GameBoard.init();
      }
    }
  });


  global.GameBoard = GameBoard;

  function importAll(require) {
    return require.keys().map(require);
  }
})(window);
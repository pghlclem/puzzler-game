import GameBoard from './components/GameBoard';
import styles from './index.css';

(function(global) {
  GameBoard.init();
  global.GameBoard = GameBoard;
})(window);
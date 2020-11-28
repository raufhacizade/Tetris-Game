<p align="center">
  <a href="https://raufhacizade.github.io/Tetris-Game/">
     <img src="Tetris_logo.png" width="50%" title="Play The Game">
  </a>
</p>

<h2 align="center"> This game was created as a responsive web project. The main logic of the game is created by using pure JavaScript and HTML, CSS.</h2>
<br/>

If you want to play the game before dive deep into the source code, you can click [here](https://raufhacizade.github.io/Tetris-Game/) or the picture above. It is also recommended that you know what the Tetris game is and how it is played. You can get detailed info about this from this [link](https://en.wikipedia.org/wiki/Tetris).
<br/>

First of all, here is what you need to know about the Tetris game.The main pieces of the game concept are **The game board, Tetrominoes, Walls, Square.**
<br/>

**The game board** - The game is played on a board that will be implemented to HTML Canvas element, that has 17 rows and 10 columns. We can consider that a 2d array.
<br/>

**Tetrominoes** are the main figures in the game. There are 7 different pieces in the shape of  Z, T, L, O, I, J, and S letters. These tetrominoes are able to move to the right, to the left, and rotate. Also, Tetrominoes always have to fall down until they reach the bottom. When the Tetromino hits the bottom, we lock it on the board. Then the game should generate a new one randomly.

<p align="center">
   <img src="blocksOfTetris.png" width="50%" width=50%" title="Tetrominoes">
</p>

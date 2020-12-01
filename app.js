const canvas=document.querySelector("#game-board");
const ctx =canvas.getContext("2d");
const scoreText=document.querySelector(".score-table h3");

const row=20;
const column=10;
const sqSize=29; 
const VACANT="white";
let  board;
let w = document.body.clientWidth;

let score = 0;
let gameOver=false;
let dropStart=Date.now();

const I=[
         [[0,1,0,0],
          [0,1,0,0],
          [0,1,0,0],
          [0,1,0,0]],

         [[0,0,0,0],
          [1,1,1,1],
          [0,0,0,0],
          [0,0,0,0]],

         [[0,0,1,0],
          [0,0,1,0],
          [0,0,1,0],
          [0,0,1,0]],

         [[0,0,0,0],
          [0,0,0,0],
          [1,1,1,1],
          [0,0,0,0]]
];

const J=[
         [[0,1,0],
          [0,1,0],
          [1,1,0]],

         [[1,0,0],
          [1,1,1],
          [0,0,0]],

         [[0,1,1],
          [0,1,0],
          [0,1,0]],

         [[0,0,0],
          [1,1,1],
          [0,0,1]]
];

const L=[
         [[0,1,0],
          [0,1,0],
          [0,1,1]],

         [[0,0,0],
          [1,1,1],
          [1,0,0]],

         [[1,1,0],
          [0,1,0],
          [0,1,0]],

         [[0,0,1],
          [1,1,1],
          [0,0,0]]
];

const O=[
         [[0,0,0,0],
          [0,1,1,0],
          [0,1,1,0],
          [0,0,0,0]],

         [[0,0,0,0],
          [0,1,1,0],
          [0,1,1,0],
          [0,0,0,0]],

         [[0,0,0,0],
          [0,1,1,0],
          [0,1,1,0],
          [0,0,0,0]],

         [[0,0,0,0],
          [0,1,1,0],
          [0,1,1,0],
          [0,0,0,0]]
];

const S=[
         [[0,1,1],
          [1,1,0],
          [0,0,0]],

         [[0,1,0],
          [0,1,1],
          [0,0,1]],

         [[0,0,0],
          [0,1,1],
          [1,1,0]],

         [[1,0,0],
          [1,1,0],
          [0,1,0]]
];

const T=[
         [[0,0,0],
          [1,1,1],
          [0,1,0]],

         [[0,1,0],
          [1,1,0],
          [0,1,0]],

         [[0,1,0],
          [1,1,1],
          [0,0,0]],

         [[0,1,0],
          [0,1,1],
          [0,1,0]]
];

const Z=[
         [[1,1,0],
          [0,1,1],
          [0,0,0]],

         [[0,0,1],
          [0,1,1],
          [0,1,0]],

         [[0,0,0],
          [1,1,0],
          [0,1,1]],

         [[0,1,0],
          [1,1,0],
          [1,0,0]]
];

const PIECES=[
        // [I,"blue"],
        // [J,"orange"],
        // [L,"purple"],
        // [O,"indigo"],
        // [S,"green"],
        // [T,"cyan"],
        // [Z,"red"]

        [I, "#2020FF"],
        [J,"#FF8040"],
        [L,"#9F009F"],
        [O,"indigo"],
        [S,"#00D200"],
        [T,"cyan"],
        [Z,"#FF0000"]
     ];

function fillBoard(){
  board=[];
  for (var r = 0; r < row; r++) {
    board[r]=[];
    for (var c = 0; c < column; c++) {
      board[r][c]=VACANT;
    }
  }//end of board
}

const drawSquare=(x,y,color)=>{
  ctx.fillStyle=color;
  ctx.fillRect(x*sqSize,y*sqSize,sqSize,sqSize);
  ctx.strokeStyle="lightgrey";
  ctx.strokeRect(x*sqSize,y*sqSize,sqSize,sqSize);
}//end of drawSquare

const drawBoard=()=>{
  for (var r = 0; r < row; r++) {
    for (var c = 0; c < column; c++) {
      drawSquare(c,r,board[r][c]);
    }
  }
}//end of drawBoard

function Piece(tetromino,color){
   this.tetromino=tetromino;
   this.tetrominoN=0;
   this.activeTetromino=this.tetromino[this.tetrominoN];
   this.color=color;

   this.x=3;
   this.y=-2;

   this.moveLeft=()=>{
     if (!this.collision(-1,0,this.activeTetromino)) {
       this.unDrawn();
       this.x--;
       this.Drawn();
     }else{

     }
   }//end of moveLeft

   this.moveRight=()=>{
     if (!this.collision(1,0,this.activeTetromino)) {
         this.unDrawn();
         this.x++;
         this.Drawn();
     }else {

     }
   }//end of moveRight

   this.rotate=()=>{
     let nextPattern=this.tetromino[(this.tetrominoN+1)%this.tetromino.length];
     let kick=0;

     if (this.collision(0,0,nextPattern)) {
           if (this.x<column/2) {
                  kick=-1;
           }else {
                  kick= 1;
           }
     }
     if (!this.collision(kick,0,nextPattern)) {
           this.unDrawn();
           this.x+=kick;
           this.tetrominoN=(this.tetrominoN+1)%this.tetromino.length;
           this.activeTetromino=this.tetromino[this.tetrominoN];
           this.Drawn();
     }
   }//end of rotate

   this.moveDown=()=>{
     if (!this.collision(0,1,this.activeTetromino)) {
         this.unDrawn();
         this.y++;
         this.Drawn();
     }else {
          this.lock();
          piece=randomPiece();
     }
   }//end of moveDown

   this.Drawn=()=>{
     this.display(this.color);
   }//end of Drawn

   this.unDrawn=()=>{
     this.display(VACANT);
   }//end of unDrawn

   this.display=(currentColor)=>{
     for (var r = 0; r < this.activeTetromino.length; r++) {
       for (var c = 0; c < this.activeTetromino.length; c++) {
           if (this.activeTetromino[c][r]) {
             drawSquare(this.x+r,this.y+c,currentColor);
           }
       }
     }
   }//end of display

   this.collision=(x,y,piece)=>{
     for (var r = 0; r < piece.length; r++) {
       for (var c = 0;c <  piece.length; c++) {
         if (!piece[r][c]){
           continue;
         }
         let newX=this.x + c + x;
         let newY=this.y + r + y;

         if (newX < 0 || newX >= column || newY >= row) {
           return true;
         }
         if (newY < 0) {
           continue;
         }
         if (board[newY][newX] != VACANT) {
              return true;
         }
       }
     }
     return false;
   }//End of collision

   this.lock=()=>{
     for (var r = 0; r < this.activeTetromino.length; r++) {
       for (var c = 0; c < this.activeTetromino.length; c++) {
         if (!this.activeTetromino[r][c]) {
            continue;
         }
         if (this.y+r < 0) {
            
            document.getElementById("re-startBTN").style.display = "block";
            gameOver=true;
            break;
         }
         board[this.y+r][this.x+c]="grey";
       }
     }

     for (var r = 0; r < row; r++) {
       let isRowFull=true;
       for (var c = 0; c < column; c++) {
          isRowFull=isRowFull && (board[r][c] != VACANT);
       }
       if(isRowFull){
           for ( y=r; y > 1; y--) {
              for (var c= 0; c<column; c++) {
                  board[y][c]=board[y-1][c];
              }
           }
           for (var c= 0; c<column; c++) {
               board[0][c]=VACANT;
           }
           animateValue(score, score+10, 550)
           score+=10;
          //  scoreText.innerHTML="Score is <b>"+score+"</b>";
       }
     }
      drawBoard();
   }//end of lock

}//End OF Piece

function CONTROL(event){
  if (event.keyCode==37 || event.keyCode== 65 ) {
    piece.moveLeft();
  }else if (event.keyCode==38 || event.keyCode== 87) {
    piece.rotate();
  }else if (event.keyCode==39 || event.keyCode== 68) {
    piece.moveRight();
  }else if (event.keyCode==40 || event.keyCode== 83) {
    piece.moveDown();
  }
}//end Of CONTROL

function controlByBtn(btnCode){
  if (btnCode == 1) {
    piece.moveLeft();
  }else if (btnCode == 2) {
    piece.rotate();
  }else if (btnCode == 3) {
    piece.moveDown();
  }else if (btnCode == 4) {
    piece.moveRight();
  }
}//end Of CONTROL

function randomPiece(){
  let randomN=Math.floor(Math.random()*PIECES.length);
  return new Piece(PIECES[randomN][0],PIECES[randomN][1]);
}//end of randomPiece

function drop(){
  let now=Date.now();
  let delta=now-dropStart;

  if (delta>500) {
    piece.moveDown();
    dropStart=Date.now();
  }
  if (!gameOver) {
    requestAnimationFrame(drop);
  }
}//end of drop


function start(){
  reportWindowSize();
  window.addEventListener('resize', reportWindowSize);
  document.getElementById("startBTN").style.display = "none";
  document.getElementById("main").style.display = "block";

  
  fillBoard();
  drawBoard();
  piece=randomPiece();
  drop();
  scoreText.innerHTML="Score is 0";
  document.addEventListener("keydown",CONTROL);
  return false;
}

function reStart(){
  reportWindowSize();
  window.addEventListener('resize', reportWindowSize);
  animateValue(score, 0, 250);
  score = 0;
  gameOver=false;
  dropStart=Date.now();
  fillBoard();
  drawBoard();
  piece=randomPiece();
  drop();
  document.getElementById("re-startBTN").style.display = "none";
  document.addEventListener("keydown",CONTROL);
  return false;
}

function animateValue(start, end, duration) {
  if (start === end) return;
  var range = end - start;
  var current = start;
  var increment = end > start? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));
  var timer = setInterval(function() {
      current += increment;
      scoreText.innerHTML="Score is " + current;
      if (current == end) {
          clearInterval(timer);
      }
  }, stepTime);
}

function reportWindowSize() {
  if(document.body.offsetWidth<769){
    document.getElementById("footer").style.display = "block";
  }else{
    document.getElementById("footer").style.display = "none";
  }
}

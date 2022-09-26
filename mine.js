var gBoard = {
  minesAroundCount: 0,
  isShown: true,
  isMine: false,
  isMarked: true,
};


var gLevel = {
  beginner: {
    SIZE: 4,
    MINES: 2,
  },
  medium: {
    SIZE: 8,
    MINES: 14,
  },
  expert: {
    SIZE: 12,
    MINES: 32,
  },
};

var MINE = "💣";
var minesCount;
var gGame = {
  isOn: true,
  showCount: 0,
  markedCount: 0,
  secPassed: 0,
};

var beginner = buildBoard(gLevel.beginner);
var medium = buildBoard(gLevel.medium);
var expert = buildBoard(gLevel.expert);


function buildBoard(level) {
  var board = [];
  for (var i = 0; i < level.SIZE; i++) {
    var row = [];
    for (var j = 0; j < level.SIZE; j++) {
      row.push("");
    }
    board.push(row);
  }
  console.table(board);
  return board;
}

// finding how much mines count, after that rendering to the currentCell:
function setMinesNegsCount(board, negI, negJ) {
  var negsCount = 0;
  for (var i = negI - 1; i <= negI + 1; i++) {
    if (i < 0 || i > board.length - 1) continue;
    for (var j = negJ - 1; j <= negJ + 1; j++) {
      if (j < 0 || j > board[i].length) continue;
      if (i === negI && j === negJ) continue;
      if (board[i][j] === MINE) {
        negsCount++;
      }
    }
  }
  return negsCount;
}

// trying to figure out the logic:
// /////////////////////////////////   00  01  02  /////////////
// /////////////////////////////////   10  11  12  /////////////
// /////////////////////////////////   20  21  22  /////////////
//

function renderBoard(board) {
  var elBoard = document.querySelector(".mine-board");

  var strHTML = ``;
  var counter = 0;
  for (var i = 0; i < board.length; i++) {
    strHTML += `\n<tr>\n`;
    for (var j = 0; j < board.length; j++) {
      var currentCell = board[i][j];
      var negs = setMinesNegsCount(board, i, j);

      if (board.length === 4) {
        gBoard.minesAroundCount= gLevel.beginner.MINES
      } else if (board.length === 8) {
        gBoard.minesAroundCount =  gLevel.medium.MINES
      } else if (board.length === 12) {
       gBoard.minesAroundCount= gLevel.expert.MINES
      }

      while (counter < gBoard.minesAroundCount) {
        board[getRandomIntInclusive(i, board.length - 1)][
          getRandomIntInclusive(j, board.length - 1)
        ] = MINE;
        gBoard.minesAroundCount;
        counter++;
      }
      if (board[i][j] !== MINE) {
        board[i][j] = negs;
      }
      var cellClass = getClassName({ i, j });
      strHTML += `\t\n<td class="${cellClass}" onmousedown="cellMarked(this,${i},${j})"  onclick="cellClicked(this,${i},${j})">
      </td>`;
    }
  }
  console.table(board);
  strHTML += `\t\n</tr>\n`;
  minesCount = gBoard.minesAroundCount
  elBoard.innerHTML = strHTML;
}

function cellClicked(elCell, elCellI, elCellJ) {
  var board;
  if (gGame.isOn) {
    if (minesCount === 2) {
      board = beginner
    } else if (minesCount === 14) {
      board = medium
    } else if (minesCount===32) {
      board = expert
    };
    var elTd = document.querySelector("td");
    var elH2 = document.querySelector("h2");
    var currentCell = board[elCellI][elCellJ];
    elTd = elCell;
    
    elTd.innerHTML = currentCell;
    if(currentCell || currentCell === 0 ){
      if(gGame.showCount === 1){
        timer()
      }
      if(gGame.showCount === ( board.length**2) - minesCount && gGame.markedCount === minesCount ){
        console.log("gameover")
      }
            gGame.showCount++
    }
    if (currentCell === 0) {
      elTd.style.backgroundColor = "white";
    }
    if (currentCell === "💣") {
    var elH3 = document.querySelector(".life")
    elH2.innerHTML = `🤯`;
    gGame.isOn = false;

  }
}
}




function cellMarked(elCell, elCellI, elCellJ) {
  var board;
  if (gGame.isOn) {
    if (minesCount === 2) {
      board = beginner
    } else if (minesCount === 14) {
    board = medium
    } else if (minesCount===32) {
     board = expert
    };
    var elTd = document.querySelector("td");
    var currentCell = board[elCellI][elCellJ];
    elTd = elCell;
    elTd.innerHTML = "🚩";
    if (currentCell === 0) {
      elTd.style.backgroundColor = "white";
      elTd.innerHTML = "";
    }
    if (currentCell === MINE) {
        gGame.markedCount++
    
    }
  }
  }

function checkGameOver() {}

function expandShown(board, elCell, i, j) {}

// Returns a random number inclusively
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Returns the class name for a specific cell
function getClassName(location) {
  var cellClass = `${location.i}-${location.j}`;
  return cellClass;
}

function timer() {
  var sec = 60;
  var timer = setInterval(() => {
  var elTimer = document.querySelector(".safeTimerDisplay");
    elTimer.innerHTML = `00:${sec}`;
    sec--;
    if (sec < 0 ) {
      elTimer.style.display = "none";
      clearInterval(timer);
    }
  }, 1000);
  if(sec === 0){
    return
  }
}


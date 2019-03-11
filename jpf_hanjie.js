"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Tutorial Case

   Author: Khalel Abaquin
   Date:   3.5.19

   Global Variables
   ================
   
   puzzleCells
      References the TD cells within the Hanjie table grid.
   
   cellBackground
      Stores the current background color of the puzzle
      cells during the mouseover event.
      
      
   Function List
   =============

   init()
      Run when the web page is loaded; displays puzzle 1
      and loads the event handlers for the web page buttons.
      
   setupPuzzle()
      Sets up a new puzzle, adding the event handlers for
      every puzzle cell.      

   swapPuzzle(e)
      Swaps one puzzle for another based on the button being clicked
      by the user. Confirms the change before swapping in the
      new puzzle.

   setBackground(e)
      Sets the background color of the puzzle cells during the mousedown
      event

   extendBackground(e)
      Extends the background color of the original puzzle cell during
      the mouseenter event.
      
   endBackground()
      Ends the action of extending the cell backgrounds in response to the
      mouseup event.

   drawPuzzle(hint, rating, puzzle)
      Returns a text string of the HTML code to
      display a hanjie Web table based on the contents of
      multi-dimensional array, puzzle.
	
*/

window.onload = init;

var puzzleCells;
var cellBackground;

function init() {
      //Insert title for first puzzle
      document.getElementById("puzzleTitle").innerHTML = "Puzzle 1";
      //Insert HTML code for first puzzle table
      document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);
      //Add event handlers for event puzzle buttons
      var puzzleButtons = document.getElementsByClassName("puzzles");
      for (var i = 0; i < puzzleButtons.length; i++) {
            puzzleButtons[i].onclick = swapPuzzle;
      }
      setupPuzzle();
}

function swapPuzzle(e) {
      //Retrieve id of clicked button
      var puzzleID = e.target.id;
      //Retrieve value of clicked button
      var puzzleTitle = e.target.value;
      document.getElementById("puzzleTitle").innerHTML = puzzleTitle;
      //Display puzz;e based on value of puzzleID variable
      switch (puzzleID) {
            case "puzzle1":
                  document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);
                  break;
            case "puzzle2":
                  document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle2Hint, puzzle2Rating, puzzle2);
                  break;
            case "puzzle3":
                  document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle3Hint, puzzle3Rating, puzzle3);
                  break;
      }
      setupPuzzle();
}

//Add event listener for mouseup event
document.addEventListener("mouseup", endBackground);

//Add event listener to show solution button
document.getElementById("solve").addEventListener("click", function () {
      //Remove inline background color style from each cell
      for (var i = 0; i < puzzleCells.length; i++) {
            puzzleCells[i].style.backgroundColor = "";
      }
});

function setupPuzzle() {
      //Match all data cells in puzzle
      puzzleCells = document.querySelectorAll("table#hanjieGrid td");
      //Set intial color of each cell to gold
      for (var i = 0; i < puzzleCells.length; i++) {
            puzzleCells[i].style.backgroundColor = "rgb(233, 207, 29)";
            //Set cell background color in resonse to mousedown event
            puzzleCells[i].onmousedown = setBackground;
            //Use pencil image as cursor
            puzzleCells[i].style.cursor = "url(jpf_pencil.png), pointer";
      }
      //Create object collections of the filled & empty cells
      var filled = document.querySelectorAll("table#hanjieGrid td.filled");
      var empty = document.querySelectorAll("table#hanjieGrid td.empty");

      //Create event listener to highlight incorrect cells
      document.getElementById("peek").addEventListener("click", function () {
            //Display incorrect white cells in pink
            for (var i = 0; i < filled.length; i++) {
                  if (filled[i].style.backgroundColor === "rgb(255, 255, 255)") {
                        filled[i].style.backgroundColor = "rgb(255, 211, 211)";
                  }
            }
      });
}

function setBackground(e) {
      var cursorType;
      // cellBackground = "rgb(101, 101, 101)";
      //Set background based on keyboard event
      if (e.shiftKey) {
            cellBackground = "rgb(233, 207, 23)";
            cursorType = "url(jpf_eraser.png), cell";
      } else if (e.altKey) {
            cursorType = "url(jpf_cross.png), crosshair";
            cellBackground = "rgb(255, 255, 255)";
      } else {
            cursorType = "url(jpf_pencil.png), pointer";
            cellBackground = "rgb(101, 101, 101)";
      }
      e.target.style.backgroundColor = cellBackground;
      //Create event listener for every puzzle cell
      for (var i = 0; i < puzzleCells.length; i++) {
            puzzleCells[i].addEventListener("mouseenter", extendBackground);
            puzzleCells[i].style.cursor = cursorType;
      }
      //Prevent default action of selecting table text
      e.preventDefault();
}

function extendBackground(e) {
      e.target.style.backgroundColor = cellBackground;
}

function endBackground() {
      //Remove event listener for every puzzle cell
      for (var i = 0; i < puzzleCells.length; i++) {
            puzzleCells[i].removeEventListener("mouseenter", extendBackground);
      }
}

/* ================================================================= */

function drawPuzzle(hint, rating, puzzle) {

      /* Initial HTML String for the Hanjie Puzzle */
      var htmlString = "";

      /* puzzle is a multidimensional array containing the
         Hanjie puzzle layout. Marked cells are indicated by
         the # character. Empty cells are indicated by an
         empty text string. First, determine the number of rows
         and columns in the puzzle */

      var totalRows = puzzle.length;
      var totalCols = puzzle[0].length;

      /* Loop through the rows to create the rowCount array
         containing the totals for each row in the puzzle */

      var rowCount = [];
      var spaceCount;
      for (var i = 0; i < totalRows; i++) {
            rowCount[i] = "";
            spaceCount = 0;

            for (var j = 0; j < totalCols; j++) {
                  if (puzzle[i][j] === "#") {
                        spaceCount++;
                        if (j === totalCols - 1) {
                              rowCount[i] += spaceCount + "&nbsp;&nbsp;";
                        }
                  } else {
                        if (spaceCount > 0) {
                              rowCount[i] += spaceCount + "&nbsp;&nbsp;";
                              spaceCount = 0;
                        }
                  }
            }

      }

      /* Loop through the columns to create the colCount array
         containing the totals for each column in the puzzle */

      var colCount = [];
      for (var j = 0; j < totalCols; j++) {
            colCount[j] = "";
            spaceCount = 0;

            for (var i = 0; i < totalRows; i++) {
                  if (puzzle[i][j] === "#") {
                        spaceCount++;
                        if (i === totalRows - 1) {
                              colCount[j] += spaceCount + "<br />";
                        }
                  } else {
                        if (spaceCount > 0) {
                              colCount[j] += spaceCount + "<br />";
                              spaceCount = 0;
                        }
                  }
            }

      }

      /* Create a Web table with the id, hanjieGrid, containing
         headers with the row and column totals.
         Each marked cell has the class name, marked; each
         empty cell has the class name, empty */

      htmlString = "<table id='hanjieGrid'>";
      htmlString += "<caption>" + hint + " (" + rating + ")</caption>";
      htmlString += "<tr><th></th>";

      for (var j = 0; j < totalCols; j++) {
            htmlString += "<th class='cols'>" + colCount[j] + "</th>";
      }
      htmlString += "</tr>";

      for (var i = 0; i < totalRows; i++) {
            htmlString += "<tr><th class='rows'>&nbsp;" + rowCount[i] + "</th>";

            for (var j = 0; j < totalCols; j++) {
                  if (puzzle[i][j] === "#") {
                        htmlString += "<td  class='filled'></td>";
                  } else {
                        htmlString += "<td class='empty'></td>";
                  }
            }

            htmlString += "</tr>";
      }

      htmlString += "</table>";

      return htmlString;
}
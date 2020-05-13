"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Field = /*#__PURE__*/function () {
  function Field(element) {
    var mines = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 700;
    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 700;
    var resolution = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 70;

    _classCallCheck(this, Field);

    this.element = element;
    this.width = width;
    this.height = height;
    this.resolution = resolution;
    this.mines = mines;
    this.cols = Math.ceil(this.width / this.resolution);
    this.rows = Math.ceil(this.height / this.resolution);
    this.element.style.height = this.height + "px";
    this.element.style.width = this.width + "px";
    this.minesweeper;
    this.minesPlaced = [];
    this.bombValue = "bomb";
    this.fontSize = 15;
    this.grassClossedColorHover = "#1F6D04";
    this.grassClossedColor = "#79bf00";
    this.grassOpenedColor = "#b6ff38";
  }

  _createClass(Field, [{
    key: "build",
    value: function build() {
      var field = this.generateMap();
      var fieldMined = this.placeMines(field);
      var fieldHints = this.placeHints(fieldMined);
      this.minesweeper = fieldHints;
      fields.draw(fieldHints);
    }
  }, {
    key: "defeat",
    value: function defeat() {
      alert("You lose!");
      this.reset();
    }
  }, {
    key: "generateMap",
    value: function generateMap() {
      var _this = this;

      return new Array(this.cols).fill(null).map(function () {
        return new Array(_this.rows).fill(null).map(function () {
          return {
            value: "0",
            state: "closed"
          };
        });
      });
    }
  }, {
    key: "placeMines",
    value: function placeMines(field) {
      var mines = this.mines;
      var placed = 0;

      while (placed < mines) {
        var minePlaced = false;

        for (var col = 0; col < field.length; col++) {
          if (minePlaced) {
            break;
          }

          for (var row = 0; row < field[col].length; row++) {
            if (minePlaced) {
              break;
            }

            var placeMineRandom = Math.random();

            if (placeMineRandom < 0.00001 && minePlaced == false && field[col][row].value !== this.bombValue) {
              field[col][row].value = this.bombValue;
              this.minesPlaced.push({
                i: col,
                j: row
              });
              placed++;
              minePlaced = true;
            }
          }
        }
      }

      return field;
    }
  }, {
    key: "placeHints",
    value: function placeHints(field) {
      for (var col = 0; col < field.length; col++) {
        for (var row = 0; row < field[col].length; row++) {
          if (field[col][row].value !== this.bombValue) {
            var hints = 0;

            if (row < this.rows - 1) {
              // TOP
              if (field[col][row + 1].value == this.bombValue) {
                hints += 1;
              }
            }

            if (row > 0) {
              // DOWN
              if (field[col][row - 1].value == this.bombValue) {
                hints += 1;
              }
            }

            if (col > 0) {
              // LEFT
              if (field[col - 1][row].value == this.bombValue) {
                hints += 1;
              }
            }

            if (col < this.cols - 1) {
              // RIGHT
              if (field[col + 1][row].value == this.bombValue) {
                hints += 1;
              }
            }

            if (row < this.rows - 1 && col < this.cols - 1) {
              // TOP LEFT
              if (field[col + 1][row + 1].value == this.bombValue) {
                hints += 1;
              }
            }

            if (col > 0 && row < this.rows - 1) {
              // TOP RIGHT
              if (field[col - 1][row + 1].value == this.bombValue) {
                hints += 1;
              }
            }

            if (row > 0 && col > 0) {
              // DOWN RIGHT
              if (field[col - 1][row - 1].value == this.bombValue) {
                hints += 1;
              }
            }

            if (row > 0 && col < this.cols - 1) {
              // DOWN LEFT
              if (field[col + 1][row - 1].value == this.bombValue) {
                hints += 1;
              }
            }

            if (hints == 0) {
              hints = " ";
            }

            field[col][row].value = hints;
          }
        }
      }

      return field;
    }
  }, {
    key: "openTile",
    value: function openTile(i, j, element) {
      var cell = this.minesweeper[i][j];

      if (cell.state == "open") {
        return;
      }

      this.minesweeper[i][j].state = "open";

      if (cell.value == this.bombValue) {
        this.openAllTiles();
        this.defeat();
        return;
      }

      element.innerText = cell.value;
      element.style.backgroundColor = this.grassOpenedColor;

      if (cell.value == " ") {
        this.openEmptyNeighbors(i, j);
      }
    }
  }, {
    key: "openEmptyNeighbors",
    value: function openEmptyNeighbors(col, row) {
      if (row < this.rows - 1) {
        // TOP
        if (this.minesweeper[col][row + 1].value !== this.bombValue && this.minesweeper[col][row + 1].state !== "open") {
          this.displayTile(this.minesweeper[col][row + 1], col, row + 1);

          if (this.minesweeper[col][row + 1].value == " ") {
            this.openEmptyNeighbors(col, row + 1);
          }
        }
      }

      if (row > 0) {
        // DOWN
        if (this.minesweeper[col][row - 1].value !== this.bombValue && this.minesweeper[col][row - 1].state !== "open") {
          this.displayTile(this.minesweeper[col][row - 1], col, row - 1);

          if (this.minesweeper[col][row - 1].value == " ") {
            this.openEmptyNeighbors(col, row - 1);
          }
        }
      }

      if (col > 0) {
        // LEFT
        if (this.minesweeper[col - 1][row].value !== this.bombValue && this.minesweeper[col - 1][row].state !== "open") {
          this.displayTile(this.minesweeper[col - 1][row], col - 1, row);

          if (this.minesweeper[col - 1][row].value == " ") {
            this.openEmptyNeighbors(col - 1, row);
          }
        }
      }

      if (col < this.cols - 1) {
        // RIGHT
        if (this.minesweeper[col + 1][row].value !== this.bombValue && this.minesweeper[col + 1][row].state !== "open") {
          this.displayTile(this.minesweeper[col + 1][row], col + 1, row);

          if (this.minesweeper[col + 1][row].value == " ") {
            this.openEmptyNeighbors(col + 1, row);
          }
        }
      }

      if (row < this.rows - 1 && col < this.cols - 1) {
        //TOP LEFT
        if (this.minesweeper[col + 1][row + 1].value !== this.bombValue && this.minesweeper[col + 1][row + 1].state !== "open") {
          this.displayTile(this.minesweeper[col + 1][row + 1], col + 1, row + 1);

          if (this.minesweeper[col + 1][row + 1].value == " ") {
            this.openEmptyNeighbors(col + 1, row + 1);
          }
        }
      }

      if (col > 0 && row < this.rows - 1) {
        // TOP RIGHT
        if (this.minesweeper[col - 1][row + 1].value !== this.bombValue && this.minesweeper[col - 1][row + 1].state !== "open") {
          this.displayTile(this.minesweeper[col - 1][row + 1], col - 1, row + 1);

          if (this.minesweeper[col - 1][row + 1].value == " ") {
            this.openEmptyNeighbors(col - 1, row + 1);
          }
        }
      }

      if (row > 0 && col > 0) {
        //DOWN RIGHT
        if (this.minesweeper[col - 1][row - 1].value !== this.bombValue && this.minesweeper[col - 1][row - 1].state !== "open") {
          this.displayTile(this.minesweeper[col - 1][row - 1], col - 1, row - 1);

          if (this.minesweeper[col - 1][row - 1].value == " ") {
            this.openEmptyNeighbors(col - 1, row - 1);
          }
        }
      }

      if (row > 0 && col < this.cols - 1) {
        //DOWN LEFT
        if (this.minesweeper[col + 1][row - 1].value !== this.bombValue && this.minesweeper[col + 1][row - 1].state !== "open") {
          this.displayTile(this.minesweeper[col + 1][row - 1], col + 1, row - 1);

          if (this.minesweeper[col + 1][row - 1].value == " ") {
            this.openEmptyNeighbors(col + 1, row - 1);
          }
        }
      }
    }
  }, {
    key: "openAllTiles",
    value: function openAllTiles() {
      var tiles = this.minesweeper;

      for (var col = 0; col < tiles.length; col++) {
        for (var row = 0; row < tiles[col].length; row++) {
          var tile = tiles[col][row];

          if (tile.value == this.bombValue) {
            this.displayBomb(tile, col, row);
          } else {
            this.displayTile(tile, col, row);
          }
        }
      }
    }
  }, {
    key: "displayTile",
    value: function displayTile(tile, i, j) {
      this.minesweeper[i][j].state = "open";
      var element = document.getElementById("tile_" + i + "_" + j);
      element.innerText = tile.value;
      element.style.backgroundColor = this.grassOpenedColor;
    }
  }, {
    key: "displayBomb",
    value: function displayBomb(bomb, i, j) {
      var element = document.getElementById("tile_" + i + "_" + j);
      element.style.backgroundColor = this.grassOpenedColor;
      element.style.paddingTop = (this.resolution - this.resolution / 2) / 2 + "px";
      element.innerHTML = "<img src='./images/bomb.png' style='width: " + this.resolution / 2 + "px'>";
    }
  }, {
    key: "displayAlert",
    value: function displayAlert(i, j) {
      var element = document.getElementById("tile_" + i + "_" + j);
      var tile = this.minesweeper[i][j];

      if (tile.state == "alert") {
        tile.state = "blocked";
        element.style.paddingTop = this.resolution / 2 - this.fontSize + 5 + "px";
        element.innerHTML = " ";
      } else {
        tile.state = "alert";
        element.style.paddingTop = (this.resolution - this.resolution / 2) / 2 + "px";
        element.innerHTML = "<img src='./images/alert.png' style='width: " + this.resolution / 2 + "px'>";
      }

      this.verifyWinning();
    }
  }, {
    key: "verifyWinning",
    value: function verifyWinning() {
      var mines = this.minesPlaced;
      var size = mines.length;
      var found = 0;

      for (var i = 0; i < size; i++) {
        var mine = mines[i];

        if (this.minesweeper[mine.i][mine.j].state == "alert" && this.minesweeper[mine.i][mine.j].value == this.bombValue) {
          found++;
        }
      }

      if (found == size) {
        alert("You win!");
        this.reset();
      }
    }
  }, {
    key: "draw",
    value: function draw(table) {
      var _this2 = this;

      var _loop = function _loop(col) {
        var _loop2 = function _loop2(row) {
          var cell = table[col][row];
          var tile = new Tile(_this2.resolution, col, row).build();
          tile.addEventListener("click", function (el, ev) {
            open(col, row, el.target);
          }, false);
          tile.addEventListener('contextmenu', function (ev) {
            ev.preventDefault();
            displayAlert(col, row);
            return false;
          }, false);

          _this2.element.appendChild(tile);
        };

        for (var row = 0; row < table[col].length; row++) {
          _loop2(row);
        }
      };

      for (var col = 0; col < table.length; col++) {
        _loop(col);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.minesweeper = null;
      this.minesPlaced = [];
      this.element.innerHTML = "";
      this.build();
    }
  }]);

  return Field;
}();

var Tile = /*#__PURE__*/function () {
  function Tile(resolution, i, j) {
    _classCallCheck(this, Tile);

    this.resolution = resolution;
    this.i = i;
    this.j = j;
    this.fontSize = 15;
    this.grassClossedColorHover = "#1F6D04";
    this.grassClossedColor = "#79bf00";
    this.grassOpenedColor = "#b6ff38";
  }

  _createClass(Tile, [{
    key: "build",
    value: function build() {
      var element = document.createElement("div");
      element.id = "tile_" + this.i + "_" + this.j;
      element.style.backgroundColor = this.grassClossedColor;
      element.style["float"] = "left";
      element.style.width = this.resolution + "px";
      element.style.height = this.resolution + "px";
      element.style.border = "1px solid";
      element.style.textAlign = "center";
      element.style.fontSize = this.fontSize;
      element.style.cursor = "pointer";
      element.style.paddingTop = this.resolution / 2 - this.fontSize + 5 + "px";
      return element;
    }
  }]);

  return Tile;
}();
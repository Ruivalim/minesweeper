"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Field = /*#__PURE__*/function () {
  function Field(canvas) {
    var mines = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 700;
    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 700;
    var resolution = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 70;

    _classCallCheck(this, Field);

    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.resolution = resolution;
    this.mines = mines;
    this.cols = Math.ceil(this.width / this.resolution);
    this.rows = Math.ceil(this.height / this.resolution);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.height = this.height;
    this.canvas.width = this.width;
    this.bombValue = "bomb";
    this.fontSize = 15;
  }

  _createClass(Field, [{
    key: "generateMap",
    value: function generateMap() {
      var _this = this;

      return new Array(this.cols).fill(null).map(function () {
        return new Array(_this.rows).fill(null).map(function () {
          return 0;
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

            if (placeMineRandom < 0.00001 && minePlaced == false) {
              field[col][row] = this.bombValue;
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
          if (field[col][row] !== this.bombValue) {
            var hints = 0;

            if (col !== this.cols) {
              // TOP
              if (field[col][row + 1] == this.bombValue) {
                hints += 1;
              }
            }

            if (row !== 0) {
              // DOWN
              if (field[col][row - 1] == this.bombValue) {
                hints += 1;
              }
            }

            if (col !== 0) {
              // LEFT
              if (field[col - 1][row] == this.bombValue) {
                hints += 1;
              }
            }

            if (col !== this.cols - 1) {
              // RIGHT
              if (field[col + 1][row] == this.bombValue) {
                hints += 1;
              }
            }

            if (col !== this.cols - 1 && row !== this.rows - 1) {
              // TOP LEFT
              if (field[col + 1][row + 1] == this.bombValue) {
                hints += 1;
              }
            }

            if (col !== 0 && row !== this.rows - 1) {
              // TOP RIGHT
              if (field[col - 1][row + 1] == this.bombValue) {
                hints += 1;
              }
            }

            if (col !== 0 && row !== 0) {
              // DOWN RIGHT
              if (field[col - 1][row - 1] == this.bombValue) {
                hints += 1;
              }
            }

            if (col !== this.cols - 1 && row !== 0) {
              // DOWN LEFT
              if (field[col + 1][row - 1] == this.bombValue) {
                hints += 1;
              }
            }

            if (hints == 0) {
              hints = " ";
            }

            field[col][row] = hints;
          }
        }
      }

      return field;
    }
  }, {
    key: "draw",
    value: function draw(table) {
      for (var col = 0; col < table.length; col++) {
        for (var row = 0; row < table[col].length; row++) {
          var cell = table[col][row];
          this.ctx.beginPath();
          this.ctx.font = this.fontSize + 'px Arial';
          this.ctx.textAlign = "center";

          if (cell == this.bombValue) {
            this.ctx.fillStyle = 'black';
          } else {
            this.ctx.fillStyle = 'white';
          }

          this.ctx.strokeRect(col * this.resolution, row * this.resolution, this.resolution, this.resolution);
          this.ctx.strokeText(cell, Math.ceil(col * this.resolution + this.resolution / 2), Math.ceil(row * this.resolution + (this.resolution / 2 + this.fontSize / 2)));
        }
      }
    }
  }]);

  return Field;
}();
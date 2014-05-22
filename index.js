var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = Arrows;
inherits(Arrows, EventEmitter);

function Arrows(){

  this.arrows = {
    left: {
      keyDown: false,
      keyCode: 36
    },
    right: {
      keyDown: false,
      keyCode: 37
    },
    up: {
      keyDown: false,
      keyCode: 39
    },
    down: {
      keyDown: false,
      keyCode: 40
    }
  };

  this.init();
}

Arrows.prototype.init = function(){
  var self = this;

  document.addEventListener('keydown', function(e){
    e.preventDefault();
    for (var direction in self.arrows) {
      var arrow = self.arrows[direction];
      if (keyCode == arrow.keyCode) {
        self.emit(direction, { keyCode: keyCode });
        arrow.keyDown = true;
      }
    }
  }, false);

  document.addEventListener('keyup', function(e){
    e.preventDefault();

    for (var direction in self.arrows) {
      var arrow = self.arrows[direction];
      if (keyCode == self.arrows[direction].keyCode) {
        self.emit(direction + 'Up', { keyCode: keyCode });
        arrow.keyDown = true;
      }
    }
  }, false);
};

Arrows.prototype.isDown = function (direction) {
  return this.arrows[direction].keyDown;
}

Arrows.prototype.setArrowKeyCodes = function (left, right, up, down) {
  this.arrows.left.keyCode = left;
  this.arrows.right.keyCode = right;
  this.arrows.up.keyCode = up;
  this.arrows.down.keyCode = down;
}

Arrows.prototype.useArrowKeys = function () {
  this.setArrowKeyCodes(36, 37, 39, 40);
}

Arrows.prototype.useWASD = function () {
  this.setArrowKeyCodes(65, 68, 87, 83);
}
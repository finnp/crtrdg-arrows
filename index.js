var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = Arrows;
inherits(Arrows, EventEmitter);

function Arrows(){

  this.arrows = {
    left: {
      keyDown: false
    },
    right: {
      keyDown: false
    },
    up: {
      keyDown: false
    },
    down: {
      keyDown: false
    }
  };
  this.useArrowKeys(); // adds keyCodes to this.arrows
  this.init();
}

Arrows.prototype.init = function(){
  var self = this;

  document.addEventListener('keydown', function(e){
    for (var direction in self.arrows) {
      var arrow = self.arrows[direction];
      if (e.keyCode === arrow.keyCode) {
        e.preventDefault();
        arrow.keyDown = true;
        self.emit(direction, e);
      }
    }
  }, false);

  document.addEventListener('keyup', function(e){
    e.preventDefault();
    for (var direction in self.arrows) {
      var arrow = self.arrows[direction];
      if (e.keyCode == self.arrows[direction].keyCode) {
        self.emit(direction + 'Up', e);
        arrow.keyDown = false;
      }
    }
  }, false);
};

Arrows.prototype.isDown = function (direction) {
  return this.arrows[direction].keyDown;
}

Arrows.prototype.down = function () {
  var arrows = [];
  for (arrow in this.arrows) {
    if (this.arrows[arrow].keyDown) {
      arrows.push(arrow);
    }
  }
  return arrows;
}

Arrows.prototype.setArrowKeyCodes = function (left, right, up, down) {
  this.arrows.left.keyCode = left;
  this.arrows.left.keyDown = false;
  this.arrows.right.keyCode = right;
  this.arrows.right.keyDown = false;
  this.arrows.up.keyCode = up;
  this.arrows.up.keyDown = false;
  this.arrows.down.keyCode = down;
  this.arrows.down.keyDown = false;
}

Arrows.prototype.useArrowKeys = function () {
  this.setArrowKeyCodes(37, 39, 38, 40);
}

Arrows.prototype.useWASD = function () {
  this.setArrowKeyCodes(65, 68, 87, 83);
}

var Arrows = require('./index.js');

// simulate events
var EventEmitter = require('events').EventEmitter;
document = new EventEmitter();

document.addEventListener = document.on;

// init
var arrows = new Arrows();
var left = 37;
var right = 39;
var up = 38;
var down = 40;
var w = 87;
var a = 65;
var s = 83;
var d = 68;

var test = require('tape');
test('Arrows', function (t) {
  t.test('on: should fire keydown for arrow keys by default', function (t) {
    t.plan(2);

    arrows.on('left', function (e) {
      t.equal(e.keyCode, left, 'left down');
    });
    arrows.on('right', function (e) {
      t.fail();
    });
    arrows.on('up', function (e) {
      t.fail();
    });
    arrows.on('down', function (e) {
      t.equal(e.keyCode, down, 'down down');
    });

    document.emit('keydown', {keyCode: left, preventDefault: function () {}});
    document.emit('keydown', {keyCode: down, preventDefault: function () {}});
    document.emit('keydown', {keyCode: w, preventDefault: function () {}});
    document.emit('keydown', {keyCode: a, preventDefault: function () {}});
  });

  t.test('isDown: should know whether a key is down', function (t) {
    t.ok(arrows.isDown('left'), 'left');
    t.ok(arrows.isDown('down'), 'down');
    t.false(arrows.isDown('up'), 'not up');
    t.false(arrows.isDown('right'), 'not right');
    t.end();
  });

  t.test('down: should include the right keys', function (t) {
    t.ok(arrows.down().length === 2, '2 arrows');
    t.ok(arrows.down().indexOf('left') !== -1, 'one is left');
    t.ok(arrows.down().indexOf('down') !== -1, 'the other one down');
    t.end();
  })

  t.test('useWASD: changing the keys should work too', function (t) {
    t.plan(2);
    arrows.removeAllListeners();
    arrows.on('up', function (e) {
      t.equal(e.keyCode, w, 'w up');
    });
    arrows.useWASD();
    document.emit('keydown', {keyCode: up, preventDefault: function () {}});
    document.emit('keydown', {keyCode: w, preventDefault: function () {}});
    t.ok(arrows.isDown('up'), 'key is up');
  });

  t.test('on: keyup events', function (t) {
    t.plan(1);
    arrows.on('upUp', function (e) {
      t.equal(e.keyCode, w, 'w up');
    });
    document.emit('keyup', {keyCode: up, preventDefault: function () {}});
    document.emit('keyup', {keyCode: w, preventDefault: function () {}});
  })

});

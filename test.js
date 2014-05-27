var Arrows = require('./index.js');

var simkey = require('simkey');

// simulate keyboard events
function simulateKeyEvent(type, keyCode) {
  simkey(document, {'type': type}, keyCode);
}

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

    simulateKeyEvent('keydown', left);
    simulateKeyEvent('keydown', down);
    simulateKeyEvent('keydown', w);
    simulateKeyEvent('keydown', a);
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
    arrows.useWASD();
    arrows.on('up', function (e) {
      t.equal(e.keyCode, w, 'w up pressed');
      t.ok(arrows.isDown('up'), 'key up is down');
    });
    simulateKeyEvent('keydown', left);
    simulateKeyEvent('keydown', w);
  });

  t.test('on: keyup events', function (t) {
    t.plan(1);
    arrows.on('upUp', function (e) {
      t.equal(e.keyCode, w, 'w up');
    });
    simulateKeyEvent('keyup', up);
    simulateKeyEvent('keyup', w);
  })

});

# crtrdg-arrow

This module is designed for easy arrow control together with [crtrdg](http://crtrdg.com/).
It is kind of like a more specific [crtrdg-keyboard](https://github.com/sethvincent/crtrdg-keyboard)
only for the use with self defined Arrow keys.

However it is designed to be independant so it can be used with [browserify](http://browserify.org/)
without using something else from the crtrdg ecosystem.

It supports events for the four directions as well as functions for
directly asking the states of the arrows.

You can simply install is with `npm install crtrdg-arrows` and then
use `browserify`to transform it for the browser.

## Simple Example with crtrdg-gameloop
```javascript
var Game = require('crtrdg-gameloop');
var Arrows = require('crtrdg-arrows');

var game = new Game({
  canvasId: 'game',
  width: 800,
  height: 400,
  backgroundColor: '#ff1f1f'
});

var arrows = new Arrows();

var x = 10;

arrows.on('down', function () {
  // Will be called once on keydown
  console.log('This key is not allowed');
})

game.on('update', function(interval){
  if (arrows.isDown('left')) {
    x -= 5;
  }
  if (arrows.isDown('right')) {
    x += 5;
  }
});

game.on('draw', function (context) {
  context.fillStyle = '#fff';
  context.fillRect(x, 390, 60, 10);
});
```

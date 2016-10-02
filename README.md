# Wavy Canvas

[![npm version](https://badge.fury.io/js/wavy-canvas.svg)](https://badge.fury.io/js/wavy-canvas) [![GitHub version](https://badge.fury.io/gh/hinok%2Fwavy-canvas.svg)](https://badge.fury.io/gh/hinok%2Fwavy-canvas)

Small library which gives you ability to create a wave animation on the `<canvas>`.

Includes `hidpi-canvas-polyfill` ([src](https://github.com/jondavidjohn/hidpi-canvas-polyfill)) by @jondavidjohn

Can be easily used in AMD / CommonJS / ES6 / legacy environments.

## _"A picture is worth a thousand words"_

![Wavy canvas in action](/demo/assets/demo.gif?raw=true)

## Demo

Open <http://codepen.io/hinok/pen/xOwrKJ>

## Usage

### Options

You must set at least either `selector` or `selectorEl` option and `radiuses`, `duration` options.

```javascript
var wavy = new Wavy(options);
```

- `hexFillColor`, {string}, defaults `#ff0000`, optional - Background hex color of waves
- `hexStrokeColor` {string}, defaults `inherits from hexFillColor`, optional - Stroke hex color of waves
- `onlyWaves` {boolean}, defaults `false`, optional - Whether should render only waves with transparent background or not
- `radiuses` {Array}, required - Next radiuses of rendered waves
- `duration` {number}, required - How long waves animation should take in ms (mili seconds)
- `selector` {string}, optional - A selector of a DOM element where `<canvas>` should be appended.
- `selectorEl` {Element}, optional - A DOM element where `<canvas>` should be appended. Overrides `selector` option
- `centerWaveSelector` {string}, defaults `.js-wavy-center`, optional - A selector of a DOM element which set center (source) of waves. Must be a child of DOM element set by properties: `selector` or `selectorEl`
- `centerWave` {Object}, optional - An object containing props `x`, `y` which indicate center of waves. Overrides `centerWaveSelector` option.

**Regular usage**

```javascript
new Wavy({
  hexStrokeColor: '#fff',
  radiuses: [10, 20, 30],
  duration: 3000,
  selector: '.js-dom-element'
});
```

**All options**

```javascript
new Wavy({
  hexFillColor: '#fff',
  hexStrokeColor: '#fff',
  onlyWaves: false,
  radiuses: [10, 20, 30],
  duration: 5000,
  selector: '.js-dom-element',
  selectorEl: document.querySelector('.js-other-dom-element'),
  centerWave: {
    x: 500,
    y: 500
  },
  centerWaveSelector: '.js-child-of-dom-element'
});
```

For more details look at `demo` folder.

### ES2015 / ES6

```javascript
import Wavy from 'wavy-canvas/src/Wavy';

const wavy = new Wavy({
    radiuses: [10, 30, 50, 80, 120, 160, 200, 280],
    hexFillColor: '#fff',
    hexStrokeColor: '#fff',
    duration: 4000,
    selector: '.js-where-should-I-append-canvas-element'
});

wavy.start();
```

### ES5

```javascript
var wavy = new window.Wavy({
    radiuses: [10, 30, 50, 80, 120, 160, 200, 280],
    hexFillColor: '#fff',
    hexStrokeColor: '#fff',
    duration: 4000,
    selector: '.js-where-should-I-append-canvas-element'
});

wavy.start();
```

## Size

### Javascript

wavy.js  | wavy.js (gzip) | wavy.min.js | wavy.min.js (gzip)
-------- | -------------- | ----------- | ------------------
33.94 KB | 8.64 KB        | 16.47 KB    | 5.19 KB

### CSS

style.css | style.css (gzip)
--------- | ----------------
327 B     | 205 B
0.33 KB   | 0.21 KB

## Development

```bash
npm install         # quite obvious... ¯\_( ͠° ͟ʖ °͠ )_/¯
npm start           # starts server, opens browser, watches for files changes
npm run build       # build js and scss
```

## License

MIT

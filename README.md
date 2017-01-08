# Wavy Canvas

[![npm version](https://badge.fury.io/js/wavy-canvas.svg)](https://badge.fury.io/js/wavy-canvas) [![GitHub version](https://badge.fury.io/gh/hinok%2Fwavy-canvas.svg)](https://badge.fury.io/gh/hinok%2Fwavy-canvas)

Small library which gives you ability to create a wave animation on the `<canvas>`.

Can be easily used in AMD / CommonJS / ES6 environments.

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
- `easing`, {string}, easing name used for animation. Look at default options to see list of available easings.

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
  centerWaveSelector: '.js-child-of-dom-element',
  easing: 'easeInBounce'
});
```

**Default options**

```javascript
const defaults = {
  hexFillColor: '#fff',
  hexStrokeColor: '#fff',
  onlyWaves: true,
  radiuses: [10, 30, 50, 80, 120, 160, 200],
  duration: 3000,
  selector: undefined,
  selectorEl: undefined,
  centerWaveSelector: '.js-wavy-center',
  centerWave: undefined,
  easing: 'easeOutCubic',
};
```

**Available easings**

```
linear
easeInQuad
easeOutQuad
easeInOutQuad
easeInCubic
easeOutCubic
easeInOutCubic
easeInQuart
easeOutQuart
easeInOutQuart
easeInQuint
easeOutQuint
easeInOutQuint
easeInSine
easeOutSine
easeInOutSine
easeInExpo
easeOutExpo
easeInOutExpo
easeInCirc
easeOutCirc
easeInOutCirc
easeInElastic
easeOutElastic
easeInOutElastic
easeInBack
easeOutBack
easeInOutBack
easeInBounce
easeOutBounce
easeInOutBounce
```

`wavy-canvas` uses [easing-js](https://www.npmjs.com/package/easing-js) under the hood.

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

wavy.js   | wavy.js (gzip) | wavy.min.js | wavy.min.js (gzip)
--------- | -------------- | ----------- | ------------------
119.21 KB | 28.04 KB       | 49.85 KB    | 14.35 KB

### CSS

style.css | style.css (gzip)
--------- | ----------------
523 B     | 271 B
0.51 KB   | 0.26 KB

## Development

```bash
yarn install
yarn start
yarn run build
```

## License

MIT

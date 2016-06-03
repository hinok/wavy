# Wavy Canvas

Small library which gives you ability to create a wave animation on the `<canvas>`.

Includes `hidpi-canvas-polyfill` ([src](https://github.com/jondavidjohn/hidpi-canvas-polyfill)) by @jondavidjohn

Can be easily used in AMD / CommonJS / ES6 / legacy environments.

##*"A picture is worth a thousand words"*

![Wavy canvas in action](/demo/assets/demo.gif?raw=true)


## Usage

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

## Development

```bash
npm install         # quite obvious... ¯\_( ͠° ͟ʖ °͠ )_/¯
npm start           # starts server, opens browser, watches for files changes
npm run build       # build js and scss
```

## License

MIT

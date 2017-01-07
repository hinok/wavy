import docReady from 'doc-ready';
import Wavy from '../src/Wavy';

docReady(() => {

  var aOptions = {
    radiuses: [10, 30, 50, 100],
    hexFillColor: '#fff',
    hexStrokeColor: '#fff',
    onlyWaves: false,
    duration: 3000,
    selector: '.js-demo-a',
    centerWave: {
      x: 250,
      y: 250
    }
  };

  var bOptions = {
    radiuses: [10, 20, 40, 80, 160, 320, 640, 1024],
    hexFillColor: '#fff',
    hexStrokeColor: '#fff',
    duration: 5000,
    selector: '.js-demo-b'
  };

  var cOptions = {
    radiuses: [10, 30, 50, 80, 120, 500],
    hexFillColor: '#fff',
    hexStrokeColor: '#fff',
    duration: 1000,
    selector: '.js-demo-c'
  };

  var dOptions = {
    radiuses: [10, 30, 50, 80, 120, 200],
    hexFillColor: '#fff',
    hexStrokeColor: '#fff',
    duration: 1000,
    selectorEl: document.querySelector('.js-demo-d')
  };

  var aWavy = new Wavy(aOptions).start();
  var bWavy = new Wavy(bOptions).start();
  var cWavy = new Wavy(cOptions).start();
  var dWavy = new Wavy(dOptions).start();

  var start = document.getElementById('js-demo-start');
  var stop = document.getElementById('js-demo-stop');

  start.addEventListener('click', bWavy.start.bind(bWavy));
  stop.addEventListener('click', bWavy.stop.bind(bWavy));

});

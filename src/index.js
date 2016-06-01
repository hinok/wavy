import docReady from 'doc-ready';
import Wave from './Wave';

docReady(() => {

    var a = {
        radiuses: [10, 30, 50, 80, 120, 160, 200, 280],
        duration: 3000,
        selector: '.js-a',
        centerWave: {
            x: 250,
            y: 250
        }
    };

    var b = {
        radiuses: [10, 20, 30, 40, 50, 60, 70, 80],
        duration: 5000,
        selector: '.js-b'
    };

    var c = {
        radiuses: [10, 30, 50, 80, 120, 500],
        duration: 1000,
        selector: '.js-c'
    };

    var aWave = new Wave(a).start();
    var bWave = new Wave(b).start();
    var cWave = new Wave(c).start();

    var start = document.getElementById('js-demo-start');
    var stop = document.getElementById('js-demo-stop');

    start.addEventListener('click', bWave.start);
    stop.addEventListener('click', bWave.stop);

});
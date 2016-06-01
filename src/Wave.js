import 'hidpi-canvas/dist/hidpi-canvas';
import {default as raf, cancel as caf} from 'raf';
import objectAssign from 'object-assign';
import easing from 'easing-js';
import Circle from './Circle';
import offsetParent from './offsetParent';

export default function make(options) {
    var rafId;
    var canvas;
    var context;
    var canvasWidth;
    var canvasHeight;
    var circles = [];
    var totalIterations;
    var currentIteration;
    var defaultCenterWaveSelector = '.js-wave-center';

    class Wave {
        constructor(options) {
            this.options = objectAssign({}, options);
            this.radiuses = options.radiuses;
            this.duration = options.duration;
            this.selector = options.selector;
            this.centerWave = options.centerWave;
            this.centerWaveSelector = options.centerWaveSelector || defaultCenterWaveSelector;
            this.selectorEl = null;

            this.generateCircles();
            this.createCanvas();
            this.setupCanvas();
            this.setupCenterWave();
            this.setupAnimation();
            this.attachEvents();
        }

        generateCircles() {
            for (let radius of this.radiuses) {
                circles.push(new Circle(radius));
            }
        }

        setupCanvas() {
            canvas.removeAttribute('width');
            canvas.removeAttribute('height');
            canvas.removeAttribute('style');

            canvasWidth = canvas.clientWidth;
            canvasHeight = canvas.clientHeight;

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            // hidpi-canvas overrides getContext() method and set again width and height for canvas
            // based on screen hidpi ratio, then canvas is rescaled down by CSS width and height props
            context = canvas.getContext('2d');
        }

        setupCenterWave() {
            if (this::hasOptionsCenterWave()) {
                return;
            }

            const el = this.selectorEl.querySelector(this.centerWaveSelector);

            if (el === null) {
                this.centerWave = {
                    x: canvasWidth / 2,
                    y: canvasHeight / 2
                };

                return;
            }

            // We have centerWave element somewhere in the DOM
            // and centerWave wasn't set directly thus we have to calculate centerWave manually
            this.centerWave = offsetParent(this.selectorEl, el);
        }

        start() {
            draw();
            return this;
        }

        stop() {
            if (rafId) {
                caf(rafId);
            }
        }

        attachEvents() {
            window.addEventListener('resize', () => {
                this.setupCanvas();
                this.setupCenterWave();
                this.setupAnimation();
            });
        }

        setupAnimation() {
            totalIterations = this.duration / 1000 * 60;
            currentIteration = 0;

            for (let circle of circles) {
                circle.x = this.centerWave.x;
                circle.y = this.centerWave.y;
                circle.setFillStyle("#000", 0);
            }
        }

        createCanvas() {
            canvas = document.createElement('canvas');

            const el = document.querySelector(this.selector);

            if (el === null) {
                throw new Error(`Not found element: ${this.selector} in the DOM`);
            }

            el.appendChild(canvas);

            this.selectorEl = el;
        }
    }

    /**
     * @private
     * @returns {boolean}
     */
    function hasOptionsCenterWave() {
        return (
            this.options.centerWave !== null &&
            typeof this.options.centerWave === 'object' &&
            typeof this.options.centerWave.x === 'number' &&
            typeof this.options.centerWave.y === 'number'
        );
    }

    /**
     * @private
     */
    function draw() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);

        for (let circle of circles) {
            // This is madness...
            // When changeInValue is equal to -1 which is what we basically want...
            // Safari has weird bug and display black, non-transparent circles in one frame
            // which looks like animation glitch.
            // It occurs only in Safari 9.1.1 on OS X 10.11.5

            // All easing functions has this form in terms of parameters which they take
            // (currentIteration, startValue, changeInValue, totalIterations)
            var opacity = easing.easeInOutCubic(currentIteration, 1, -0.99, totalIterations);
            var scale = easing.easeInOutCubic(currentIteration, 1, 0.618, totalIterations);

            circle.setScale({x: scale, y: scale});
            circle.setStrokeStyle("#ff0000", opacity);
            circle.draw(context);
        }

        currentIteration = (currentIteration < totalIterations) ? currentIteration + 1 : 0;

        rafId = raf(draw);
    }

    return new Wave(options);
}
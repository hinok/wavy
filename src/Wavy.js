import easing from 'easing-js';
import assign from 'lodash/assign';
import debounce from 'lodash/debounce';
import Circle from './Circle';
import offsetParent from './offsetParent';
import getPixelRatio from './getPixelRatio';

const raf = window.requestAnimationFrame;
const caf = window.cancelAnimationFrame;

export default function make(userOptions = {}) {
  let rafId;
  let canvas;
  let context;
  let canvasWidth;
  let canvasHeight;
  let totalIterations;
  let currentIteration;
  let circles;
  let biggestCircle;
  const pixelRatio = getPixelRatio();
  const debouncedRelayout = debounce(relayout, 150);
  const FRAMERATE = 60;
  const animationProps = {
    opacity: [],
    scale: [],
  };

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
  };

  const options = assign({}, defaults, userOptions);

  class Wavy {
    constructor() {
      createCircles();
      appendCanvas();
      relayout();
      setupAnimation();
      attachEvents();
    }

    start() {
      if (!isDrawing()) {
        draw();
      }

      return this;
    }

    stop() {
      if (isDrawing()) {
        caf(rafId);
        rafId = undefined;
      }

      return this;
    }

    destroy() {
      // Just in case if animation is still in progress
      this.stop();

      detachEvents();

      // Remove all references to DOM elements
      options.selectorEl = undefined;
      options.centerWaveEl = undefined;
      canvas = undefined;
      context = undefined;
    }

    getOptions() {
      return options;
    }
  }

  function createCircles() {
    const { radiuses, hexFillColor, hexStrokeColor } = options;
    const scaledRadiuses = radiuses.map(radius => radius * pixelRatio);
    circles = scaledRadiuses.map(radius => new Circle({
      radius,
      hexFillColor,
      hexStrokeColor,
    }));
  }

  function getBiggestCircle() {
    const sorted = circles.sort((c1, c2) => c1.radius < c2.radius);

    // Sorted array contains the biggest circle at the beginning
    return sorted[0];
  }

  function appendCanvas() {
    if (!options.selectorEl) {
      options.selectorEl = document.querySelector(options.selector);
    }

    if (!options.selectorEl) {
      throw new Error(`No defined selector element, check selectorEl and selector options.`);
    }

    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    options.selectorEl.appendChild(canvas);
  }

  function attachEvents() {
    window.addEventListener('resize', debouncedRelayout);
  }

  function detachEvents() {
    window.removeEventListener('resize', debouncedRelayout);
  }

  function relayout() {
    setupCanvas();
    setupCenterWave();
    setupCircles();
  }

  function setupCanvas() {
    canvas.removeAttribute('width');
    canvas.removeAttribute('height');
    canvas.removeAttribute('style');

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvasWidth = width * pixelRatio;
    canvasHeight = height * pixelRatio;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  }

  function setupCenterWave() {
    const { selectorEl, centerWaveSelector } = options;
    const centerWaveEl = selectorEl.querySelector(centerWaveSelector);
    let x;
    let y;

    if (hasUserOptionsCenterWave()) {
      x = userOptions.centerWave.x * pixelRatio;
      y = userOptions.centerWave.y * pixelRatio;
    } else if (centerWaveEl) {
      const offset = offsetParent(selectorEl, centerWaveEl);
      x = offset.x * pixelRatio;
      y = offset.y * pixelRatio;
    } else {
      x = canvasWidth / 2;
      y = canvasHeight / 2;
    }

    options.centerWave = {
      x: Math.floor(x),
      y: Math.floor(y),
    };
  }

  /**
   * @returns {boolean}
   */
  function hasUserOptionsCenterWave() {
    const { centerWave } = userOptions;
    const isObject = o => o !== null && typeof o === 'object';
    const isNumber = n => typeof n === 'number';
    return isObject(centerWave) && isNumber(centerWave.x) && isNumber(centerWave.y);
  }

  function setupCircles() {
    for (let circle of circles) {
      circle.x = options.centerWave.x;
      circle.y = options.centerWave.y;
      circle.setFillAlpha(0);
    }
  }

  function setupAnimation() {
    totalIterations = options.duration / 1000 * FRAMERATE;
    currentIteration = 0;

    const opacityStartValue = 1;
    /*
     * When opacityChangeInValue is equal to -1
     * Safari has a bug and render black non-transparent circles in one of rendered frames
     * Occurs only in Safari 9.1.1 on OS X 10.11.5
     */
    const opacityChangeInValue = -0.99;
    const scaleStartValue = 1;
    const scaleChangeInValue = 0.618;

    for (let i = 0; i < totalIterations; i++) {
      const opacity = easing.easeInOutCubic(i, opacityStartValue, opacityChangeInValue, totalIterations);
      const scale = easing.easeInOutCubic(i, scaleStartValue, scaleChangeInValue, totalIterations);
      animationProps.opacity[i] = opacity;
      animationProps.scale[i] = scale;
    }

    biggestCircle = getBiggestCircle();
  }

  function isDrawing() {
    return typeof rafId !== 'undefined';
  }

  function draw() {
    const dirtyRegion = getDirtyRegion();
    const opacity = animationProps.opacity[currentIteration];
    const scale = animationProps.scale[currentIteration];

    context.clearRect(dirtyRegion.x, dirtyRegion.y, dirtyRegion.width, dirtyRegion.height);

    // Use process.env.NODE_ENV for removing this part of code
    // context.fillStyle = 'rgba(0,255,0,0.2)';
    // context.fillRect(dirtyRegion.x, dirtyRegion.y, dirtyRegion.width, dirtyRegion.height);

    for (const circle of circles) {
      circle.scaleRadius(scale);

      if (!options.onlyWaves) {
        circle.setFillAlpha(opacity);
      }

      circle.setStrokeAlpha(opacity);
      circle.draw(context);
    }

    currentIteration = (currentIteration < totalIterations) ? currentIteration + 1 : 0;

    rafId = raf(draw);
  }

  function getDirtyRegion() {
    const rect = biggestCircle.getBoundingRect();

    return {
      x: Math.max(rect.x, 0),
      y: Math.max(rect.y, 0),
      width: Math.min(rect.width, canvasWidth),
      height: Math.min(rect.height, canvasHeight),
    };
  }

  return new Wavy();
}

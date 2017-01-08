import hexRGB from 'hex-rgb';

export default class Circle {
  constructor(options) {
    const defaults = {
      radius: 40,
      hexFillColor: '#ffffff',
      hexStrokeColor: '#ffffff',
    };

    this.options = {
      ...defaults,
      ...options,
    };

    this.radius = this.options.radius;
    this.setFillStyle(this.options.hexFillColor, 0);
    this.setStrokeStyle(this.options.hexStrokeColor, 1);

    this.x = 0;
    this.y = 0;
    this.lineWidth = 1;
  }

  scaleRadius(scale = 1) {
    scale = scale < 0 ? 0 : scale;
    this.radius = Math.floor(this.options.radius * scale);
  }

  getBoundingRect() {
    const size = this.radius * 2 + this.lineWidth * 2;
    let x = this.x - (this.radius + this.lineWidth);
    let y = this.y - (this.radius + this.lineWidth);
    let subtractWidth = 0;
    let subtractHeight = 0;

    if (x < 0) {
      subtractWidth = Math.abs(x);
      x = 0;
    }

    if (y < 0) {
      subtractHeight = Math.abs(y);
      y = 0;
    }

    return {
      x,
      y,
      width: size - subtractWidth,
      height: size - subtractHeight,
    };
  }

  /**
   * @param {string} color
   * @param {number} alpha
   */
  setFillStyle(color, alpha) {
    this.fillColor = getColor(color, alpha);
    this.fillStyle = getRGBA(this.fillColor);
  }

  /**
   * @param {string} color
   * @param {number} alpha
   */
  setStrokeStyle(color, alpha) {
    this.strokeColor = getColor(color, alpha);
    this.strokeStyle = getRGBA(this.strokeColor);
  }

  /**
   * @param {number} alpha
   */
  setFillAlpha(alpha) {
    this.fillColor.alpha = alpha;
    this.fillStyle = getRGBA(this.fillColor);
  }

  /**
   * @param {number} alpha
   */
  setStrokeAlpha(alpha) {
    this.strokeColor.alpha = alpha;
    this.strokeStyle = getRGBA(this.strokeColor);
  }

  /**
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    context.beginPath();
    const startAngle = 0;
    const endAngle = Math.PI * 2;
    const antiClockwise = true;
    context.arc(this.x, this.y, this.radius, startAngle, endAngle, antiClockwise);

    context.fillStyle = this.fillStyle;
    context.strokeStyle = this.strokeStyle;
    context.lineWidth = this.lineWidth;

    context.fill();
    context.stroke();
  }
}

/**
 * @param {string} color - HEX representation of color, can be used with # or without #
 * @param {number} alpha
 * @returns {{red:number, green:number, blue:number, alpha: number}}
 */
function getColor(color, alpha = 1) {
  if (typeof color !== 'string') {
    throw new Error('color argument must be defined in the hex format as a string');
  }

  if (alpha < 0) {
    alpha = 0;
  } else if (alpha > 1) {
    alpha = 1;
  }

  if (color.indexOf('#') > -1) {
    color = color.substr(1);
  }

  const [red, green, blue] = hexRGB(color);

  return {
    red,
    green,
    blue,
    alpha
  };
}

/**
 * @param {{red:number, green:number, blue:number, alpha: number}} color
 * @returns {string}
 */
function getRGBA(color) {
  const {red, green, blue, alpha} = color;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

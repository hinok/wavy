import hexRGB from 'hex-rgb';

export default class Circle {
  constructor(radius = 40, hexFillColor = "#ff0000", hexStrokeColor) {
    this.radius = radius;
    this.setFillStyle(hexFillColor, 0);
    this.setStrokeStyle(hexStrokeColor || hexFillColor, 1);

    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.lineWidth = 0.5; // 0.5 is a bit thinner than 1
  }

  /**
   * @param {{x: number, y:number}} scale
   */
  setScale(scale) {
    this.scaleX = (scale.x < 0) ? 0 : scale.x;
    this.scaleY = (scale.y < 0) ? 0 : scale.y;
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
    context.save();

    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.scale(this.scaleX, this.scaleY);

    context.lineWidth = this.lineWidth;
    context.fillStyle = this.fillStyle;

    context.beginPath();
    // context.arc(x, y, radius, start_angle, end_angle, anti-clockwise)
    context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
    context.closePath();

    context.fill();

    if (this.lineWidth > 0) {
      context.strokeStyle = this.strokeStyle;
      context.stroke();
    }

    context.restore();
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

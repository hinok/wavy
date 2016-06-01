import hexRGB from 'hex-rgb';

var circles = [];

class Circle {
  constructor(radius = 40, hexFillColor = "#ff0000", hexStrokeColor) {
    this.radius = radius;
    this.setFillStyle(hexFillColor, 0);
    this.setStrokeStyle(hexStrokeColor || hexFillColor, 1);

    circles.push(this);
    
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.lineWidth = 0.5; // 0.5 is a bit sharper than 1
  }

  setScale(scale) {
    this.scaleX = (scale.x < 0) ? 0 : scale.x;
    this.scaleY = (scale.y < 0) ? 0 : scale.y;
  }

  setFillStyle(color, alpha) {
    this.fillStyle = getRGBA(getColor(color, alpha));
  }

  setStrokeStyle(color, alpha) {
    this.strokeStyle = getRGBA(getColor(color, alpha));
  }

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

    // context.fill();

    if (this.lineWidth > 0) {
      context.strokeStyle = this.strokeStyle;
      context.stroke();
    }

    context.restore();
  }
}

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

function getRGBA(color) {
  const {red, green, blue, alpha} = color;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export default Circle;

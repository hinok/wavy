(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _docReady = require('doc-ready');

var _docReady2 = _interopRequireDefault(_docReady);

var _Wavy = require('../src/Wavy');

var _Wavy2 = _interopRequireDefault(_Wavy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _docReady2.default)(function () {

  var aOptions = {
    radiuses: [10, 30, 50, 80, 120, 160, 200, 280],
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

  var aWavy = new _Wavy2.default(aOptions).start();
  var bWavy = new _Wavy2.default(bOptions).start();
  var cWavy = new _Wavy2.default(cOptions).start();
  var dWavy = new _Wavy2.default(dOptions).start();

  var start = document.getElementById('js-demo-start');
  var stop = document.getElementById('js-demo-stop');

  start.addEventListener('click', bWavy.start.bind(bWavy));
  stop.addEventListener('click', bWavy.stop.bind(bWavy));
});

},{"../src/Wavy":12,"doc-ready":2}],2:[function(require,module,exports){
/*!
 * docReady v1.0.4
 * Cross browser DOMContentLoaded event emitter
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true*/
/*global define: false, require: false, module: false */

( function( window ) {

'use strict';

var document = window.document;
// collection of functions to be triggered on ready
var queue = [];

function docReady( fn ) {
  // throw out non-functions
  if ( typeof fn !== 'function' ) {
    return;
  }

  if ( docReady.isReady ) {
    // ready now, hit it
    fn();
  } else {
    // queue function when ready
    queue.push( fn );
  }
}

docReady.isReady = false;

// triggered on various doc ready events
function onReady( event ) {
  // bail if already triggered or IE8 document is not ready just yet
  var isIE8NotReady = event.type === 'readystatechange' && document.readyState !== 'complete';
  if ( docReady.isReady || isIE8NotReady ) {
    return;
  }

  trigger();
}

function trigger() {
  docReady.isReady = true;
  // process queue
  for ( var i=0, len = queue.length; i < len; i++ ) {
    var fn = queue[i];
    fn();
  }
}

function defineDocReady( eventie ) {
  // trigger ready if page is ready
  if ( document.readyState === 'complete' ) {
    trigger();
  } else {
    // listen for events
    eventie.bind( document, 'DOMContentLoaded', onReady );
    eventie.bind( document, 'readystatechange', onReady );
    eventie.bind( window, 'load', onReady );
  }

  return docReady;
}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( [ 'eventie/eventie' ], defineDocReady );
} else if ( typeof exports === 'object' ) {
  module.exports = defineDocReady( require('eventie') );
} else {
  // browser global
  window.docReady = defineDocReady( window.eventie );
}

})( window );

},{"eventie":4}],3:[function(require,module,exports){
"use strict";

var Easing = {
  linear: function linear(t, b, c, d) {
    return c * t / d + b;
  },
  easeInQuad: function easeInQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  easeOutQuad: function easeOutQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  },
  easeInOutQuad: function easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t + b;
    } else {
      return -c / 2 * (--t * (t - 2) - 1) + b;
    }
  },
  easeInCubic: function easeInCubic(t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  easeOutCubic: function easeOutCubic(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  easeInOutCubic: function easeInOutCubic(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t + b;
    } else {
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
  },
  easeInQuart: function easeInQuart(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  },
  easeOutQuart: function easeOutQuart(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  },
  easeInOutQuart: function easeInOutQuart(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t * t + b;
    } else {
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }
  },
  easeInQuint: function easeInQuint(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  easeOutQuint: function easeOutQuint(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  easeInOutQuint: function easeInOutQuint(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t * t * t + b;
    } else {
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }
  },
  easeInSine: function easeInSine(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  },
  easeOutSine: function easeOutSine(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  },
  easeInOutSine: function easeInOutSine(t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  },
  easeInExpo: function easeInExpo(t, b, c, d) {
    var _ref;
    return (_ref = t === 0) !== null ? _ref : {
      b: c * Math.pow(2, 10 * (t / d - 1)) + b
    };
  },
  easeOutExpo: function easeOutExpo(t, b, c, d) {
    var _ref;
    return (_ref = t === d) !== null ? _ref : b + {
      c: c * (-Math.pow(2, -10 * t / d) + 1) + b
    };
  },
  easeInOutExpo: function easeInOutExpo(t, b, c, d) {
    if (t === 0) {
      b;
    }
    if (t === d) {
      b + c;
    }
    if ((t /= d / 2) < 1) {
      return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    } else {
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  },
  easeInCirc: function easeInCirc(t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  easeOutCirc: function easeOutCirc(t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  },
  easeInOutCirc: function easeInOutCirc(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    } else {
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }
  },
  easeInElastic: function easeInElastic(t, b, c, d) {
    var a, p, s;
    s = 1.70158;
    p = 0;
    a = c;
    if (t === 0) {
      b;
    } else if ((t /= d) === 1) {
      b + c;
    }
    if (!p) {
      p = d * 0.3;
    }
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  },
  easeOutElastic: function easeOutElastic(t, b, c, d) {
    var a, p, s;
    s = 1.70158;
    p = 0;
    a = c;
    if (t === 0) {
      b;
    } else if ((t /= d) === 1) {
      b + c;
    }
    if (!p) {
      p = d * 0.3;
    }
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  },
  easeInOutElastic: function easeInOutElastic(t, b, c, d) {
    var a, p, s;
    s = 1.70158;
    p = 0;
    a = c;
    if (t === 0) {
      b;
    } else if ((t /= d / 2) === 2) {
      b + c;
    }
    if (!p) {
      p = d * (0.3 * 1.5);
    }
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    if (t < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    } else {
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    }
  },
  easeInBack: function easeInBack(t, b, c, d, s) {
    if (s === void 0) {
      s = 1.70158;
    }
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  easeOutBack: function easeOutBack(t, b, c, d, s) {
    if (s === void 0) {
      s = 1.70158;
    }
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  easeInOutBack: function easeInOutBack(t, b, c, d, s) {
    if (s === void 0) {
      s = 1.70158;
    }
    if ((t /= d / 2) < 1) {
      return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
    } else {
      return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    }
  },
  easeInBounce: function easeInBounce(t, b, c, d) {
    var v;
    v = Easing.easeOutBounce(d - t, 0, c, d);
    return c - v + b;
  },
  easeOutBounce: function easeOutBounce(t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
    }
  },
  easeInOutBounce: function easeInOutBounce(t, b, c, d) {
    var v;
    if (t < d / 2) {
      v = Easing.easeInBounce(t * 2, 0, c, d);
      return v * 0.5 + b;
    } else {
      v = Easing.easeOutBounce(t * 2 - d, 0, c, d);
      return v * 0.5 + c * 0.5 + b;
    }
  }
};

module.exports = Easing;
},{}],4:[function(require,module,exports){
/*!
 * eventie v1.0.6
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false, module: false */

( function( window ) {

'use strict';

var docElem = document.documentElement;

var bind = function() {};

function getIEEvent( obj ) {
  var event = window.event;
  // add event.target
  event.target = event.target || event.srcElement || obj;
  return event;
}

if ( docElem.addEventListener ) {
  bind = function( obj, type, fn ) {
    obj.addEventListener( type, fn, false );
  };
} else if ( docElem.attachEvent ) {
  bind = function( obj, type, fn ) {
    obj[ type + fn ] = fn.handleEvent ?
      function() {
        var event = getIEEvent( obj );
        fn.handleEvent.call( fn, event );
      } :
      function() {
        var event = getIEEvent( obj );
        fn.call( obj, event );
      };
    obj.attachEvent( "on" + type, obj[ type + fn ] );
  };
}

var unbind = function() {};

if ( docElem.removeEventListener ) {
  unbind = function( obj, type, fn ) {
    obj.removeEventListener( type, fn, false );
  };
} else if ( docElem.detachEvent ) {
  unbind = function( obj, type, fn ) {
    obj.detachEvent( "on" + type, obj[ type + fn ] );
    try {
      delete obj[ type + fn ];
    } catch ( err ) {
      // can't delete window object properties
      obj[ type + fn ] = undefined;
    }
  };
}

var eventie = {
  bind: bind,
  unbind: unbind
};

// ----- module definition ----- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( eventie );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = eventie;
} else {
  // browser global
  window.eventie = eventie;
}

})( window );

},{}],5:[function(require,module,exports){
'use strict';
module.exports = function (hex) {
	if (typeof hex !== 'string') {
		throw new TypeError('Expected a string');
	}

	hex = hex.replace(/^#/, '');

	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}

	var num = parseInt(hex, 16);

	return [num >> 16, num >> 8 & 255, num & 255];
};

},{}],6:[function(require,module,exports){
/**
 * HiDPI Canvas Polyfill (1.0.9)
 *
 * Author: Jonathan D. Johnson (http://jondavidjohn.com)
 * Homepage: https://github.com/jondavidjohn/hidpi-canvas-polyfill
 * Issue Tracker: https://github.com/jondavidjohn/hidpi-canvas-polyfill/issues
 * License: Apache 2.0
*/
(function(prototype) {

	var pixelRatio = (function(context) {
			var backingStore = context.backingStorePixelRatio ||
						context.webkitBackingStorePixelRatio ||
						context.mozBackingStorePixelRatio ||
						context.msBackingStorePixelRatio ||
						context.oBackingStorePixelRatio ||
						context.backingStorePixelRatio || 1;

			return (window.devicePixelRatio || 1) / backingStore;
		})(prototype),

		forEach = function(obj, func) {
			for (var p in obj) {
				if (obj.hasOwnProperty(p)) {
					func(obj[p], p);
				}
			}
		},

		ratioArgs = {
			'fillRect': 'all',
			'clearRect': 'all',
			'strokeRect': 'all',
			'moveTo': 'all',
			'lineTo': 'all',
			'arc': [0,1,2],
			'arcTo': 'all',
			'bezierCurveTo': 'all',
			'isPointinPath': 'all',
			'isPointinStroke': 'all',
			'quadraticCurveTo': 'all',
			'rect': 'all',
			'translate': 'all',
			'createRadialGradient': 'all',
			'createLinearGradient': 'all'
		};

	if (pixelRatio === 1) return;

	forEach(ratioArgs, function(value, key) {
		prototype[key] = (function(_super) {
			return function() {
				var i, len,
					args = Array.prototype.slice.call(arguments);

				if (value === 'all') {
					args = args.map(function(a) {
						return a * pixelRatio;
					});
				}
				else if (Array.isArray(value)) {
					for (i = 0, len = value.length; i < len; i++) {
						args[value[i]] *= pixelRatio;
					}
				}

				return _super.apply(this, args);
			};
		})(prototype[key]);
	});

	 // Stroke lineWidth adjustment
	prototype.stroke = (function(_super) {
		return function() {
			this.lineWidth *= pixelRatio;
			_super.apply(this, arguments);
			this.lineWidth /= pixelRatio;
		};
	})(prototype.stroke);

	// Text
	//
	prototype.fillText = (function(_super) {
		return function() {
			var args = Array.prototype.slice.call(arguments);

			args[1] *= pixelRatio; // x
			args[2] *= pixelRatio; // y

			this.font = this.font.replace(
				/(\d+)(px|em|rem|pt)/g,
				function(w, m, u) {
					return (m * pixelRatio) + u;
				}
			);

			_super.apply(this, args);

			this.font = this.font.replace(
				/(\d+)(px|em|rem|pt)/g,
				function(w, m, u) {
					return (m / pixelRatio) + u;
				}
			);
		};
	})(prototype.fillText);

	prototype.strokeText = (function(_super) {
		return function() {
			var args = Array.prototype.slice.call(arguments);

			args[1] *= pixelRatio; // x
			args[2] *= pixelRatio; // y

			this.font = this.font.replace(
				/(\d+)(px|em|rem|pt)/g,
				function(w, m, u) {
					return (m * pixelRatio) + u;
				}
			);

			_super.apply(this, args);

			this.font = this.font.replace(
				/(\d+)(px|em|rem|pt)/g,
				function(w, m, u) {
					return (m / pixelRatio) + u;
				}
			);
		};
	})(prototype.strokeText);
})(CanvasRenderingContext2D.prototype);
;(function(prototype) {
	prototype.getContext = (function(_super) {
		return function(type) {
			var backingStore, ratio,
				context = _super.call(this, type);

			if (type === '2d') {

				backingStore = context.backingStorePixelRatio ||
							context.webkitBackingStorePixelRatio ||
							context.mozBackingStorePixelRatio ||
							context.msBackingStorePixelRatio ||
							context.oBackingStorePixelRatio ||
							context.backingStorePixelRatio || 1;

				ratio = (window.devicePixelRatio || 1) / backingStore;

				if (ratio > 1) {
					this.style.height = this.height + 'px';
					this.style.width = this.width + 'px';
					this.width *= ratio;
					this.height *= ratio;
				}
			}

			return context;
		};
	})(prototype.getContext);
})(HTMLCanvasElement.prototype);

},{}],7:[function(require,module,exports){
'use strict';
/* eslint-disable no-unused-vars */
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (e) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],8:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.7.1
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

}).call(this,require('_process'))
},{"_process":9}],9:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],10:[function(require,module,exports){
(function (global){
var now = require('performance-now')
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function() {
  root.requestAnimationFrame = raf
  root.cancelAnimationFrame = caf
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"performance-now":8}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hexRgb = require('hex-rgb');

var _hexRgb2 = _interopRequireDefault(_hexRgb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = function () {
  function Circle() {
    var radius = arguments.length <= 0 || arguments[0] === undefined ? 40 : arguments[0];
    var hexFillColor = arguments.length <= 1 || arguments[1] === undefined ? "#ff0000" : arguments[1];
    var hexStrokeColor = arguments[2];

    _classCallCheck(this, Circle);

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


  _createClass(Circle, [{
    key: 'setScale',
    value: function setScale(scale) {
      this.scaleX = scale.x < 0 ? 0 : scale.x;
      this.scaleY = scale.y < 0 ? 0 : scale.y;
    }

    /**
     * @param {string} color
     * @param {number} alpha
     */

  }, {
    key: 'setFillStyle',
    value: function setFillStyle(color, alpha) {
      this.fillColor = getColor(color, alpha);
      this.fillStyle = getRGBA(this.fillColor);
    }

    /**
     * @param {string} color
     * @param {number} alpha
     */

  }, {
    key: 'setStrokeStyle',
    value: function setStrokeStyle(color, alpha) {
      this.strokeColor = getColor(color, alpha);
      this.strokeStyle = getRGBA(this.strokeColor);
    }

    /**
     * @param {number} alpha
     */

  }, {
    key: 'setFillAlpha',
    value: function setFillAlpha(alpha) {
      this.fillColor.alpha = alpha;
      this.fillStyle = getRGBA(this.fillColor);
    }

    /**
     * @param {number} alpha
     */

  }, {
    key: 'setStrokeAlpha',
    value: function setStrokeAlpha(alpha) {
      this.strokeColor.alpha = alpha;
      this.strokeStyle = getRGBA(this.strokeColor);
    }

    /**
     * @param {CanvasRenderingContext2D} context
     */

  }, {
    key: 'draw',
    value: function draw(context) {
      context.save();

      context.translate(this.x, this.y);
      context.rotate(this.rotation);
      context.scale(this.scaleX, this.scaleY);

      context.lineWidth = this.lineWidth;
      context.fillStyle = this.fillStyle;

      context.beginPath();
      // context.arc(x, y, radius, start_angle, end_angle, anti-clockwise)
      context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
      context.closePath();

      context.fill();

      if (this.lineWidth > 0) {
        context.strokeStyle = this.strokeStyle;
        context.stroke();
      }

      context.restore();
    }
  }]);

  return Circle;
}();

/**
 * @param {string} color - HEX representation of color, can be used with # or without #
 * @param {number} alpha
 * @returns {{red:number, green:number, blue:number, alpha: number}}
 */


exports.default = Circle;
function getColor(color) {
  var alpha = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

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

  var _hexRGB = (0, _hexRgb2.default)(color);

  var _hexRGB2 = _slicedToArray(_hexRGB, 3);

  var red = _hexRGB2[0];
  var green = _hexRGB2[1];
  var blue = _hexRGB2[2];


  return {
    red: red,
    green: green,
    blue: blue,
    alpha: alpha
  };
}

/**
 * @param {{red:number, green:number, blue:number, alpha: number}} color
 * @returns {string}
 */
function getRGBA(color) {
  var red = color.red;
  var green = color.green;
  var blue = color.blue;
  var alpha = color.alpha;

  return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
}
module.exports = exports['default'];

},{"hex-rgb":5}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = make;

require('hidpi-canvas/dist/hidpi-canvas');

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _easingJs = require('easing-js');

var _easingJs2 = _interopRequireDefault(_easingJs);

var _Circle = require('./Circle');

var _Circle2 = _interopRequireDefault(_Circle);

var _offsetParent = require('./offsetParent');

var _offsetParent2 = _interopRequireDefault(_offsetParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function make(options) {
  var rafId;
  var canvas;
  var context;
  var canvasWidth;
  var canvasHeight;
  var circles = [];
  var totalIterations;
  var currentIteration;
  var defaultCenterWaveSelector = '.js-wavy-center';

  var Wavy = function () {
    function Wavy(options) {
      _classCallCheck(this, Wavy);

      this.options = (0, _objectAssign2.default)({}, options);
      this.hexFillColor = options.hexFillColor;
      this.hexStrokeColor = options.hexStrokeColor;
      this.onlyWaves = typeof options.onlyWaves === 'undefined' ? true : options.onlyWaves;
      this.radiuses = options.radiuses;
      this.duration = options.duration;
      this.selector = options.selector;
      this.centerWave = options.centerWave;
      this.centerWaveSelector = options.centerWaveSelector || defaultCenterWaveSelector;
      this.selectorEl = this.options.selectorEl || null;

      this.generateCircles();
      this.createCanvas();
      this.setupCanvas();
      this.setupCenterWave();
      this.setupAnimation();
      this.attachEvents();
    }

    _createClass(Wavy, [{
      key: 'generateCircles',
      value: function generateCircles() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.radiuses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var radius = _step.value;

            circles.push(new _Circle2.default(radius, this.hexFillColor, this.hexStrokeColor));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }, {
      key: 'setupCanvas',
      value: function setupCanvas() {
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
    }, {
      key: 'setupCenterWave',
      value: function setupCenterWave() {
        if (hasOptionsCenterWave.call(this)) {
          return;
        }

        var centerWaveEl = this.selectorEl.querySelector(this.centerWaveSelector);

        if (centerWaveEl === null) {
          this.centerWave = {
            x: canvasWidth / 2,
            y: canvasHeight / 2
          };

          return;
        }

        // We have centerWave element somewhere in the DOM
        // and centerWave wasn't set directly thus we have to calculate centerWave manually
        this.centerWave = (0, _offsetParent2.default)(this.selectorEl, centerWaveEl);
      }
    }, {
      key: 'start',
      value: function start() {
        if (!isDrawing()) {
          draw.call(this);
        }

        return this;
      }
    }, {
      key: 'stop',
      value: function stop() {
        if (isDrawing()) {
          (0, _raf.cancel)(rafId);
          rafId = undefined;
        }

        return this;
      }
    }, {
      key: 'attachEvents',
      value: function attachEvents() {
        var _this = this;

        window.addEventListener('resize', function () {
          _this.setupCanvas();
          _this.setupCenterWave();
          _this.setupAnimation();
        });
      }
    }, {
      key: 'setupAnimation',
      value: function setupAnimation() {
        totalIterations = this.duration / 1000 * 60;
        currentIteration = 0;

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = circles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var circle = _step2.value;

            circle.x = this.centerWave.x;
            circle.y = this.centerWave.y;
            circle.setFillStyle(this.hexFillColor, 0);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }, {
      key: 'createCanvas',
      value: function createCanvas() {
        canvas = document.createElement('canvas');

        var el = this.selectorEl ? this.selectorEl : document.querySelector(this.selector);

        if (el === null) {
          throw new Error('Not found element: ' + this.selector + ' in the DOM');
        }

        el.appendChild(canvas);

        this.selectorEl = el;
      }
    }]);

    return Wavy;
  }();

  /**
   * @private
   * @returns {boolean}
   */


  function hasOptionsCenterWave() {
    return this.options.centerWave !== null && _typeof(this.options.centerWave) === 'object' && typeof this.options.centerWave.x === 'number' && typeof this.options.centerWave.y === 'number';
  }

  /**
   * @private
   */
  function draw() {
    var _this2 = this;

    context.clearRect(0, 0, canvasWidth, canvasHeight);

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = circles[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var circle = _step3.value;

        // This is madness...
        // When changeInValue is equal to -1 which is what we basically want...
        // Safari has weird bug and display black, non-transparent circles in one frame
        // which looks like animation glitch.
        // It occurs only in Safari 9.1.1 on OS X 10.11.5

        // All easing functions has this form in terms of parameters which they take
        // (currentIteration, startValue, changeInValue, totalIterations)
        var opacity = _easingJs2.default.easeInOutCubic(currentIteration, 1, -0.99, totalIterations);
        var scale = _easingJs2.default.easeInOutCubic(currentIteration, 1, 0.618, totalIterations);

        circle.setScale({ x: scale, y: scale });

        if (!this.onlyWaves) {
          circle.setFillAlpha(opacity);
        }

        circle.setStrokeAlpha(opacity);

        circle.draw(context);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    currentIteration = currentIteration < totalIterations ? currentIteration + 1 : 0;

    rafId = (0, _raf2.default)(function () {
      return draw.call(_this2);
    });
  }

  function isDrawing() {
    return typeof rafId !== 'undefined';
  }

  return new Wavy(options);
}
module.exports = exports['default'];

},{"./Circle":11,"./offsetParent":13,"easing-js":3,"hidpi-canvas/dist/hidpi-canvas":6,"object-assign":7,"raf":10}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = offsetParent;
/**
 * @param {HTMLElement} parent
 * @param {HTMLElement} child
 * @returns {{x: number, y: number}}
 */
function offsetParent(parent, child) {
  var pRect = parent.getBoundingClientRect();
  var cRect = child.getBoundingClientRect();

  return {
    x: -(pRect.left - cRect.left - cRect.width / 2),
    y: -(pRect.top - cRect.top - cRect.height / 2)
  };
}
module.exports = exports["default"];

},{}]},{},[1]);

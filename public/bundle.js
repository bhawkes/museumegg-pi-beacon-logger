(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
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
    var timeout = runTimeout(cleanUpNextTick);
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
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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

},{}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":8}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/number/is-nan"), __esModule: true };
},{"core-js/library/fn/number/is-nan":9}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":10}],5:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],6:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":4}],7:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],8:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');
},{"../modules/core.get-iterator":43,"../modules/es6.string.iterator":46,"../modules/web.dom.iterable":47}],9:[function(require,module,exports){
require('../../modules/es6.number.is-nan');
module.exports = require('../../modules/$.core').Number.isNaN;
},{"../../modules/$.core":16,"../../modules/es6.number.is-nan":45}],10:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":31}],11:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],12:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],13:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":26}],14:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":15,"./$.wks":41}],15:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],16:[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],17:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":11}],18:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],19:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":21}],20:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":16,"./$.ctx":17,"./$.global":22}],21:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],22:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],23:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],24:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.descriptors') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":31,"./$.descriptors":19,"./$.property-desc":33}],25:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":15}],26:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],27:[function(require,module,exports){
'use strict';
var $              = require('./$')
  , descriptor     = require('./$.property-desc')
  , setToStringTag = require('./$.set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./$":31,"./$.hide":24,"./$.property-desc":33,"./$.set-to-string-tag":35,"./$.wks":41}],28:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./$.library')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , hide           = require('./$.hide')
  , has            = require('./$.has')
  , Iterators      = require('./$.iterators')
  , $iterCreate    = require('./$.iter-create')
  , setToStringTag = require('./$.set-to-string-tag')
  , getProto       = require('./$').getProto
  , ITERATOR       = require('./$.wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , methods, key;
  // Fix native
  if($native){
    var IteratorPrototype = getProto($default.call(new Base));
    // Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    // fix Array#{values, @@iterator}.name in V8 / FF
    if(DEF_VALUES && $native.name !== VALUES){
      VALUES_BUG = true;
      $default = function values(){ return $native.call(this); };
    }
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES  ? $default : getMethod(VALUES),
      keys:    IS_SET      ? $default : getMethod(KEYS),
      entries: !DEF_VALUES ? $default : getMethod('entries')
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./$":31,"./$.export":20,"./$.has":23,"./$.hide":24,"./$.iter-create":27,"./$.iterators":30,"./$.library":32,"./$.redefine":34,"./$.set-to-string-tag":35,"./$.wks":41}],29:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],30:[function(require,module,exports){
module.exports = {};
},{}],31:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],32:[function(require,module,exports){
module.exports = true;
},{}],33:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],34:[function(require,module,exports){
module.exports = require('./$.hide');
},{"./$.hide":24}],35:[function(require,module,exports){
var def = require('./$').setDesc
  , has = require('./$.has')
  , TAG = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./$":31,"./$.has":23,"./$.wks":41}],36:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":22}],37:[function(require,module,exports){
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$.defined":18,"./$.to-integer":38}],38:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],39:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./$.iobject')
  , defined = require('./$.defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./$.defined":18,"./$.iobject":25}],40:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],41:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , uid    = require('./$.uid')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"./$.global":22,"./$.shared":36,"./$.uid":40}],42:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./$.classof":14,"./$.core":16,"./$.iterators":30,"./$.wks":41}],43:[function(require,module,exports){
var anObject = require('./$.an-object')
  , get      = require('./core.get-iterator-method');
module.exports = require('./$.core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./$.an-object":13,"./$.core":16,"./core.get-iterator-method":42}],44:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./$.add-to-unscopables')
  , step             = require('./$.iter-step')
  , Iterators        = require('./$.iterators')
  , toIObject        = require('./$.to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./$.add-to-unscopables":12,"./$.iter-define":28,"./$.iter-step":29,"./$.iterators":30,"./$.to-iobject":39}],45:[function(require,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $export = require('./$.export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});
},{"./$.export":20}],46:[function(require,module,exports){
'use strict';
var $at  = require('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./$.iter-define":28,"./$.string-at":37}],47:[function(require,module,exports){
require('./es6.array.iterator');
var Iterators = require('./$.iterators');
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
},{"./$.iterators":30,"./es6.array.iterator":44}],48:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))
},{"_process":1}],49:[function(require,module,exports){
"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _vector = require("./vector");

var _vector2 = _interopRequireDefault(_vector);

var Circle = (function () {
  function Circle(position, radius) {
    _classCallCheck(this, Circle);

    (0, _invariant2["default"])(position instanceof _vector2["default"], "Expected `position` to be a Vector instance.");
    (0, _invariant2["default"])(typeof radius === "number", "Expected `radius` to be a number.");

    this.position = position;
    this.radius = radius;
  }

  _createClass(Circle, [{
    key: "equals",
    value: function equals(circle) {
      return this === circle || this.position.equals(circle.position) && this.radius === circle.radius;
    }
  }, {
    key: "x",
    get: function get() {
      return this.position.x;
    }
  }, {
    key: "y",
    get: function get() {
      return this.position.y;
    }
  }]);

  return Circle;
})();

exports["default"] = Circle;
module.exports = exports["default"];
},{"./vector":58,"babel-runtime/helpers/class-call-check":5,"babel-runtime/helpers/create-class":6,"babel-runtime/helpers/interop-require-default":7,"invariant":48}],50:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _circle = require("./circle");

var _circle2 = _interopRequireDefault(_circle);

var _line = require("./line");

var _line2 = _interopRequireDefault(_line);

var _vector = require("./vector");

var _vector2 = _interopRequireDefault(_vector);

var _laterate = require("./laterate");

var _laterate2 = _interopRequireDefault(_laterate);

exports.Circle = _circle2["default"];
exports.Line = _line2["default"];
exports.Vector = _vector2["default"];
exports.laterate = _laterate2["default"];
},{"./circle":49,"./laterate":51,"./line":52,"./vector":58,"babel-runtime/helpers/interop-require-default":7}],51:[function(require,module,exports){
"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = laterate;

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _circle = require("./circle");

var _circle2 = _interopRequireDefault(_circle);

var _utilsPair = require("./utils/pair");

var _utilsPair2 = _interopRequireDefault(_utilsPair);

var _utilsSubtractCircles = require("./utils/subtractCircles");

var _utilsSubtractCircles2 = _interopRequireDefault(_utilsSubtractCircles);

var _utilsIntersectLines = require("./utils/intersectLines");

var _utilsIntersectLines2 = _interopRequireDefault(_utilsIntersectLines);

function laterate(arr) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(arr), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var obj = _step.value;

      (0, _invariant2["default"])(obj instanceof _circle2["default"], "All elements in `arr` are expected to be Circle instances.");
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  (0, _invariant2["default"])(arr.length > 2, "At least three Circles are necessary for lateration.");

  var pairs = (0, _utilsPair2["default"])(arr);

  var lines = pairs.map(function (pair) {
    return (0, _utilsSubtractCircles2["default"])(pair[0], pair[1]);
  }).filter(function (obj) {
    return obj && obj.slope && obj.intercept;
  });

  pairs = (0, _utilsPair2["default"])(lines);

  var points = pairs.map(function (pair) {
    return (0, _utilsIntersectLines2["default"])(pair[0], pair[1]);
  }).filter(function (obj) {
    return obj && obj.x && obj.y;
  });

  if (points.length === 0) {
    console.error("Out of Range: No point could be calculated from Circle set.");
    return null;
  }

  // NOTE: This is a destructive operation as it is mutating points!
  var result = points.reduce(function (a, b) {
    a.x += b.x;
    a.y += b.y;
    return a;
  });

  result.normalize(points.length);
  return result;
}

module.exports = exports["default"];
},{"./circle":49,"./utils/intersectLines":53,"./utils/pair":55,"./utils/subtractCircles":56,"babel-runtime/core-js/get-iterator":2,"babel-runtime/helpers/interop-require-default":7,"invariant":48}],52:[function(require,module,exports){
"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require("invariant");

// Line, short for "linear function"

var _invariant2 = _interopRequireDefault(_invariant);

var Line = (function () {
  function Line(slope, intercept) {
    _classCallCheck(this, Line);

    // For f(x) = m*x + a, `m` is the slope and `a` is the intercept
    (0, _invariant2["default"])(typeof slope === "number", "Expected `slope` to be a number.");
    (0, _invariant2["default"])(typeof intercept === "number", "Expected `intercept` to be a number.");

    this.slope = slope;
    this.intercept = intercept;
  }

  _createClass(Line, [{
    key: "solve",
    value: function solve(x) {
      return this.slope * x + this.intercept;
    }
  }, {
    key: "equals",
    value: function equals(line) {
      return this === line || this.slope === line.slope && this.intercept === line.intercept;
    }
  }]);

  return Line;
})();

exports["default"] = Line;
module.exports = exports["default"];
},{"babel-runtime/helpers/class-call-check":5,"babel-runtime/helpers/create-class":6,"babel-runtime/helpers/interop-require-default":7,"invariant":48}],53:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = intersectLines;

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _line = require("../line");

var _line2 = _interopRequireDefault(_line);

var _vector = require("../vector");

var _vector2 = _interopRequireDefault(_vector);

var _isNumber = require("./isNumber");

var _isNumber2 = _interopRequireDefault(_isNumber);

function intersectLines(a, b) {
  (0, _invariant2["default"])(a instanceof _line2["default"], "Expected `a` to be a Line instance.");
  (0, _invariant2["default"])(b instanceof _line2["default"], "Expected `b` to be a Line instance.");

  if (a.slope === b.slope) {
    return null;
  }

  // Is `a` vertical and `b` valid?
  if (!(0, _isNumber2["default"])(a.slope) && !(0, _isNumber2["default"])(a.intercept) && (0, _isNumber2["default"])(b.slope) && (0, _isNumber2["default"])(b.intercept)) {
    return new _vector2["default"](0, b.solve(0));
  }

  // Is `b` vertical and `a` valid?
  if (!(0, _isNumber2["default"])(b.slope) && !(0, _isNumber2["default"])(b.intercept) && (0, _isNumber2["default"])(a.slope) && (0, _isNumber2["default"])(a.intercept)) {
    return new _vector2["default"](0, a.solve(0));
  }

  // Are `a` or `b` invalid?
  if (!(0, _isNumber2["default"])(a.slope) || !(0, _isNumber2["default"])(a.intercept) || !(0, _isNumber2["default"])(b.slope) || !(0, _isNumber2["default"])(b.intercept)) {
    return null;
  }

  // Are `a` and `b` parallel to each other?
  if (a.intercept === b.intercept) {
    return new _vector2["default"](0, a.intercept);
  }

  var x = (b.intercept - a.intercept) / (a.slope - b.slope);
  var y = a.solve(x);

  // Is the result not NaN (division by zero)
  if (!(0, _isNumber2["default"])(x) || !(0, _isNumber2["default"])(y)) {
    return null;
  }

  return new _vector2["default"](x, y);
}

module.exports = exports["default"];
},{"../line":52,"../vector":58,"./isNumber":54,"babel-runtime/helpers/interop-require-default":7,"invariant":48}],54:[function(require,module,exports){
"use strict";

var _Number$isNaN = require("babel-runtime/core-js/number/is-nan")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isNumber;

function isNumber(x) {
  return !_Number$isNaN(x) && x !== Number.POSITIVE_INFINITY && x !== Number.NEGATIVE_INFINITY;
}

module.exports = exports["default"];
},{"babel-runtime/core-js/number/is-nan":3}],55:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = pair;

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

function pair(arr) {
  (0, _invariant2["default"])(Array.isArray(arr), "Expected `arr` to be an array.");

  var result = [];

  for (var i = 0; i < arr.length - 1; i++) {
    var _i = arr[i];
    for (var j = i + 1; j < arr.length; j++) {
      var _j = arr[j];
      result.push([_i, _j]);
    }
  }

  return result;
}

module.exports = exports["default"];
},{"babel-runtime/helpers/interop-require-default":7,"invariant":48}],56:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = subtractCircles;

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _circle = require("../circle");

var _circle2 = _interopRequireDefault(_circle);

var _line = require("../line");

var _line2 = _interopRequireDefault(_line);

var _subtractVectors = require("./subtractVectors");

var _subtractVectors2 = _interopRequireDefault(_subtractVectors);

function sqr(x) {
  return x * x;
}

function subtractCircles(a, b) {
  (0, _invariant2["default"])(a instanceof _circle2["default"], "Expected `a` to be a Circle instance.");
  (0, _invariant2["default"])(b instanceof _circle2["default"], "Expected `b` to be a Circle instance.");

  var vec = (0, _subtractVectors2["default"])(a.position, b.position);
  if (vec.length >= a.radius + b.radius) {
    return null;
  }

  var slope = (a.x - b.x) / (b.y - a.y);
  var intercept = (sqr(a.x) + sqr(a.y) + sqr(b.radius) - sqr(a.radius) - sqr(b.x) - sqr(b.y)) / (2 * (a.y - b.y));

  return new _line2["default"](slope, intercept);
}

module.exports = exports["default"];
},{"../circle":49,"../line":52,"./subtractVectors":57,"babel-runtime/helpers/interop-require-default":7,"invariant":48}],57:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = subtractVectors;

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _vector = require("../vector");

var _vector2 = _interopRequireDefault(_vector);

var _isNumber = require("./isNumber");

var _isNumber2 = _interopRequireDefault(_isNumber);

function subtractVectors(a, b) {
  (0, _invariant2["default"])(a instanceof _vector2["default"], "Expected `a` to be a Vector instance.");
  (0, _invariant2["default"])(b instanceof _vector2["default"], "Expected `b` to be a Vector instance.");
  (0, _invariant2["default"])(!a.equals(b), "Expected unique vectors.");

  if (a.equals(b)) {
    return new _vector2["default"](); // Null Vector
  }

  var x = b.x - a.x;
  var y = b.y - a.y;

  if (!(0, _isNumber2["default"])(x) || !(0, _isNumber2["default"])(y)) {
    return null;
  }

  return new _vector2["default"](x, y);
}

module.exports = exports["default"];
},{"../vector":58,"./isNumber":54,"babel-runtime/helpers/interop-require-default":7,"invariant":48}],58:[function(require,module,exports){
"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _utilsIsNumber = require("./utils/isNumber");

var _utilsIsNumber2 = _interopRequireDefault(_utilsIsNumber);

var Vector = (function () {
  function Vector() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    _classCallCheck(this, Vector);

    (0, _invariant2["default"])(typeof x === "number", "Expected `x` to be a number.");
    (0, _invariant2["default"])(typeof y === "number", "Expected `y` to be a number.");

    (0, _invariant2["default"])((0, _utilsIsNumber2["default"])(x) && (0, _utilsIsNumber2["default"])(y), "Expected `x` and `y` to be numbers.");

    this.x = x;
    this.y = y;
  }

  _createClass(Vector, [{
    key: "normalize",
    value: function normalize() {
      var n = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      (0, _invariant2["default"])(n !== 0, "NaN Error! Can't divide by 0.");

      this.x = this.x / n;
      this.y = this.y / n;
    }
  }, {
    key: "asObject",
    value: function asObject() {
      return {
        x: this.x,
        y: this.y
      };
    }
  }, {
    key: "asArray",
    value: function asArray() {
      return [this.x, this.y];
    }
  }, {
    key: "equals",
    value: function equals(vector) {
      return this === vector || this.x === vector.x && this.y === vector.y;
    }
  }, {
    key: "length",
    get: function get() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }]);

  return Vector;
})();

exports["default"] = Vector;
module.exports = exports["default"];
},{"./utils/isNumber":54,"babel-runtime/helpers/class-call-check":5,"babel-runtime/helpers/create-class":6,"babel-runtime/helpers/interop-require-default":7,"invariant":48}],59:[function(require,module,exports){
'use strict';

var lateration = require("lateration");
var Circle = lateration.Circle;
var Vector = lateration.Vector;
var laterate = lateration.laterate;

var socket = io.connect("192.168.5.120:8081");

var vm = new Vue({
	el: '#app',
	data: {
		position: {
			x: 100,
			y: 100
		},
		beacons: {
			"2cd0879d64c80a451cf39ecfdd55dee9-28925-47754": {
				// static
				uuid: "2cd0879d64c80a451cf39ecfdd55dee9",
				name: "ice",
				major: 28925,
				minor: 47754,
				x: 515,
				y: 170,
				fill: "aqua",
				// variable
				power: 0,
				rssi: 0,
				lastSeen: 0,
				accuracy: 0,
				circle: new Circle(new Vector(0, 0), 0)
			},
			"2cd0879d64c80a451cf39ecfdd55dee9-35635-47204": {
				uuid: "2cd0879d64c80a451cf39ecfdd55dee9",
				name: "mint",
				major: 35635,
				minor: 47204,
				x: 608,
				y: 42,
				fill: "aquamarine",
				power: 0,
				rssi: 0,
				lastSeen: 0,
				accuracy: 0,
				circle: new Circle(new Vector(0, 0), 0)
			},
			"2cd0879d64c80a451cf39ecfdd55dee9-4681-49931": {
				uuid: "2cd0879d64c80a451cf39ecfdd55dee9",
				name: "blueberry",
				major: 4681,
				minor: 49931,
				x: 675,
				y: 175,
				fill: "rebeccapurple",
				power: 0,
				rssi: 0,
				lastSeen: 0,
				accuracy: 0,
				circle: new Circle(new Vector(0, 0), 0)
			}
		}
	},
	computed: {

	},
	methods: {
		parseBeacon: function(data) {

			var beaconID = `${data.uuid}-${data.major}-${data.minor}`;

			// check if beacon is one of ours
			if (!vm.beacons[beaconID]) {
				console.log(`Unknown beacon: ${beaconID}`);
			} else {

				// update beacon
				vm.beacons[beaconID] = Object.assign(vm.beacons[beaconID], {
					power: data.power,
					rssi: data.rssi,
					lastSeen: Date.now(),
					accuracy: calculateAccuracy(data.power, data.rssi)
				});

				var scaledAccuracy = vm.beacons[beaconID].accuracy * 40;

				if (scaledAccuracy > 150) {
					scaledAccuracy = 150;
				}

				vm.beacons[beaconID].circle = new Circle(new Vector(vm.beacons[beaconID].x, vm.beacons[beaconID].y), scaledAccuracy)

				vm.updatePosition();

			}
		},
		updatePosition: function() {

			console.log("updating position");

			var circles = [];

			for (var beacon in vm.beacons) {
				// if data >
				if (vm.beacons[beacon].circle.radius > 0) {
					circles.push(vm.beacons[beacon].circle);
				}
			}

			if (circles.length >= 3) {
				var lateration = laterate(circles);
				console.log(lateration);
				if (lateration) {
					vm.position = lateration;
				} else {
					////
				}
			}



		}
	},
	ready: function() {
		console.log('vue is ready');

		socket.on('discovery', function(data) {
			vm.parseBeacon(data);
		});
	}
});




function calculateAccuracy(txPower, rssi) {
	if (rssi === 0) {
		return -1.0;
	}

	var ratio = rssi * 1.0 / txPower;
	if (ratio < 1.0) {
		return Math.pow(ratio, 10);
	} else {
		var accuracy = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
		return accuracy;
	}
}

},{"lateration":50}]},{},[59]);

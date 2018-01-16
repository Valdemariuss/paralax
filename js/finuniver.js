webpackJsonp([1,5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _smoothScroll = __webpack_require__(2);

	var _smoothScroll2 = _interopRequireDefault(_smoothScroll);

	var _popups = __webpack_require__(3);

	var _popups2 = _interopRequireDefault(_popups);

	var _formValidation = __webpack_require__(22);

	var _formValidation2 = _interopRequireDefault(_formValidation);

	var _buttonWaves = __webpack_require__(24);

	var _buttonWaves2 = _interopRequireDefault(_buttonWaves);

	var _social = __webpack_require__(26);

	var _social2 = _interopRequireDefault(_social);

	__webpack_require__(62);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _jquery2.default)(function () {
	  // svg sprite init
	  var __sprite__ = { filename: __webpack_require__.p +"assets/svg/landing-paralax-sprite.svg" };
	  // require basic or custom sprite loader
	  __webpack_require__(80)(__sprite__);

	  // Disable drag events
	  (0, _jquery2.default)(document).find('a, img').on('drag dragend dragenter dragexit dragleave dragover dragstart drop', false);

	  (0, _popups2.default)();

	  (0, _formValidation2.default)();
	  (0, _buttonWaves2.default)();
	  (0, _social2.default)();

	  function headerStickyShow() {
	    var menuWrap = (0, _jquery2.default)('.portfolio-header');
	    var menuHeight = menuWrap.outerHeight();

	    if ((0, _jquery2.default)(window).scrollTop() > menuHeight) {
	      menuWrap.addClass('portfolio-header--fixed');
	    } else {
	      menuWrap.removeClass('portfolio-header--fixed');
	    }
	  }

	  (0, _jquery2.default)(window).scroll(function () {
	    headerStickyShow();
	  });

	  (0, _jquery2.default)(window).ready(function () {
	    headerStickyShow();
	  });

	  (0, _jquery2.default)('#showMore').click(function (event) {
	    event.preventDefault();
	    (0, _jquery2.default)(this).hide();
	    (0, _jquery2.default)('#hidden').slideDown(150);
	  });

	  (0, _jquery2.default)('.portfolio-header__logo').on('click', function (event) {
	    event.preventDefault();
	    _smoothScroll2.default.animateScroll(0);
	  });

	  // paralax
	  (0, _jquery2.default)(window).ready(function () {

	    function debounce(func, wait, immediate) {
	      var args, result, thisArg, timeoutId;

	      function delayed() {
	        timeoutId = null;
	        if (!immediate) {
	          result = func.apply(thisArg, args);
	        }
	      }

	      return function () {
	        var isImmediate = immediate && !timeoutId;
	        args = arguments;
	        thisArg = this;

	        clearTimeout(timeoutId);
	        timeoutId = setTimeout(delayed, wait);

	        if (isImmediate) {
	          result = func.apply(thisArg, args);
	        }
	        return result;
	      };
	    }

	    function landingIconsParalax() {
	      var $items = (0, _jquery2.default)(".landing-icons__item"),
	          windowTop = (0, _jquery2.default)(window).scrollTop(),
	          windowHeight = 0,
	          windowBottom = 0,
	          lazyCalc = debounce(function () {
	        windowTop = (0, _jquery2.default)(window).scrollTop();
	        windowHeight = (0, _jquery2.default)(window).outerHeight();
	        windowBottom = windowTop + windowHeight;
	      }, 8, false);

	      $items.each(function () {
	        var $item = (0, _jquery2.default)(this),
	            scrollSpeed = $item.data("scroll-speed") || 0.15,
	            itemTop = $item.offset().top,
	            itemHeight = $item.outerHeight(),
	            itemBottom = itemTop + itemHeight,
	            isAddAnimation = false,
	            topOnWindow,
	            itemOffset = 0,

	        // scrolled = $(window).scrollTop(),
	        itemPosition = function itemPosition() {
	          itemOffset = topOnWindow * scrollSpeed;
	          // itemOffset = scrolled * scrollSpeed * -1;
	          itemOffset = parseInt(itemOffset);
	          // $item.css('margin-top', itemOffset + 'px');
	          $item.css('transform', 'translate(0, ' + itemOffset + 'px)');
	          //$item.attr('data-scrolled', scrolled).attr('data-itemOffset', itemOffset);
	        },
	            scrollPadding = 300,
	            lazyAnimateBlink = debounce(function () {
	          if (!isAddAnimation) {
	            var scrollAntiPadding = 50;
	            if (windowBottom - scrollAntiPadding > itemTop && itemBottom - scrollAntiPadding > windowTop) {
	              topOnWindow = itemTop - windowTop;
	              if (topOnWindow + itemHeight > 0) {
	                setTimeout(function () {
	                  $item.addClass("animate-blink");
	                }, 100);
	                isAddAnimation = true;
	                lazyAnimateBlink = function lazyAnimateBlink() {};
	              }
	            }
	          }
	        }, 50, false),
	            lazyItemPosition = debounce(function () {
	          if (windowBottom + scrollPadding > itemTop && itemBottom + scrollPadding > windowTop) {
	            topOnWindow = itemTop - windowTop;
	            if (topOnWindow + itemHeight > 0) {
	              itemPosition();
	            }
	          }
	        }, 10, false);

	        // itemPosition();
	        setTimeout(function () {
	          $item.addClass("paralax-init");
	        }, 200);
	        (0, _jquery2.default)(window).on('scroll.paralax', function () {
	          lazyItemPosition();
	          lazyAnimateBlink();
	        });
	      });

	      (0, _jquery2.default)(window).on('resize.paralax scroll.paralax', lazyCalc);
	      (0, _jquery2.default)(window).trigger('scroll.paralax');
	    }
	    landingIconsParalax();
	  });
	});

/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = initPopups;

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _popupContent = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// TODO: refactor popup animation, gsap takes too much space in vendor bundle

	// ms
	var ANIMATION_DURATION = 160;

	function initPopups() {

	  var $modal = (0, _jquery2.default)('#modal');
	  var $backdrop = $modal.find('.modal__backdrop');

	  var $toolPopup = $modal.find('.modal-popup--tools');
	  var $orderPopup = $modal.find('.modal-popup--form');
	  var $policyPopup = $modal.find('.modal-popup--policy');

	  var ios = (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i)) && navigator.userAgent.indexOf("Safari") > -1;

	  function setToolsContent(_ref) {
	    var img = _ref.img,
	        header = _ref.header,
	        text = _ref.text,
	        buttonLabel = _ref.buttonLabel;

	    $toolPopup.find('.modal-tool__img-wrap img').attr('src', img).attr('alt', header);

	    $toolPopup.find('.modal-tool__title').html(header);

	    $toolPopup.find('.modal-tool__text').html(text);

	    $toolPopup.find('.button-primary--tool-popup .button-primary__text').html(buttonLabel);
	  }

	  function showPopup(popup) {
	    popup.addClass('modal-popup--show modal-popup--show-active');
	    return new Promise(function (resolve) {
	      popup.animate({
	        transform: 'scale(1)',
	        opacity: 1
	      }, ANIMATION_DURATION, function () {
	        (0, _jquery2.default)('body, html').addClass('oveflow');
	        popup.removeClass('modal-popup--show-active');
	        resolve();
	      });
	    });
	  }

	  function hidePopup(popup) {
	    popup.addClass('modal-popup--hide-active');
	    return new Promise(function (resolve) {
	      popup.animate({
	        transform: 'scale(.95)',
	        opacity: 0
	      }, ANIMATION_DURATION, function () {
	        (0, _jquery2.default)('body, html').removeClass('oveflow');
	        popup.removeClass('modal-popup--hide-active');
	        popup.removeClass('modal-popup--show');
	        resolve();
	      });
	    });
	  }

	  function show(popup) {
	    showModal().then(function () {
	      showBackdrop();
	      showPopup(popup);
	    });
	  }

	  function hide() {

	    ios && (0, _jquery2.default)('html, body').removeClass('ios--fix');

	    var $popup = $modal.find('.modal-popup--show');
	    hideBackdrop();
	    hidePopup($popup).then(function () {
	      hideModal();
	    });
	  }

	  function showModal() {
	    return new Promise(function (resolve) {
	      $modal.css({ display: 'flex' });
	      resolve();
	    });
	  }

	  function hideModal() {
	    return new Promise(function (resolve) {
	      $modal.css({ display: 'none' });
	      resolve();
	    });
	  }

	  function showBackdrop() {
	    return new Promise(function (resolve) {
	      $backdrop.animate({
	        opacity: .95
	      }, ANIMATION_DURATION, function () {
	        $backdrop.addClass('modal-backdrop--show');
	        resolve();
	      });
	    });
	  }

	  function hideBackdrop() {
	    return new Promise(function (resolve) {
	      $backdrop.animate({
	        opacity: 0
	      }, ANIMATION_DURATION, function () {
	        $backdrop.removeClass('modal-backdrop--show');
	        resolve();
	      });
	    });
	  }

	  $toolPopup[0].$show = show.bind(null, $toolPopup);
	  $toolPopup[0].$hide = hide;

	  $orderPopup[0].$show = show.bind(null, $orderPopup);
	  $orderPopup[0].$hide = hide;

	  $policyPopup[0].$show = show.bind(null, $policyPopup);
	  $policyPopup[0].$hide = hide;

	  $modal.on('click', '.modal-popup__close, .modal__backdrop', hide);

	  $toolPopup.on('click', '.button-primary--tool-popup', function () {
	    hidePopup($toolPopup).then(function () {
	      ios && (0, _jquery2.default)('html, body').addClass('ios--fix');
	      showPopup($orderPopup);
	    });
	  });

	  (0, _jquery2.default)('.button-primary--landing, .button-primary--chayka').on('click', function () {
	    ios && (0, _jquery2.default)('html, body').addClass('ios--fix');
	    show($orderPopup);
	  });
	  (0, _jquery2.default)('.footer__copy-link').on('click', function () {
	    return show($policyPopup);
	  });
	  // $('.ch-order-btn').on('click', () => show($orderPopup))

	  (0, _jquery2.default)('.tools-card').on('click', '.tools-card__wrap', function (event) {
	    var $t = (0, _jquery2.default)(this);
	    var toolId = $t.data('tool-id');

	    if (typeof _popupContent.TOOLS[toolId] !== 'undefined') {
	      setToolsContent(_popupContent.TOOLS[toolId]);
	      show($toolPopup);
	    }
	  });
	}

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TOOLS = exports.TOOLS = [{
	  img: __webpack_require__(5),
	  header: 'Делаем «под ключ»',
	  text: 'Исследуем пользовательские сценарии, пишем продающие тексты и&nbsp;собираем прототип, тестируем его, финализируем дизайн, верстаем, подключаем метрики и&nbsp;продвигаем сайт.',
	  buttonLabel: 'Делаем!'
	}, {
	  img: __webpack_require__(6),
	  header: 'Внедряем CRM',
	  text: 'Прежде, чем&nbsp;повышать показатели продаж, важно научиться их&nbsp;отслеживать. Не ограничиваемся подключением — рассказываем, как&nbsp;извлечь максимум выгоды.',
	  buttonLabel: 'Внедряем!'
	}, {
	  img: __webpack_require__(7),
	  header: 'Строим цепочки касаний',
	  text: 'Помогаем выстраивать и&nbsp;монетизировать долгосрочные отношения с&nbsp;вашими клиентами, используя лидмагнит, ретаргетинг, OTO, апсейл, кросс-сейл, даунсейл, апгрейд, бандл и&nbsp;другие техники.',
	  buttonLabel: 'Строим!'
	}, {
	  img: __webpack_require__(8),
	  header: 'Отсекаем лишнее',
	  text: 'Пишем убедительные продающие тексты, руководствуясь понятиями об&nbsp;инфостиле: без&nbsp;канцеляризмов, «воды» и&nbsp;шаблонных фраз, с&nbsp;безупречной грамматикой.',
	  buttonLabel: 'Отсекаем!'
	}, {
	  img: __webpack_require__(9),
	  header: 'Никакого формализма',
	  text: 'Общаемся без&nbsp;скриптов, не&nbsp;просим заполнять бессмысленные бумаги, знаем секрет продуктивного общения с&nbsp;заказчиком.',
	  buttonLabel: 'Никакого!'
	}, {
	  img: __webpack_require__(10),
	  header: 'Продвигаем в соцсетях',
	  text: 'Оформляем группы в&nbsp;любых соцсетях. Знаем, как&nbsp;привлекать живых подписчиков, а&nbsp;не&nbsp;ботов, и&nbsp;автоматизируем этот процесс.',
	  buttonLabel: 'Продвигаем!'
	}, {
	  img: __webpack_require__(11),
	  header: 'Работаем без шаблонов',
	  text: 'Не любим посредственные решения и&nbsp;типичные картинки с&nbsp;фотостоков. Умеем находить уникальные образы и&nbsp;эстетику в&nbsp;мелочах.',
	  buttonLabel: 'Работаем!'
	}, {
	  img: __webpack_require__(12),
	  header: 'Продвигаем в поиске',
	  text: 'Выводим сайт на&nbsp;первые позиции Яндекса и&nbsp;Гугла с&nbsp;помощью SEO и&nbsp;контекстной рекламы, максимизируя вашу прибыль.',
	  buttonLabel: 'Продвигаем!'
	}, {
	  img: __webpack_require__(13),
	  header: 'Снимаем производство',
	  text: 'Снимаем настоящие фото и&nbsp;видео вашего бизнеса, чтобы&nbsp;посетители сайта больше доверяли его содержимому и&nbsp;становились вашими клиентами.',
	  buttonLabel: 'Снимаем!'
	}, {
	  img: __webpack_require__(14),
	  header: 'Думаем обо всех',
	  text: 'Закладываем адаптацию сайта под&nbsp;посетителей с&nbsp;проблемами цветовосприятия и&nbsp;зрения на&nbsp;этапе проектирования и&nbsp;дизайна, увеличивая конверсию.',
	  buttonLabel: 'Думаем!'
	}, {
	  img: __webpack_require__(15),
	  header: 'Анимируем интерфейс',
	  text: 'Наполняем сайт приятными мелочами, отличающими продукт, сделанный с&nbsp;душой, от&nbsp;серой массы безликих конкурентов.',
	  buttonLabel: 'Анимируем!'
	}, {
	  img: __webpack_require__(16),
	  header: 'Адаптируем верстку',
	  text: 'Разрабатываем сайт под 99% разрешений: от&nbsp;бюджетного смартфона до&nbsp;огромного 5К-монитора, что&nbsp;неизбежно увеличивает конверсию.',
	  buttonLabel: 'Адаптируем!'
	}];

	var POLICY = exports.POLICY = {
	  header: 'Политика конфиденциальности',
	  text: ['Политика конфиденциальности распространяется на&nbsp;всех пользователей сайта.', 'Пользователь дает разрешение на&nbsp;обработку своих персональных данных, указывая их в&nbsp;заявке на&nbsp;заказ услуг.', 'Никакая информация об&nbsp;отдельном пользователе не&nbsp;разглашается, кроме случаев, предусмотренных законом Российской Федерации.']
	};

/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-1.svg";

/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-2.svg";

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-3.svg";

/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-4.svg";

/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-5.svg";

/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-6.svg";

/***/ },

/***/ 11:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-7.svg";

/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-8.svg";

/***/ },

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-9.svg";

/***/ },

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-10.svg";

/***/ },

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-11.svg";

/***/ },

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-12.svg";

/***/ },

/***/ 20:
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = debounce;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 21:
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide `options` to indicate whether `func`
	 * should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  if (isObject(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = throttle;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = initFormValidation;

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	__webpack_require__(23);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.jq = _jquery2.default;

	function initFormValidation() {
	  var $modal = (0, _jquery2.default)('.modal-popup--form');
	  var $form = $modal.find('form');
	  var $nameInput = $form.find('#inputName');
	  var $phoneInput = $form.find('#inputTel');
	  var $phoneError = $form.find('#inputTel-error');

	  $phoneInput.mask('+7 999 999-99-99');

	  $form.on('submit', function (event) {
	    event.preventDefault();
	    var phoneVal = $phoneInput.val().replace(/\D/g, '');

	    if (!/^7\d{10}$/.test(phoneVal)) {
	      $phoneInput.addClass('form__input--error');
	      if (phoneVal === '' || phoneVal === '7') {
	        $phoneError.text('Введите номер, чтобы продолжить');
	      } else {
	        $phoneError.text('Номер телефона слишком короткий');
	      }
	    } else {
	      // Submit form
	      _jquery2.default.post(
	      // TODO: change url
	      'http://gerasimovi.ch/email/send.php', $form.serialize()).always(function () {
	        // Clear form
	        $form.find('input').val('');
	        // Hide modal
	        $modal[0].$hide();
	        // TODO: Show success modal or smth
	      });
	    }
	  });

	  $phoneInput.on('keydown', function (event) {
	    if (/^\D$/.test(event.key)) event.preventDefault();
	  });

	  $form.on('input', 'input', function (event) {

	    (0, _jquery2.default)(event.target).removeClass('form__input--error');
	    var label = event.target.nextElementSibling;

	    if (event.target.value !== '') {
	      (0, _jquery2.default)(label).addClass('form__label--not-empty');
	    } else {
	      (0, _jquery2.default)(label).removeClass('form__label--not-empty');
	    }

	    if (event.target === $phoneInput[0]) {
	      $phoneError.text('\xA0');
	      if ($phoneInput[0].value.length < 3) {
	        $phoneInput[0].value = '+7 ';
	      }
	    }
	  });

	  $form.on('focus', 'input', function (event) {

	    if (event.target === $phoneInput[0]) {
	      if ($phoneInput[0].value === '') {
	        $phoneInput[0].value = '+7 ';
	      }
	    }
	    setTimeout(function () {
	      event.target.selectionStart = event.target.selectionEnd = 10000;
	    }, 0);
	  });

	  $form.on('blur', 'input', function (event) {

	    if (event.target === $phoneInput[0]) {
	      if ($phoneInput[0].value === '+7 ') {
	        $phoneInput[0].value = '';
	      }
	    }
	  });
	}

/***/ },

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = initWaves;

	var _nodeWaves = __webpack_require__(25);

	var _nodeWaves2 = _interopRequireDefault(_nodeWaves);

	var _lodash = __webpack_require__(21);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _lodash3 = __webpack_require__(20);

	var _lodash4 = _interopRequireDefault(_lodash3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MOBILE_BREAKPOINT = 700;
	// import 'node-waves/dist/waves.css' // import in index.styl

	function checkWindowWidth() {
	  return window.innerWidth < MOBILE_BREAKPOINT;
	}

	function initWaves() {
	  var WAVES_NODES = [['.tools-card__wrap', ['waves-block', 'waves-btn', 'waves-very-light']], ['.tools__btn-more', ['waves-block', 'waves-btn', 'waves-very-light']], ['.button-telegram', ['waves-btn']], ['.footer__btn-glass', ['waves-btn', 'waves-very-light']]];

	  var attached = false;

	  function attachRipple() {
	    if (attached) return;
	    if (true) console.log('--- attach');

	    attached = true;

	    WAVES_NODES.forEach(function (node) {
	      Array.from(document.querySelectorAll(node[0])).forEach(function (node) {
	        node.classList.remove('js-waves-disable');
	        node.classList.add('js-waves-enable');
	      });
	    });
	  }

	  function detachRipple() {
	    if (!attached) return;
	    if (true) console.log('--- detach');

	    attached = false;

	    WAVES_NODES.forEach(function (node) {
	      Array.from(document.querySelectorAll(node[0])).forEach(function (node) {
	        node.classList.remove('js-waves-enable');
	        node.classList.add('js-waves-disable');
	      });
	    });
	  }

	  function toggleRipple(event) {
	    checkWindowWidth() ? attachRipple() : detachRipple();
	  }

	  _nodeWaves2.default.attach('.button-primary', ['waves-btn']);

	  WAVES_NODES.forEach(function (node) {
	    _nodeWaves2.default.attach(node[0], node[1]);
	  });

	  toggleRipple({});
	  window.addEventListener('resize', toggleRipple);

	  _nodeWaves2.default.init({
	    delay: 1000
	  });
	}

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {

	  var HREF =  true ? 'http://gerasimovi.ch/in-progress' + location.pathname + '/' : location.origin + location.pathname;

	  var callback = ('_' + Math.random()).replace('.', '');

	  var params = {
	    vk: 'https://vk.com/share.php?act=count&index=1&url=' + HREF,
	    fb: 'https://graph.facebook.com/?id=' + HREF + '&callback=' + callback + '&access_token=218749735198206|OWf3Lkmm_NhZNAu7Lav2CghayqM'
	  };

	  var $vkElem = (0, _jquery2.default)('.social__item-counter--vk');
	  var $googleElem = (0, _jquery2.default)('.social__item-counter--google');
	  var $fbElem = (0, _jquery2.default)('.social__item-counter--fb');
	  var socialItem = (0, _jquery2.default)('.social__item-share');

	  function vk() {
	    window.VK = { Share: {} };
	    window.VK.Share.count = function (ix, share) {
	      $vkElem.html(share);
	    };
	  }

	  function facebook(res) {
	    res.share && $fbElem.html(res.share.share_count);
	  }

	  function googlePlus(res) {
	    $googleElem.html(res.result.metadata.globalCounts.count);
	  }

	  socialItem.on('click', function (e) {
	    e.preventDefault();

	    return window.open(e.currentTarget.href, '', 'width=560,height=500,location=no,toolbar=no,menubar=no');
	  });

	  _jquery2.default.ajax({ url: params.vk, type: 'GET', dataType: 'jsonp' });
	  _jquery2.default.ajax({ url: params.fb, type: 'GET', dataType: 'jsonp', success: facebook });
	  _jquery2.default.ajax({
	    url: 'https://clients6.google.com/rpc', type: 'POST', contentType: 'application/json',
	    data: JSON.stringify({
	      method: 'pos.plusones.get',
	      id: HREF,
	      params: { nolog: true, id: HREF, source: 'widget', userId: '@viewer', groupId: '@self' },
	      jsonrpc: '2.0',
	      key: 'p',
	      apiVersion: 'v1'
	    }),
	    success: googlePlus
	  });

	  vk();
	};

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },

/***/ 62:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 80:
/***/ function(module, exports) {

	/**
	 * Load svg via ajax
	 * @param  {string} url path to svg sprite
	 * @generator: webpack-svgstore-plugin
	 * @see: https://www.npmjs.com/package/webpack-svgstore-plugin
	 * @return {[type]}     [description]
	 */
	var svgXHR = function(options) {
	  var url = false;
	  var baseUrl = undefined;

	  options && options.filename
	    ? url = options.filename
	    : null;

	  if (!url) return false;
	  var _ajax = new XMLHttpRequest();
	  var _fullPath;

	  if (typeof XDomainRequest !== 'undefined') {
	    _ajax = new XDomainRequest();
	  }

	  if (typeof baseUrl === 'undefined') {
	    if (typeof window.baseUrl !== 'undefined') {
	      baseUrl = window.baseUrl;
	    } else {
	      baseUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
	    }
	  }

	  _fullPath = (baseUrl + '/' + url).replace(/([^:]\/)\/+/g, '$1');
	  _ajax.open('GET', _fullPath, true);
	  _ajax.onprogress = function() {};
	  _ajax.onload = function() {
	    if(!_ajax.responseText || _ajax.responseText.substr(0, 4) !== "<svg") {
	      throw Error("Invalid SVG Response");
	    }
	    if(_ajax.status < 200 || _ajax.status >= 300) {
	      return;
	    }
	    var div = document.createElement('div');
	    div.innerHTML = _ajax.responseText;
	    document.body.insertBefore(div, document.body.childNodes[0]);
	  };
	  _ajax.send();
	};

	module.exports = svgXHR;


/***/ }

});
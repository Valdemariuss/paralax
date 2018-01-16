webpackJsonp([3,5],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _iphoneInlineVideo = __webpack_require__(92);

	var _iphoneInlineVideo2 = _interopRequireDefault(_iphoneInlineVideo);

	var _portfolioSlider = __webpack_require__(95);

	var _portfolioSlider2 = _interopRequireDefault(_portfolioSlider);

	var _googleMaps = __webpack_require__(97);

	var _googleMaps2 = _interopRequireDefault(_googleMaps);

	var _headerNav = __webpack_require__(100);

	var _headerNav2 = _interopRequireDefault(_headerNav);

	var _popups = __webpack_require__(3);

	var _popups2 = _interopRequireDefault(_popups);

	var _mobileHeader = __webpack_require__(101);

	var _mobileHeader2 = _interopRequireDefault(_mobileHeader);

	var _clientsSlider = __webpack_require__(102);

	var _clientsSlider2 = _interopRequireDefault(_clientsSlider);

	var _buttonWaves = __webpack_require__(24);

	var _buttonWaves2 = _interopRequireDefault(_buttonWaves);

	var _formValidation = __webpack_require__(22);

	var _formValidation2 = _interopRequireDefault(_formValidation);

	var _preloader = __webpack_require__(115);

	var _preloader2 = _interopRequireDefault(_preloader);

	__webpack_require__(116);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (true) {
	  window.console.clear();
	}
	// import 'slick-carousel/slick/slick'


	exports.default = (0, _jquery2.default)(function () {
	  // Disable drag events
	  (0, _jquery2.default)(document).find('a, img').on('drag dragend dragenter dragexit dragleave dragover dragstart drop', false);

	  (0, _portfolioSlider2.default)();
	  (0, _googleMaps2.default)();
	  (0, _headerNav2.default)();
	  (0, _clientsSlider2.default)();
	  (0, _buttonWaves2.default)();

	  (0, _popups2.default)();
	  (0, _mobileHeader2.default)();

	  (0, _formValidation2.default)();

	  // show all tool-cards
	  (0, _jquery2.default)('#jsToolsBtnMore').click(function () {
	    (0, _jquery2.default)('#jsToolsCard').addClass('tools-card--show');
	    (0, _jquery2.default)(this).addClass('tools__btn-more--hide');
	  });

	  // sticky develop header - start
	  function headerStickyShow() {
	    var menuWrap = (0, _jquery2.default)('#jsHeaderSticky');
	    var menu = (0, _jquery2.default)('#jsHeaderStickyMenu');
	    var menuHeight = menu.outerHeight();

	    if ((0, _jquery2.default)(window).scrollTop() > menuWrap.offset().top) {
	      menuWrap.addClass('header-sticky--fixed').css({
	        "height": menuHeight
	      });
	    } else {
	      menuWrap.removeClass('header-sticky--fixed').css({
	        "height": ''
	      });
	    }
	  }

	  (0, _jquery2.default)(window).scroll(function () {
	    headerStickyShow();
	  });

	  (0, _jquery2.default)(window).ready(function () {
	    headerStickyShow();
	    (0, _preloader2.default)();
	  });
	  // sticky develop header - end
	});

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-1.svg";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-2.svg";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-3.svg";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-4.svg";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-5.svg";

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-6.svg";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-7.svg";

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-8.svg";

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-9.svg";

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-10.svg";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-11.svg";

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/tool-12.svg";

/***/ },
/* 17 */,
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _iscrollLite = __webpack_require__(19);

	var _iscrollLite2 = _interopRequireDefault(_iscrollLite);

	var _lodash = __webpack_require__(20);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _lodash3 = __webpack_require__(21);

	var _lodash4 = _interopRequireDefault(_lodash3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Scroller = function () {
	  function Scroller(selector) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, Scroller);

	    this.$node = $(selector);
	    this.$wrapper = this.$node.children().first();
	    this.$children = this.$wrapper.children();

	    this.resizeWrapper = this.resizeWrapper.bind(this);
	    this.handleMouseDown = this.handleMouseDown.bind(this);
	    this.handleMouseUp = this.handleMouseUp.bind(this);
	    // this.handleMouseWheel = throttle(this.handleMouseWheel.bind(this), 1000 / 60)

	    var startX = 0;
	    var width = this.resizeWrapper();

	    this.$node.addClass('js-iscroll');

	    if (options.startAtCenter) {
	      startX = (window.innerWidth - width) / 2;
	    }

	    this.iscroll = new _iscrollLite2.default(this.$node[0], Object.assign(options, { startX: startX }));

	    $(window).on('resize', this.resizeWrapper);

	    this.$node.on('mousedown', this.handleMouseDown);
	    // this.$node.on('mouseup', this.handleMouseUp)
	    // this.$node.on('mousewheel', this.handleMouseWheel)
	    // this.$node.on('mousewheel', false)
	  }

	  _createClass(Scroller, [{
	    key: 'handleMouseDown',
	    value: function handleMouseDown() {
	      this.$node.addClass('js-iscroll--grabbing');
	      $(window).on('mouseup', this.handleMouseUp);
	    }
	  }, {
	    key: 'handleMouseUp',
	    value: function handleMouseUp() {
	      this.$node.removeClass('js-iscroll--grabbing');
	      $(window).off('mouseup', this.handleMouseUp);
	    }

	    // handleMouseWheel(event) {const {deltaX, deltaY} = event.originalEvent
	    //   const absX = Math.abs(deltaX)
	    //   const absY = Math.abs(deltaY)
	    //
	    //   if (absX < 3) return
	    //   if (absX / 3 < absY) return
	    //
	    //   const nextPosition = Math.max(Math.min(this.iscroll.x - deltaX, 0), this.iscroll.maxScrollX)
	    //   this.iscroll.scrollTo(nextPosition, 0)
	    //
	    //   return false
	    // }

	  }, {
	    key: 'getChildrenWidth',
	    value: function getChildrenWidth() {
	      var initial = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	      return Array.from(this.$children).reduce(function (width, el) {
	        return width + $(el).outerWidth(true);
	      }, initial);
	    }
	  }, {
	    key: 'resizeWrapper',
	    value: function resizeWrapper() {
	      var childrenWidth = this.getChildrenWidth();
	      this.$wrapper.css({ width: childrenWidth });
	      return childrenWidth;
	    }
	  }]);

	  return Scroller;
	}();

	exports.default = Scroller;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 19 */
/***/ function(module, exports) {

	/*! iScroll v5.1.1 ~ (c) 2008-2014 Matteo Spinelli ~ http://cubiq.org/license */
	(function (window, document, Math) {
	var rAF = window.requestAnimationFrame	||
		window.webkitRequestAnimationFrame	||
		window.mozRequestAnimationFrame		||
		window.oRequestAnimationFrame		||
		window.msRequestAnimationFrame		||
		function (callback) { window.setTimeout(callback, 1000 / 60); };

	var utils = (function () {
		var me = {};

		var _elementStyle = document.createElement('div').style;
		var _vendor = (function () {
			var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
				transform,
				i = 0,
				l = vendors.length;

			for ( ; i < l; i++ ) {
				transform = vendors[i] + 'ransform';
				if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
			}

			return false;
		})();

		function _prefixStyle (style) {
			if ( _vendor === false ) return false;
			if ( _vendor === '' ) return style;
			return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
		}

		me.getTime = Date.now || function getTime () { return new Date().getTime(); };

		me.extend = function (target, obj) {
			for ( var i in obj ) {
				target[i] = obj[i];
			}
		};

		me.addEvent = function (el, type, fn, capture) {
			el.addEventListener(type, fn, !!capture);
		};

		me.removeEvent = function (el, type, fn, capture) {
			el.removeEventListener(type, fn, !!capture);
		};

		me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
			var distance = current - start,
				speed = Math.abs(distance) / time,
				destination,
				duration;

			deceleration = deceleration === undefined ? 0.0006 : deceleration;

			destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
			duration = speed / deceleration;

			if ( destination < lowerMargin ) {
				destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
				distance = Math.abs(destination - current);
				duration = distance / speed;
			} else if ( destination > 0 ) {
				destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
				distance = Math.abs(current) + destination;
				duration = distance / speed;
			}

			return {
				destination: Math.round(destination),
				duration: duration
			};
		};

		var _transform = _prefixStyle('transform');

		me.extend(me, {
			hasTransform: _transform !== false,
			hasPerspective: _prefixStyle('perspective') in _elementStyle,
			hasTouch: 'ontouchstart' in window,
			hasPointer: navigator.msPointerEnabled,
			hasTransition: _prefixStyle('transition') in _elementStyle
		});

		// This should find all Android browsers lower than build 535.19 (both stock browser and webview)
		me.isBadAndroid = /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion));

		me.extend(me.style = {}, {
			transform: _transform,
			transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
			transitionDuration: _prefixStyle('transitionDuration'),
			transitionDelay: _prefixStyle('transitionDelay'),
			transformOrigin: _prefixStyle('transformOrigin')
		});

		me.hasClass = function (e, c) {
			var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
			return re.test(e.className);
		};

		me.addClass = function (e, c) {
			if ( me.hasClass(e, c) ) {
				return;
			}

			var newclass = e.className.split(' ');
			newclass.push(c);
			e.className = newclass.join(' ');
		};

		me.removeClass = function (e, c) {
			if ( !me.hasClass(e, c) ) {
				return;
			}

			var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
			e.className = e.className.replace(re, ' ');
		};

		me.offset = function (el) {
			var left = -el.offsetLeft,
				top = -el.offsetTop;

			// jshint -W084
			while (el = el.offsetParent) {
				left -= el.offsetLeft;
				top -= el.offsetTop;
			}
			// jshint +W084

			return {
				left: left,
				top: top
			};
		};

		me.preventDefaultException = function (el, exceptions) {
			for ( var i in exceptions ) {
				if ( exceptions[i].test(el[i]) ) {
					return true;
				}
			}

			return false;
		};

		me.extend(me.eventType = {}, {
			touchstart: 1,
			touchmove: 1,
			touchend: 1,

			mousedown: 2,
			mousemove: 2,
			mouseup: 2,

			MSPointerDown: 3,
			MSPointerMove: 3,
			MSPointerUp: 3
		});

		me.extend(me.ease = {}, {
			quadratic: {
				style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				fn: function (k) {
					return k * ( 2 - k );
				}
			},
			circular: {
				style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',	// Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
				fn: function (k) {
					return Math.sqrt( 1 - ( --k * k ) );
				}
			},
			back: {
				style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				fn: function (k) {
					var b = 4;
					return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
				}
			},
			bounce: {
				style: '',
				fn: function (k) {
					if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
						return 7.5625 * k * k;
					} else if ( k < ( 2 / 2.75 ) ) {
						return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
					} else if ( k < ( 2.5 / 2.75 ) ) {
						return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
					} else {
						return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
					}
				}
			},
			elastic: {
				style: '',
				fn: function (k) {
					var f = 0.22,
						e = 0.4;

					if ( k === 0 ) { return 0; }
					if ( k == 1 ) { return 1; }

					return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
				}
			}
		});

		me.tap = function (e, eventName) {
			var ev = document.createEvent('Event');
			ev.initEvent(eventName, true, true);
			ev.pageX = e.pageX;
			ev.pageY = e.pageY;
			e.target.dispatchEvent(ev);
		};

		me.click = function (e) {
			var target = e.target,
				ev;

			if ( !(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName) ) {
				ev = document.createEvent('MouseEvents');
				ev.initMouseEvent('click', true, true, e.view, 1,
					target.screenX, target.screenY, target.clientX, target.clientY,
					e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
					0, null);

				ev._constructed = true;
				target.dispatchEvent(ev);
			}
		};

		return me;
	})();

	function IScroll (el, options) {
		this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
		this.scroller = this.wrapper.children[0];
		this.scrollerStyle = this.scroller.style;		// cache style for better performance

		this.options = {

	// INSERT POINT: OPTIONS 

			startX: 0,
			startY: 0,
			scrollY: true,
			directionLockThreshold: 5,
			momentum: true,

			bounce: true,
			bounceTime: 600,
			bounceEasing: '',

			preventDefault: true,
			preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

			HWCompositing: true,
			useTransition: true,
			useTransform: true
		};

		for ( var i in options ) {
			this.options[i] = options[i];
		}

		// Normalize options
		this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

		this.options.useTransition = utils.hasTransition && this.options.useTransition;
		this.options.useTransform = utils.hasTransform && this.options.useTransform;

		this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
		this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

		// If you want eventPassthrough I have to lock one of the axes
		this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
		this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

		// With eventPassthrough we also need lockDirection mechanism
		this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
		this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

		this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

		this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

		if ( this.options.tap === true ) {
			this.options.tap = 'tap';
		}

	// INSERT POINT: NORMALIZATION

		// Some defaults	
		this.x = 0;
		this.y = 0;
		this.directionX = 0;
		this.directionY = 0;
		this._events = {};

	// INSERT POINT: DEFAULTS

		this._init();
		this.refresh();

		this.scrollTo(this.options.startX, this.options.startY);
		this.enable();
	}

	IScroll.prototype = {
		version: '5.1.1',

		_init: function () {
			this._initEvents();

	// INSERT POINT: _init

		},

		destroy: function () {
			this._initEvents(true);

			this._execEvent('destroy');
		},

		_transitionEnd: function (e) {
			if ( e.target != this.scroller || !this.isInTransition ) {
				return;
			}

			this._transitionTime();
			if ( !this.resetPosition(this.options.bounceTime) ) {
				this.isInTransition = false;
				this._execEvent('scrollEnd');
			}
		},

		_start: function (e) {
			// React to left mouse button only
			if ( utils.eventType[e.type] != 1 ) {
				if ( e.button !== 0 ) {
					return;
				}
			}

			if ( !this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated) ) {
				return;
			}

			if ( this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
				e.preventDefault();
			}

			var point = e.touches ? e.touches[0] : e,
				pos;

			this.initiated	= utils.eventType[e.type];
			this.moved		= false;
			this.distX		= 0;
			this.distY		= 0;
			this.directionX = 0;
			this.directionY = 0;
			this.directionLocked = 0;

			this._transitionTime();

			this.startTime = utils.getTime();

			if ( this.options.useTransition && this.isInTransition ) {
				this.isInTransition = false;
				pos = this.getComputedPosition();
				this._translate(Math.round(pos.x), Math.round(pos.y));
				this._execEvent('scrollEnd');
			} else if ( !this.options.useTransition && this.isAnimating ) {
				this.isAnimating = false;
				this._execEvent('scrollEnd');
			}

			this.startX    = this.x;
			this.startY    = this.y;
			this.absStartX = this.x;
			this.absStartY = this.y;
			this.pointX    = point.pageX;
			this.pointY    = point.pageY;

			this._execEvent('beforeScrollStart');
		},

		_move: function (e) {
			if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
				return;
			}

			if ( this.options.preventDefault ) {	// increases performance on Android? TODO: check!
				e.preventDefault();
			}

			var point		= e.touches ? e.touches[0] : e,
				deltaX		= point.pageX - this.pointX,
				deltaY		= point.pageY - this.pointY,
				timestamp	= utils.getTime(),
				newX, newY,
				absDistX, absDistY;

			this.pointX		= point.pageX;
			this.pointY		= point.pageY;

			this.distX		+= deltaX;
			this.distY		+= deltaY;
			absDistX		= Math.abs(this.distX);
			absDistY		= Math.abs(this.distY);

			// We need to move at least 10 pixels for the scrolling to initiate
			if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
				return;
			}

			// If you are scrolling in one direction lock the other
			if ( !this.directionLocked && !this.options.freeScroll ) {
				if ( absDistX > absDistY + this.options.directionLockThreshold ) {
					this.directionLocked = 'h';		// lock horizontally
				} else if ( absDistY >= absDistX + this.options.directionLockThreshold ) {
					this.directionLocked = 'v';		// lock vertically
				} else {
					this.directionLocked = 'n';		// no lock
				}
			}

			if ( this.directionLocked == 'h' ) {
				if ( this.options.eventPassthrough == 'vertical' ) {
					e.preventDefault();
				} else if ( this.options.eventPassthrough == 'horizontal' ) {
					this.initiated = false;
					return;
				}

				deltaY = 0;
			} else if ( this.directionLocked == 'v' ) {
				if ( this.options.eventPassthrough == 'horizontal' ) {
					e.preventDefault();
				} else if ( this.options.eventPassthrough == 'vertical' ) {
					this.initiated = false;
					return;
				}

				deltaX = 0;
			}

			deltaX = this.hasHorizontalScroll ? deltaX : 0;
			deltaY = this.hasVerticalScroll ? deltaY : 0;

			newX = this.x + deltaX;
			newY = this.y + deltaY;

			// Slow down if outside of the boundaries
			if ( newX > 0 || newX < this.maxScrollX ) {
				newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
			}
			if ( newY > 0 || newY < this.maxScrollY ) {
				newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
			}

			this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
			this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

			if ( !this.moved ) {
				this._execEvent('scrollStart');
			}

			this.moved = true;

			this._translate(newX, newY);

	/* REPLACE START: _move */

			if ( timestamp - this.startTime > 300 ) {
				this.startTime = timestamp;
				this.startX = this.x;
				this.startY = this.y;
			}

	/* REPLACE END: _move */

		},

		_end: function (e) {
			if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
				return;
			}

			if ( this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
				e.preventDefault();
			}

			var point = e.changedTouches ? e.changedTouches[0] : e,
				momentumX,
				momentumY,
				duration = utils.getTime() - this.startTime,
				newX = Math.round(this.x),
				newY = Math.round(this.y),
				distanceX = Math.abs(newX - this.startX),
				distanceY = Math.abs(newY - this.startY),
				time = 0,
				easing = '';

			this.isInTransition = 0;
			this.initiated = 0;
			this.endTime = utils.getTime();

			// reset if we are outside of the boundaries
			if ( this.resetPosition(this.options.bounceTime) ) {
				return;
			}

			this.scrollTo(newX, newY);	// ensures that the last position is rounded

			// we scrolled less than 10 pixels
			if ( !this.moved ) {
				if ( this.options.tap ) {
					utils.tap(e, this.options.tap);
				}

				if ( this.options.click ) {
					utils.click(e);
				}

				this._execEvent('scrollCancel');
				return;
			}

			if ( this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100 ) {
				this._execEvent('flick');
				return;
			}

			// start momentum animation if needed
			if ( this.options.momentum && duration < 300 ) {
				momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
				momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
				newX = momentumX.destination;
				newY = momentumY.destination;
				time = Math.max(momentumX.duration, momentumY.duration);
				this.isInTransition = 1;
			}

	// INSERT POINT: _end

			if ( newX != this.x || newY != this.y ) {
				// change easing function when scroller goes out of the boundaries
				if ( newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY ) {
					easing = utils.ease.quadratic;
				}

				this.scrollTo(newX, newY, time, easing);
				return;
			}

			this._execEvent('scrollEnd');
		},

		_resize: function () {
			var that = this;

			clearTimeout(this.resizeTimeout);

			this.resizeTimeout = setTimeout(function () {
				that.refresh();
			}, this.options.resizePolling);
		},

		resetPosition: function (time) {
			var x = this.x,
				y = this.y;

			time = time || 0;

			if ( !this.hasHorizontalScroll || this.x > 0 ) {
				x = 0;
			} else if ( this.x < this.maxScrollX ) {
				x = this.maxScrollX;
			}

			if ( !this.hasVerticalScroll || this.y > 0 ) {
				y = 0;
			} else if ( this.y < this.maxScrollY ) {
				y = this.maxScrollY;
			}

			if ( x == this.x && y == this.y ) {
				return false;
			}

			this.scrollTo(x, y, time, this.options.bounceEasing);

			return true;
		},

		disable: function () {
			this.enabled = false;
		},

		enable: function () {
			this.enabled = true;
		},

		refresh: function () {
			var rf = this.wrapper.offsetHeight;		// Force reflow

			this.wrapperWidth	= this.wrapper.clientWidth;
			this.wrapperHeight	= this.wrapper.clientHeight;

	/* REPLACE START: refresh */

			this.scrollerWidth	= this.scroller.offsetWidth;
			this.scrollerHeight	= this.scroller.offsetHeight;

			this.maxScrollX		= this.wrapperWidth - this.scrollerWidth;
			this.maxScrollY		= this.wrapperHeight - this.scrollerHeight;

	/* REPLACE END: refresh */

			this.hasHorizontalScroll	= this.options.scrollX && this.maxScrollX < 0;
			this.hasVerticalScroll		= this.options.scrollY && this.maxScrollY < 0;

			if ( !this.hasHorizontalScroll ) {
				this.maxScrollX = 0;
				this.scrollerWidth = this.wrapperWidth;
			}

			if ( !this.hasVerticalScroll ) {
				this.maxScrollY = 0;
				this.scrollerHeight = this.wrapperHeight;
			}

			this.endTime = 0;
			this.directionX = 0;
			this.directionY = 0;

			this.wrapperOffset = utils.offset(this.wrapper);

			this._execEvent('refresh');

			this.resetPosition();

	// INSERT POINT: _refresh

		},

		on: function (type, fn) {
			if ( !this._events[type] ) {
				this._events[type] = [];
			}

			this._events[type].push(fn);
		},

		off: function (type, fn) {
			if ( !this._events[type] ) {
				return;
			}

			var index = this._events[type].indexOf(fn);

			if ( index > -1 ) {
				this._events[type].splice(index, 1);
			}
		},

		_execEvent: function (type) {
			if ( !this._events[type] ) {
				return;
			}

			var i = 0,
				l = this._events[type].length;

			if ( !l ) {
				return;
			}

			for ( ; i < l; i++ ) {
				this._events[type][i].apply(this, [].slice.call(arguments, 1));
			}
		},

		scrollBy: function (x, y, time, easing) {
			x = this.x + x;
			y = this.y + y;
			time = time || 0;

			this.scrollTo(x, y, time, easing);
		},

		scrollTo: function (x, y, time, easing) {
			easing = easing || utils.ease.circular;

			this.isInTransition = this.options.useTransition && time > 0;

			if ( !time || (this.options.useTransition && easing.style) ) {
				this._transitionTimingFunction(easing.style);
				this._transitionTime(time);
				this._translate(x, y);
			} else {
				this._animate(x, y, time, easing.fn);
			}
		},

		scrollToElement: function (el, time, offsetX, offsetY, easing) {
			el = el.nodeType ? el : this.scroller.querySelector(el);

			if ( !el ) {
				return;
			}

			var pos = utils.offset(el);

			pos.left -= this.wrapperOffset.left;
			pos.top  -= this.wrapperOffset.top;

			// if offsetX/Y are true we center the element to the screen
			if ( offsetX === true ) {
				offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
			}
			if ( offsetY === true ) {
				offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
			}

			pos.left -= offsetX || 0;
			pos.top  -= offsetY || 0;

			pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
			pos.top  = pos.top  > 0 ? 0 : pos.top  < this.maxScrollY ? this.maxScrollY : pos.top;

			time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x-pos.left), Math.abs(this.y-pos.top)) : time;

			this.scrollTo(pos.left, pos.top, time, easing);
		},

		_transitionTime: function (time) {
			time = time || 0;

			this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';

			if ( !time && utils.isBadAndroid ) {
				this.scrollerStyle[utils.style.transitionDuration] = '0.001s';
			}

	// INSERT POINT: _transitionTime

		},

		_transitionTimingFunction: function (easing) {
			this.scrollerStyle[utils.style.transitionTimingFunction] = easing;

	// INSERT POINT: _transitionTimingFunction

		},

		_translate: function (x, y) {
			if ( this.options.useTransform ) {

	/* REPLACE START: _translate */

				this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

	/* REPLACE END: _translate */

			} else {
				x = Math.round(x);
				y = Math.round(y);
				this.scrollerStyle.left = x + 'px';
				this.scrollerStyle.top = y + 'px';
			}

			this.x = x;
			this.y = y;

	// INSERT POINT: _translate

		},

		_initEvents: function (remove) {
			var eventType = remove ? utils.removeEvent : utils.addEvent,
				target = this.options.bindToWrapper ? this.wrapper : window;

			eventType(window, 'orientationchange', this);
			eventType(window, 'resize', this);

			if ( this.options.click ) {
				eventType(this.wrapper, 'click', this, true);
			}

			if ( !this.options.disableMouse ) {
				eventType(this.wrapper, 'mousedown', this);
				eventType(target, 'mousemove', this);
				eventType(target, 'mousecancel', this);
				eventType(target, 'mouseup', this);
			}

			if ( utils.hasPointer && !this.options.disablePointer ) {
				eventType(this.wrapper, 'MSPointerDown', this);
				eventType(target, 'MSPointerMove', this);
				eventType(target, 'MSPointerCancel', this);
				eventType(target, 'MSPointerUp', this);
			}

			if ( utils.hasTouch && !this.options.disableTouch ) {
				eventType(this.wrapper, 'touchstart', this);
				eventType(target, 'touchmove', this);
				eventType(target, 'touchcancel', this);
				eventType(target, 'touchend', this);
			}

			eventType(this.scroller, 'transitionend', this);
			eventType(this.scroller, 'webkitTransitionEnd', this);
			eventType(this.scroller, 'oTransitionEnd', this);
			eventType(this.scroller, 'MSTransitionEnd', this);
		},

		getComputedPosition: function () {
			var matrix = window.getComputedStyle(this.scroller, null),
				x, y;

			if ( this.options.useTransform ) {
				matrix = matrix[utils.style.transform].split(')')[0].split(', ');
				x = +(matrix[12] || matrix[4]);
				y = +(matrix[13] || matrix[5]);
			} else {
				x = +matrix.left.replace(/[^-\d.]/g, '');
				y = +matrix.top.replace(/[^-\d.]/g, '');
			}

			return { x: x, y: y };
		},

		_animate: function (destX, destY, duration, easingFn) {
			var that = this,
				startX = this.x,
				startY = this.y,
				startTime = utils.getTime(),
				destTime = startTime + duration;

			function step () {
				var now = utils.getTime(),
					newX, newY,
					easing;

				if ( now >= destTime ) {
					that.isAnimating = false;
					that._translate(destX, destY);

					if ( !that.resetPosition(that.options.bounceTime) ) {
						that._execEvent('scrollEnd');
					}

					return;
				}

				now = ( now - startTime ) / duration;
				easing = easingFn(now);
				newX = ( destX - startX ) * easing + startX;
				newY = ( destY - startY ) * easing + startY;
				that._translate(newX, newY);

				if ( that.isAnimating ) {
					rAF(step);
				}
			}

			this.isAnimating = true;
			step();
		},
		handleEvent: function (e) {
			switch ( e.type ) {
				case 'touchstart':
				case 'MSPointerDown':
				case 'mousedown':
					this._start(e);
					break;
				case 'touchmove':
				case 'MSPointerMove':
				case 'mousemove':
					this._move(e);
					break;
				case 'touchend':
				case 'MSPointerUp':
				case 'mouseup':
				case 'touchcancel':
				case 'MSPointerCancel':
				case 'mousecancel':
					this._end(e);
					break;
				case 'orientationchange':
				case 'resize':
					this._resize();
					break;
				case 'transitionend':
				case 'webkitTransitionEnd':
				case 'oTransitionEnd':
				case 'MSTransitionEnd':
					this._transitionEnd(e);
					break;
				case 'wheel':
				case 'DOMMouseScroll':
				case 'mousewheel':
					this._wheel(e);
					break;
				case 'keydown':
					this._key(e);
					break;
				case 'click':
					if ( !e._constructed ) {
						e.preventDefault();
						e.stopPropagation();
					}
					break;
			}
		}
	};
	IScroll.utils = utils;

	if ( typeof module != 'undefined' && module.exports ) {
		module.exports = IScroll;
	} else {
		window.IScroll = IScroll;
	}

	})(window, document, Math);

/***/ },
/* 20 */
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
/* 21 */
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
/* 22 */
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
/* 23 */,
/* 24 */
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
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/*! npm.im/iphone-inline-video */
	'use strict';

	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

	var Symbol = _interopDefault(__webpack_require__(93));
	var intervalometer = __webpack_require__(94);

	function preventEvent(element, eventName, toggleProperty, preventWithProperty) {
		function handler(e) {
			if (Boolean(element[toggleProperty]) === Boolean(preventWithProperty)) {
				e.stopImmediatePropagation();
				// console.log(eventName, 'prevented on', element);
			}
			delete element[toggleProperty];
		}
		element.addEventListener(eventName, handler, false);

		// Return handler to allow to disable the prevention. Usage:
		// const preventionHandler = preventEvent(el, 'click');
		// el.removeEventHandler('click', preventionHandler);
		return handler;
	}

	function proxyProperty(object, propertyName, sourceObject, copyFirst) {
		function get() {
			return sourceObject[propertyName];
		}
		function set(value) {
			sourceObject[propertyName] = value;
		}

		if (copyFirst) {
			set(object[propertyName]);
		}

		Object.defineProperty(object, propertyName, {get: get, set: set});
	}

	function proxyEvent(object, eventName, sourceObject) {
		sourceObject.addEventListener(eventName, function () { return object.dispatchEvent(new Event(eventName)); });
	}

	function dispatchEventAsync(element, type) {
		Promise.resolve().then(function () {
			element.dispatchEvent(new Event(type));
		});
	}

	// iOS 10 adds support for native inline playback + silent autoplay
	var isWhitelisted = 'object-fit' in document.head.style && /iPhone|iPod/i.test(navigator.userAgent) && !matchMedia('(-webkit-video-playable-inline)').matches;

	var ಠ = Symbol();
	var ಠevent = Symbol();
	var ಠplay = Symbol('nativeplay');
	var ಠpause = Symbol('nativepause');

	/**
	 * UTILS
	 */

	function getAudioFromVideo(video) {
		var audio = new Audio();
		proxyEvent(video, 'play', audio);
		proxyEvent(video, 'playing', audio);
		proxyEvent(video, 'pause', audio);
		audio.crossOrigin = video.crossOrigin;

		// 'data:' causes audio.networkState > 0
		// which then allows to keep <audio> in a resumable playing state
		// i.e. once you set a real src it will keep playing if it was if .play() was called
		audio.src = video.src || video.currentSrc || 'data:';

		// if (audio.src === 'data:') {
		//   TODO: wait for video to be selected
		// }
		return audio;
	}

	var lastRequests = [];
	var requestIndex = 0;
	var lastTimeupdateEvent;

	function setTime(video, time, rememberOnly) {
		// allow one timeupdate event every 200+ ms
		if ((lastTimeupdateEvent || 0) + 200 < Date.now()) {
			video[ಠevent] = true;
			lastTimeupdateEvent = Date.now();
		}
		if (!rememberOnly) {
			video.currentTime = time;
		}
		lastRequests[++requestIndex % 3] = time * 100 | 0 / 100;
	}

	function isPlayerEnded(player) {
		return player.driver.currentTime >= player.video.duration;
	}

	function update(timeDiff) {
		var player = this;
		// console.log('update', player.video.readyState, player.video.networkState, player.driver.readyState, player.driver.networkState, player.driver.paused);
		if (player.video.readyState >= player.video.HAVE_FUTURE_DATA) {
			if (!player.hasAudio) {
				player.driver.currentTime = player.video.currentTime + ((timeDiff * player.video.playbackRate) / 1000);
				if (player.video.loop && isPlayerEnded(player)) {
					player.driver.currentTime = 0;
				}
			}
			setTime(player.video, player.driver.currentTime);
		} else if (player.video.networkState === player.video.NETWORK_IDLE && !player.video.buffered.length) {
			// this should happen when the source is available but:
			// - it's potentially playing (.paused === false)
			// - it's not ready to play
			// - it's not loading
			// If it hasAudio, that will be loaded in the 'emptied' handler below
			player.video.load();
			// console.log('Will load');
		}

		// console.assert(player.video.currentTime === player.driver.currentTime, 'Video not updating!');

		if (player.video.ended) {
			delete player.video[ಠevent]; // allow timeupdate event
			player.video.pause(true);
		}
	}

	/**
	 * METHODS
	 */

	function play() {
		// console.log('play');
		var video = this;
		var player = video[ಠ];

		// if it's fullscreen, use the native player
		if (video.webkitDisplayingFullscreen) {
			video[ಠplay]();
			return;
		}

		if (player.driver.src !== 'data:' && player.driver.src !== video.src) {
			// console.log('src changed on play', video.src);
			setTime(video, 0, true);
			player.driver.src = video.src;
		}

		if (!video.paused) {
			return;
		}
		player.paused = false;

		if (!video.buffered.length) {
			// .load() causes the emptied event
			// the alternative is .play()+.pause() but that triggers play/pause events, even worse
			// possibly the alternative is preventing this event only once
			video.load();
		}

		player.driver.play();
		player.updater.start();

		if (!player.hasAudio) {
			dispatchEventAsync(video, 'play');
			if (player.video.readyState >= player.video.HAVE_ENOUGH_DATA) {
				// console.log('onplay');
				dispatchEventAsync(video, 'playing');
			}
		}
	}
	function pause(forceEvents) {
		// console.log('pause');
		var video = this;
		var player = video[ಠ];

		player.driver.pause();
		player.updater.stop();

		// if it's fullscreen, the developer the native player.pause()
		// This is at the end of pause() because it also
		// needs to make sure that the simulation is paused
		if (video.webkitDisplayingFullscreen) {
			video[ಠpause]();
		}

		if (player.paused && !forceEvents) {
			return;
		}

		player.paused = true;
		if (!player.hasAudio) {
			dispatchEventAsync(video, 'pause');
		}
		if (video.ended) {
			video[ಠevent] = true;
			dispatchEventAsync(video, 'ended');
		}
	}

	/**
	 * SETUP
	 */

	function addPlayer(video, hasAudio) {
		var player = video[ಠ] = {};
		player.paused = true; // track whether 'pause' events have been fired
		player.hasAudio = hasAudio;
		player.video = video;
		player.updater = intervalometer.frameIntervalometer(update.bind(player));

		if (hasAudio) {
			player.driver = getAudioFromVideo(video);
		} else {
			video.addEventListener('canplay', function () {
				if (!video.paused) {
					// console.log('oncanplay');
					dispatchEventAsync(video, 'playing');
				}
			});
			player.driver = {
				src: video.src || video.currentSrc || 'data:',
				muted: true,
				paused: true,
				pause: function () {
					player.driver.paused = true;
				},
				play: function () {
					player.driver.paused = false;
					// media automatically goes to 0 if .play() is called when it's done
					if (isPlayerEnded(player)) {
						setTime(video, 0);
					}
				},
				get ended() {
					return isPlayerEnded(player);
				}
			};
		}

		// .load() causes the emptied event
		video.addEventListener('emptied', function () {
			// console.log('driver src is', player.driver.src);
			var wasEmpty = !player.driver.src || player.driver.src === 'data:';
			if (player.driver.src && player.driver.src !== video.src) {
				// console.log('src changed to', video.src);
				setTime(video, 0, true);
				player.driver.src = video.src;
				// playing videos will only keep playing if no src was present when .play()’ed
				if (wasEmpty) {
					player.driver.play();
				} else {
					player.updater.stop();
				}
			}
		}, false);

		// stop programmatic player when OS takes over
		video.addEventListener('webkitbeginfullscreen', function () {
			if (!video.paused) {
				// make sure that the <audio> and the syncer/updater are stopped
				video.pause();

				// play video natively
				video[ಠplay]();
			} else if (hasAudio && !player.driver.buffered.length) {
				// if the first play is native,
				// the <audio> needs to be buffered manually
				// so when the fullscreen ends, it can be set to the same current time
				player.driver.load();
			}
		});
		if (hasAudio) {
			video.addEventListener('webkitendfullscreen', function () {
				// sync audio to new video position
				player.driver.currentTime = video.currentTime;
				// console.assert(player.driver.currentTime === video.currentTime, 'Audio not synced');
			});

			// allow seeking
			video.addEventListener('seeking', function () {
				if (lastRequests.indexOf(video.currentTime * 100 | 0 / 100) < 0) {
					// console.log('User-requested seeking');
					player.driver.currentTime = video.currentTime;
				}
			});
		}
	}

	function overloadAPI(video) {
		var player = video[ಠ];
		video[ಠplay] = video.play;
		video[ಠpause] = video.pause;
		video.play = play;
		video.pause = pause;
		proxyProperty(video, 'paused', player.driver);
		proxyProperty(video, 'muted', player.driver, true);
		proxyProperty(video, 'playbackRate', player.driver, true);
		proxyProperty(video, 'ended', player.driver);
		proxyProperty(video, 'loop', player.driver, true);
		preventEvent(video, 'seeking');
		preventEvent(video, 'seeked');
		preventEvent(video, 'timeupdate', ಠevent, false);
		preventEvent(video, 'ended', ಠevent, false); // prevent occasional native ended events
	}

	function enableInlineVideo(video, hasAudio, onlyWhitelisted) {
		if ( hasAudio === void 0 ) hasAudio = true;
		if ( onlyWhitelisted === void 0 ) onlyWhitelisted = true;

		if ((onlyWhitelisted && !isWhitelisted) || video[ಠ]) {
			return;
		}
		addPlayer(video, hasAudio);
		overloadAPI(video);
		video.classList.add('IIV');
		if (!hasAudio && video.autoplay) {
			video.play();
		}
		if (!/iPhone|iPod|iPad/.test(navigator.platform)) {
			console.warn('iphone-inline-video is not guaranteed to work in emulated environments');
		}
	}

	enableInlineVideo.isWhitelisted = isWhitelisted;

	module.exports = enableInlineVideo;

/***/ },
/* 93 */
/***/ function(module, exports) {

	'use strict';

	var index = typeof Symbol === 'undefined' ? function (description) {
		return '@' + (description || '@') + Math.random();
	} : Symbol;

	module.exports = index;

/***/ },
/* 94 */
/***/ function(module, exports) {

	/*! npm.im/intervalometer */
	'use strict';

	Object.defineProperty(exports, '__esModule', { value: true });

	function intervalometer(cb, request, cancel, requestParameter) {
		var requestId;
		var previousLoopTime;
		function loop(now) {
			// must be requested before cb() because that might call .stop()
			requestId = request(loop, requestParameter);

			// called with "ms since last call". 0 on start()
			cb(now - (previousLoopTime || now));

			previousLoopTime = now;
		}
		return {
			start: function start() {
				if (!requestId) { // prevent double starts
					loop(0);
				}
			},
			stop: function stop() {
				cancel(requestId);
				requestId = null;
				previousLoopTime = 0;
			}
		};
	}

	function frameIntervalometer(cb) {
		return intervalometer(cb, requestAnimationFrame, cancelAnimationFrame);
	}

	function timerIntervalometer(cb, delay) {
		return intervalometer(cb, setTimeout, clearTimeout, delay);
	}

	exports.intervalometer = intervalometer;
	exports.frameIntervalometer = frameIntervalometer;
	exports.timerIntervalometer = timerIntervalometer;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = initPortfolio;

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _parallax = __webpack_require__(96);

	var _parallax2 = _interopRequireDefault(_parallax);

	var _Scroller = __webpack_require__(18);

	var _Scroller2 = _interopRequireDefault(_Scroller);

	var _lodash = __webpack_require__(20);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ClickHandler = function () {
	  function ClickHandler(selector) {
	    var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

	    _classCallCheck(this, ClickHandler);

	    this.$element = (0, _jquery2.default)(selector);
	    this.clickHandler = fn;

	    this.handleMouseUp = (0, _lodash2.default)(this.handleMouseUp.bind(this), 0);
	    this.handleMouseDown = (0, _lodash2.default)(this.handleMouseDown.bind(this), 0);
	    this.handleMove = (0, _lodash2.default)(this.handleMove.bind(this), 0);

	    this.timeStart = null;
	    this.positionStart = null;
	    this.positionEnd = null;
	  }

	  _createClass(ClickHandler, [{
	    key: 'enable',
	    value: function enable() {
	      // this.$element.on('', this.killEvent)
	      this.$element.on('mousedown touchstart', this.handleMouseDown);
	      this.$element.on('click mouseup touchend', this.handleMouseUp);
	      this.$element.on('touchmove mousemove', this.handleMove);

	      return this;
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      // this.$element.off('click', this.killEvent)
	      this.$element.off('mousedown touchstart', this.handleMouseDown);
	      this.$element.off('click mouseup touchend', this.handleMouseUp);
	      this.$element.off('touchmove mousemove', this.handleMove);

	      return this;
	    }
	  }, {
	    key: 'killEvent',
	    value: function killEvent(event) {
	      event.preventDefault();
	      event.stopPropagation();
	    }
	  }, {
	    key: 'diffTime',
	    value: function diffTime(diffVal) {
	      var timeEnd = Date.now();
	      return timeEnd - this.timeStart < diffVal;
	    }
	  }, {
	    key: 'diffPosition',
	    value: function diffPosition(diffVal) {
	      var positionStart = this.positionStart,
	          positionEnd = this.positionEnd;

	      var diffX = Math.abs(positionStart.clientX - positionEnd.clientX);
	      var diffY = Math.abs(positionStart.clientY - positionEnd.clientY);
	      return diffX < diffVal && diffY < diffVal;
	    }
	  }, {
	    key: 'handleMouseUp',
	    value: function handleMouseUp(event) {
	      if (this.diffPosition(3)) {
	        this.clickHandler(event);
	      } else {
	        this.killEvent(event);
	      }
	    }
	  }, {
	    key: 'handleMouseDown',
	    value: function handleMouseDown(event) {
	      var coords = event.touches ? event.touches[0] : event;
	      var clientX = coords.clientX,
	          clientY = coords.clientY;


	      this.timeStart = Date.now();
	      this.positionStart = this.positionEnd = { clientX: clientX, clientY: clientY };
	    }
	  }, {
	    key: 'handleMove',
	    value: function handleMove(event) {
	      var coords = event.touches ? event.touches[0] : event;
	      var clientX = coords.clientX,
	          clientY = coords.clientY;


	      this.positionEnd = { clientX: clientX, clientY: clientY };
	    }
	  }]);

	  return ClickHandler;
	}();

	var Parallaxes = function () {
	  function Parallaxes(selector) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, Parallaxes);

	    this.$scenes = (0, _jquery2.default)(selector);

	    this.isActive = false;
	    this.options = options;

	    // parallax reset time: 1s
	    this.PARALLAX_RESET = 1000;

	    this.initParallax();
	  }

	  _createClass(Parallaxes, [{
	    key: 'initParallax',
	    value: function initParallax() {
	      var _this = this;

	      this.$scenes.each(function (i, el) {
	        el.$parallaxInstance = new _parallax2.default(el, _this.options);
	        el.$resetTimeout = null;

	        // Delayed parallax reset
	        (0, _jquery2.default)(el).on('mouseleave', function (event) {
	          el.$resetTimeout = setTimeout(function () {
	            el.$parallaxInstance.resetToCenter();
	          }, _this.PARALLAX_RESET);
	        });

	        // Clear delay on mouseenter
	        (0, _jquery2.default)(el).on('mouseenter', function (event) {
	          clearTimeout(el.$resetTimeout);
	        });
	      });
	    }
	  }]);

	  return Parallaxes;
	}();

	function initPortfolio() {
	  var clickHandler = new ClickHandler('.portfolio-card', function (event) {
	    var $card = (0, _jquery2.default)(event.target).closest('.portfolio-card');
	    var href = $card.find('a')[0].href;
	    window.location.assign(href);
	  });

	  clickHandler.enable();

	  // init slider on portfolio
	  var portfolioScroller = new _Scroller2.default('.portfolio__iscroll-wrap', {
	    scrollX: true,
	    scrollY: false,
	    eventPassthrough: true
	  });

	  // init parallax on portfolio
	  var parallaxes = new Parallaxes('.portfolio-card__picture-wrap', {
	    relativeInput: true,
	    clipRelativeInput: true,
	    scalarX: 30.0,
	    scalarY: 30.0
	  });
	}

/***/ },
/* 96 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Parallax.js
	 * @author Matthew Wagerfield - @wagerfield
	 * @description Creates a parallax effect between an array of layers,
	 *              driving the motion from the gyroscope output of a smartdevice.
	 *              If no gyroscope is available, the cursor position is used.
	 */
	exports.default = function (window, document, undefined) {

	  // Strict Mode
	  'use strict';

	  // Constants

	  var NAME = 'Parallax';
	  var MAGIC_NUMBER = 30;
	  var DEFAULTS = {
	    relativeInput: false,
	    clipRelativeInput: false,
	    calibrationThreshold: 100,
	    calibrationDelay: 500,
	    supportDelay: 500,
	    calibrateX: false,
	    calibrateY: true,
	    invertX: true,
	    invertY: true,
	    limitX: false,
	    limitY: false,
	    scalarX: 10.0,
	    scalarY: 10.0,
	    frictionX: 0.1,
	    frictionY: 0.1,
	    originX: 0.5,
	    originY: 0.5
	  };

	  function Parallax(element, options) {

	    // DOM Context
	    this.element = element;
	    this.layers = element.getElementsByClassName('layer');

	    // Data Extraction
	    var data = {
	      calibrateX: this.data(this.element, 'calibrate-x'),
	      calibrateY: this.data(this.element, 'calibrate-y'),
	      invertX: this.data(this.element, 'invert-x'),
	      invertY: this.data(this.element, 'invert-y'),
	      limitX: this.data(this.element, 'limit-x'),
	      limitY: this.data(this.element, 'limit-y'),
	      scalarX: this.data(this.element, 'scalar-x'),
	      scalarY: this.data(this.element, 'scalar-y'),
	      frictionX: this.data(this.element, 'friction-x'),
	      frictionY: this.data(this.element, 'friction-y'),
	      originX: this.data(this.element, 'origin-x'),
	      originY: this.data(this.element, 'origin-y')
	    };

	    // Delete Null Data Values
	    for (var key in data) {
	      if (data[key] === null) delete data[key];
	    }

	    // Compose Settings Object
	    this.extend(this, DEFAULTS, options, data);

	    // States
	    this.calibrationTimer = null;
	    this.calibrationFlag = true;
	    this.enabled = false;
	    this.depths = [];
	    this.raf = null;

	    // Element Bounds
	    this.bounds = null;
	    this.ex = 0;
	    this.ey = 0;
	    this.ew = 0;
	    this.eh = 0;

	    // Element Center
	    this.ecx = 0;
	    this.ecy = 0;

	    // Element Range
	    this.erx = 0;
	    this.ery = 0;

	    // Calibration
	    this.cx = 0;
	    this.cy = 0;

	    // Input
	    this.ix = 0;
	    this.iy = 0;

	    // Motion
	    this.mx = 0;
	    this.my = 0;

	    // Velocity
	    this.vx = 0;
	    this.vy = 0;

	    // Callbacks
	    this.onMouseMove = this.onMouseMove.bind(this);
	    this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
	    this.onOrientationTimer = this.onOrientationTimer.bind(this);
	    this.onCalibrationTimer = this.onCalibrationTimer.bind(this);
	    this.onAnimationFrame = this.onAnimationFrame.bind(this);
	    this.onWindowResize = this.onWindowResize.bind(this);

	    // Initialise
	    this.initialise();
	  }

	  Parallax.prototype.extend = function () {
	    if (arguments.length > 1) {
	      var master = arguments[0];
	      for (var i = 1, l = arguments.length; i < l; i++) {
	        var object = arguments[i];
	        for (var key in object) {
	          master[key] = object[key];
	        }
	      }
	    }
	  };

	  Parallax.prototype.data = function (element, name) {
	    return this.deserialize(element.getAttribute('data-' + name));
	  };

	  Parallax.prototype.deserialize = function (value) {
	    if (value === "true") {
	      return true;
	    } else if (value === "false") {
	      return false;
	    } else if (value === "null") {
	      return null;
	    } else if (!isNaN(parseFloat(value)) && isFinite(value)) {
	      return parseFloat(value);
	    } else {
	      return value;
	    }
	  };

	  Parallax.prototype.camelCase = function (value) {
	    return value.replace(/-+(.)?/g, function (match, character) {
	      return character ? character.toUpperCase() : '';
	    });
	  };

	  Parallax.prototype.transformSupport = function (value) {
	    var element = document.createElement('div');
	    var propertySupport = false;
	    var propertyValue = null;
	    var featureSupport = false;
	    var cssProperty = null;
	    var jsProperty = null;
	    for (var i = 0, l = this.vendors.length; i < l; i++) {
	      if (this.vendors[i] !== null) {
	        cssProperty = this.vendors[i][0] + 'transform';
	        jsProperty = this.vendors[i][1] + 'Transform';
	      } else {
	        cssProperty = 'transform';
	        jsProperty = 'transform';
	      }
	      if (element.style[jsProperty] !== undefined) {
	        propertySupport = true;
	        break;
	      }
	    }
	    switch (value) {
	      case '2D':
	        featureSupport = propertySupport;
	        break;
	      case '3D':
	        if (propertySupport) {
	          var body = document.body || document.createElement('body');
	          var documentElement = document.documentElement;
	          var documentOverflow = documentElement.style.overflow;
	          if (!document.body) {
	            documentElement.style.overflow = 'hidden';
	            documentElement.appendChild(body);
	            body.style.overflow = 'hidden';
	            body.style.background = '';
	          }
	          body.appendChild(element);
	          element.style[jsProperty] = 'translate3d(1px,1px,1px)';
	          propertyValue = window.getComputedStyle(element).getPropertyValue(cssProperty);
	          featureSupport = propertyValue !== undefined && propertyValue.length > 0 && propertyValue !== "none";
	          documentElement.style.overflow = documentOverflow;
	          body.removeChild(element);
	        }
	        break;
	    }
	    return featureSupport;
	  };

	  Parallax.prototype.ww = null;
	  Parallax.prototype.wh = null;
	  Parallax.prototype.wcx = null;
	  Parallax.prototype.wcy = null;
	  Parallax.prototype.wrx = null;
	  Parallax.prototype.wry = null;
	  Parallax.prototype.portrait = null;
	  Parallax.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
	  Parallax.prototype.vendors = [null, ['-webkit-', 'webkit'], ['-moz-', 'Moz'], ['-o-', 'O'], ['-ms-', 'ms']];
	  Parallax.prototype.motionSupport = !!window.DeviceMotionEvent;
	  Parallax.prototype.orientationSupport = !!window.DeviceOrientationEvent;
	  Parallax.prototype.orientationStatus = 0;
	  Parallax.prototype.transform2DSupport = Parallax.prototype.transformSupport('2D');
	  Parallax.prototype.transform3DSupport = Parallax.prototype.transformSupport('3D');
	  Parallax.prototype.propertyCache = {};

	  Parallax.prototype.initialise = function () {

	    // Configure Context Styles
	    if (this.transform3DSupport) this.accelerate(this.element);
	    var style = window.getComputedStyle(this.element);
	    if (style.getPropertyValue('position') === 'static') {
	      this.element.style.position = 'relative';
	    }

	    // Setup
	    this.updateLayers();
	    this.updateDimensions();
	    this.enable();
	    this.queueCalibration(this.calibrationDelay);
	  };

	  Parallax.prototype.updateLayers = function () {

	    // Cache Layer Elements
	    this.layers = this.element.getElementsByClassName('layer');
	    this.depths = [];

	    // Configure Layer Styles
	    for (var i = 0, l = this.layers.length; i < l; i++) {
	      var layer = this.layers[i];
	      if (this.transform3DSupport) this.accelerate(layer);
	      layer.style.position = i ? 'absolute' : 'relative';
	      layer.style.display = 'block';
	      layer.style.left = 0;
	      layer.style.top = 0;

	      // Cache Layer Depth
	      this.depths.push(this.data(layer, 'depth') || 0);
	    }
	  };

	  Parallax.prototype.updateDimensions = function () {
	    this.ww = window.innerWidth;
	    this.wh = window.innerHeight;
	    this.wcx = this.ww * this.originX;
	    this.wcy = this.wh * this.originY;
	    this.wrx = Math.max(this.wcx, this.ww - this.wcx);
	    this.wry = Math.max(this.wcy, this.wh - this.wcy);
	  };

	  Parallax.prototype.updateBounds = function () {
	    this.bounds = this.element.getBoundingClientRect();
	    this.ex = this.bounds.left;
	    this.ey = this.bounds.top;
	    this.ew = this.bounds.width;
	    this.eh = this.bounds.height;
	    this.ecx = this.ew * this.originX;
	    this.ecy = this.eh * this.originY;
	    this.erx = Math.max(this.ecx, this.ew - this.ecx);
	    this.ery = Math.max(this.ecy, this.eh - this.ecy);
	  };

	  Parallax.prototype.queueCalibration = function (delay) {
	    clearTimeout(this.calibrationTimer);
	    this.calibrationTimer = setTimeout(this.onCalibrationTimer, delay);
	  };

	  Parallax.prototype.enable = function () {
	    if (!this.enabled) {
	      this.enabled = true;
	      if (this.orientationSupport) {
	        this.portrait = null;
	        window.addEventListener('deviceorientation', this.onDeviceOrientation);
	        setTimeout(this.onOrientationTimer, this.supportDelay);
	      } else {
	        this.cx = 0;
	        this.cy = 0;
	        this.portrait = false;
	        this.listenedElement = this.clipRelativeInput ? this.element : window;
	        this.listenedElement.addEventListener('mousemove', this.onMouseMove);
	      }
	      window.addEventListener('resize', this.onWindowResize);
	      this.raf = requestAnimationFrame(this.onAnimationFrame);
	    }
	  };

	  Parallax.prototype.disable = function () {
	    if (this.enabled) {
	      this.enabled = false;
	      if (this.orientationSupport) {
	        window.removeEventListener('deviceorientation', this.onDeviceOrientation);
	      } else {
	        this.listenedElement.removeEventListener('mousemove', this.onMouseMove);
	      }
	      window.removeEventListener('resize', this.onWindowResize);
	      cancelAnimationFrame(this.raf);
	    }
	  };

	  Parallax.prototype.calibrate = function (x, y) {
	    this.calibrateX = x === undefined ? this.calibrateX : x;
	    this.calibrateY = y === undefined ? this.calibrateY : y;
	  };

	  Parallax.prototype.invert = function (x, y) {
	    this.invertX = x === undefined ? this.invertX : x;
	    this.invertY = y === undefined ? this.invertY : y;
	  };

	  Parallax.prototype.friction = function (x, y) {
	    this.frictionX = x === undefined ? this.frictionX : x;
	    this.frictionY = y === undefined ? this.frictionY : y;
	  };

	  Parallax.prototype.scalar = function (x, y) {
	    this.scalarX = x === undefined ? this.scalarX : x;
	    this.scalarY = y === undefined ? this.scalarY : y;
	  };

	  Parallax.prototype.limit = function (x, y) {
	    this.limitX = x === undefined ? this.limitX : x;
	    this.limitY = y === undefined ? this.limitY : y;
	  };

	  Parallax.prototype.origin = function (x, y) {
	    this.originX = x === undefined ? this.originX : x;
	    this.originY = y === undefined ? this.originY : y;
	  };

	  Parallax.prototype.clamp = function (value, min, max) {
	    value = Math.max(value, min);
	    value = Math.min(value, max);
	    return value;
	  };

	  Parallax.prototype.css = function (element, property, value) {
	    var jsProperty = this.propertyCache[property];
	    if (!jsProperty) {
	      for (var i = 0, l = this.vendors.length; i < l; i++) {
	        if (this.vendors[i] !== null) {
	          jsProperty = this.camelCase(this.vendors[i][1] + '-' + property);
	        } else {
	          jsProperty = property;
	        }
	        if (element.style[jsProperty] !== undefined) {
	          this.propertyCache[property] = jsProperty;
	          break;
	        }
	      }
	    }
	    element.style[jsProperty] = value;
	  };

	  Parallax.prototype.accelerate = function (element) {
	    this.css(element, 'transform', 'translate3d(0,0,0)');
	    this.css(element, 'transform-style', 'preserve-3d');
	    this.css(element, 'backface-visibility', 'hidden');
	  };

	  Parallax.prototype.setPosition = function (element, x, y) {
	    x = x.toFixed(2) + 'px';
	    y = y.toFixed(2) + 'px';
	    if (this.transform3DSupport) {
	      this.css(element, 'transform', 'translate3d(' + x + ',' + y + ',0)');
	    } else if (this.transform2DSupport) {
	      this.css(element, 'transform', 'translate(' + x + ',' + y + ')');
	    } else {
	      element.style.left = x;
	      element.style.top = y;
	    }
	  };

	  Parallax.prototype.onOrientationTimer = function (event) {
	    if (this.orientationSupport && this.orientationStatus === 0) {
	      this.disable();
	      this.orientationSupport = false;
	      this.enable();
	    }
	  };

	  Parallax.prototype.onCalibrationTimer = function (event) {
	    this.calibrationFlag = true;
	  };

	  Parallax.prototype.onWindowResize = function (event) {
	    this.updateDimensions();
	  };

	  Parallax.prototype.onAnimationFrame = function () {
	    this.updateBounds();
	    var dx = this.ix - this.cx;
	    var dy = this.iy - this.cy;
	    if (Math.abs(dx) > this.calibrationThreshold || Math.abs(dy) > this.calibrationThreshold) {
	      this.queueCalibration(0);
	    }
	    if (this.portrait) {
	      this.mx = this.calibrateX ? dy : this.iy;
	      this.my = this.calibrateY ? dx : this.ix;
	    } else {
	      this.mx = this.calibrateX ? dx : this.ix;
	      this.my = this.calibrateY ? dy : this.iy;
	    }
	    this.mx *= this.ew * (this.scalarX / 100);
	    this.my *= this.eh * (this.scalarY / 100);
	    if (!isNaN(parseFloat(this.limitX))) {
	      this.mx = this.clamp(this.mx, -this.limitX, this.limitX);
	    }
	    if (!isNaN(parseFloat(this.limitY))) {
	      this.my = this.clamp(this.my, -this.limitY, this.limitY);
	    }
	    this.vx += (this.mx - this.vx) * this.frictionX;
	    this.vy += (this.my - this.vy) * this.frictionY;
	    for (var i = 0, l = this.layers.length; i < l; i++) {
	      var layer = this.layers[i];
	      var depth = this.depths[i];
	      var xOffset = this.vx * depth * (this.invertX ? -1 : 1);
	      var yOffset = this.vy * depth * (this.invertY ? -1 : 1);
	      this.setPosition(layer, xOffset, yOffset);
	    }
	    this.raf = requestAnimationFrame(this.onAnimationFrame);
	  };

	  Parallax.prototype.onDeviceOrientation = function (event) {

	    // Validate environment and event properties.
	    if (!this.desktop && event.beta !== null && event.gamma !== null) {

	      // Set orientation status.
	      this.orientationStatus = 1;

	      // Extract Rotation
	      var x = (event.beta || 0) / MAGIC_NUMBER; //  -90 :: 90
	      var y = (event.gamma || 0) / MAGIC_NUMBER; // -180 :: 180

	      // Detect Orientation Change
	      var portrait = this.wh > this.ww;
	      if (this.portrait !== portrait) {
	        this.portrait = portrait;
	        this.calibrationFlag = true;
	      }

	      // Set Calibration
	      if (this.calibrationFlag) {
	        this.calibrationFlag = false;
	        this.cx = x;
	        this.cy = y;
	      }

	      // Set Input
	      this.ix = x;
	      this.iy = y;
	    }
	  };

	  Parallax.prototype.onMouseMove = function (event) {

	    // Cache mouse coordinates.
	    var clientX = event.clientX;
	    var clientY = event.clientY;

	    // Calculate Mouse Input
	    if (!this.orientationSupport && this.relativeInput) {

	      // Calculate input relative to the element.
	      this.ix = (clientX - this.ex - this.ecx) / this.erx;
	      this.iy = (clientY - this.ey - this.ecy) / this.ery;
	    } else {

	      // Calculate input relative to the window.
	      this.ix = (clientX - this.wcx) / this.wrx;
	      this.iy = (clientY - this.wcy) / this.wry;
	    }
	  };

	  Parallax.prototype.resetToCenter = function () {
	    this.ix = 0;
	    this.iy = 0;
	  };

	  // Expose Parallax
	  return Parallax;
	}(window, document);

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = initGoogleMaps;

	var _googleMaps = __webpack_require__(98);

	var _googleMaps2 = _interopRequireDefault(_googleMaps);

	var _mapmark = __webpack_require__(99);

	var _mapmark2 = _interopRequireDefault(_mapmark);

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var KEY = 'AIzaSyCo_4kB6H3bk6Eq3_rB2fXMJD-0appWS6I';
	var OFFICE_COORDS = {
	  lat: 55.7521319,
	  lng: 37.6708473
	};

	function initGoogleMaps() {
	  _googleMaps2.default.KEY = KEY;
	  _googleMaps2.default.load(function (google) {
	    var mapContainer = document.getElementById('id-map');
	    var coords = OFFICE_COORDS;

	    var map = new google.maps.Map(mapContainer, {
	      scrollwheel: false,
	      draggable: true,
	      center: OFFICE_COORDS,
	      zoom: 16
	    });

	    var marker = new google.maps.Marker({
	      position: OFFICE_COORDS,
	      // icon: markerIcon,
	      map: map
	    });

	    google.maps.event.addDomListener(map, 'idle', function () {
	      // Update initial coords on 'idle'
	      coords = map.getCenter();
	    });

	    google.maps.event.addDomListener(window, 'resize', function () {
	      // Update map coords on resize
	      map.setCenter(coords);
	    });
	  });
	}

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {

		if (root === null) {
			throw new Error('Google-maps package can be used only in browser');
		}

		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			root.GoogleMapsLoader = factory();
		}

	})(typeof window !== 'undefined' ? window : null, function() {


		'use strict';


		var googleVersion = '3.18';

		var script = null;

		var google = null;

		var loading = false;

		var callbacks = [];

		var onLoadEvents = [];

		var originalCreateLoaderMethod = null;


		var GoogleMapsLoader = {};


		GoogleMapsLoader.URL = 'https://maps.googleapis.com/maps/api/js';

		GoogleMapsLoader.KEY = null;

		GoogleMapsLoader.LIBRARIES = [];

		GoogleMapsLoader.CLIENT = null;

		GoogleMapsLoader.CHANNEL = null;

		GoogleMapsLoader.LANGUAGE = null;

		GoogleMapsLoader.REGION = null;

		GoogleMapsLoader.VERSION = googleVersion;

		GoogleMapsLoader.WINDOW_CALLBACK_NAME = '__google_maps_api_provider_initializator__';


		GoogleMapsLoader._googleMockApiObject = {};


		GoogleMapsLoader.load = function(fn) {
			if (google === null) {
				if (loading === true) {
					if (fn) {
						callbacks.push(fn);
					}
				} else {
					loading = true;

					window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] = function() {
						ready(fn);
					};

					GoogleMapsLoader.createLoader();
				}
			} else if (fn) {
				fn(google);
			}
		};


		GoogleMapsLoader.createLoader = function() {
			script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = GoogleMapsLoader.createUrl();

			document.body.appendChild(script);
		};


		GoogleMapsLoader.isLoaded = function() {
			return google !== null;
		};


		GoogleMapsLoader.createUrl = function() {
			var url = GoogleMapsLoader.URL;

			url += '?callback=' + GoogleMapsLoader.WINDOW_CALLBACK_NAME;

			if (GoogleMapsLoader.KEY) {
				url += '&key=' + GoogleMapsLoader.KEY;
			}

			if (GoogleMapsLoader.LIBRARIES.length > 0) {
				url += '&libraries=' + GoogleMapsLoader.LIBRARIES.join(',');
			}

			if (GoogleMapsLoader.CLIENT) {
				url += '&client=' + GoogleMapsLoader.CLIENT + '&v=' + GoogleMapsLoader.VERSION;
			}

			if (GoogleMapsLoader.CHANNEL) {
				url += '&channel=' + GoogleMapsLoader.CHANNEL;
			}

			if (GoogleMapsLoader.LANGUAGE) {
				url += '&language=' + GoogleMapsLoader.LANGUAGE;
			}

			if (GoogleMapsLoader.REGION) {
				url += '&region=' + GoogleMapsLoader.REGION;
			}

			return url;
		};


		GoogleMapsLoader.release = function(fn) {
			var release = function() {
				GoogleMapsLoader.KEY = null;
				GoogleMapsLoader.LIBRARIES = [];
				GoogleMapsLoader.CLIENT = null;
				GoogleMapsLoader.CHANNEL = null;
				GoogleMapsLoader.LANGUAGE = null;
				GoogleMapsLoader.REGION = null;
				GoogleMapsLoader.VERSION = googleVersion;

				google = null;
				loading = false;
				callbacks = [];
				onLoadEvents = [];

				if (typeof window.google !== 'undefined') {
					delete window.google;
				}

				if (typeof window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] !== 'undefined') {
					delete window[GoogleMapsLoader.WINDOW_CALLBACK_NAME];
				}

				if (originalCreateLoaderMethod !== null) {
					GoogleMapsLoader.createLoader = originalCreateLoaderMethod;
					originalCreateLoaderMethod = null;
				}

				if (script !== null) {
					script.parentElement.removeChild(script);
					script = null;
				}

				if (fn) {
					fn();
				}
			};

			if (loading) {
				GoogleMapsLoader.load(function() {
					release();
				});
			} else {
				release();
			}
		};


		GoogleMapsLoader.onLoad = function(fn) {
			onLoadEvents.push(fn);
		};


		GoogleMapsLoader.makeMock = function() {
			originalCreateLoaderMethod = GoogleMapsLoader.createLoader;

			GoogleMapsLoader.createLoader = function() {
				window.google = GoogleMapsLoader._googleMockApiObject;
				window[GoogleMapsLoader.WINDOW_CALLBACK_NAME]();
			};
		};


		var ready = function(fn) {
			var i;

			loading = false;

			if (google === null) {
				google = window.google;
			}

			for (i = 0; i < onLoadEvents.length; i++) {
				onLoadEvents[i](google);
			}

			if (fn) {
				fn(google);
			}

			for (i = 0; i < callbacks.length; i++) {
				callbacks[i](google);
			}

			callbacks = [];
		};


		return GoogleMapsLoader;

	});


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "assets/mapmark.svg";

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = initHeaderNav;

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _smoothScroll = __webpack_require__(2);

	var _smoothScroll2 = _interopRequireDefault(_smoothScroll);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ElementsViewportWatcher = function () {
	  function ElementsViewportWatcher(selector) {
	    var _this = this;

	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, ElementsViewportWatcher);

	    this.findActive = this.findActive.bind(this);
	    this.findRealActive = this.findRealActive.bind(this);
	    this.findLast = this.findLast.bind(this);
	    this.getTopOffset = this.getTopOffset.bind(this);

	    this.$elements = (0, _jquery2.default)(selector);
	    this.$activeElement = null;

	    this.options = options;

	    this.$elements.each(function (i, el) {
	      el.$uniqueId = _this.uid();
	    });
	  }

	  _createClass(ElementsViewportWatcher, [{
	    key: 'uid',
	    value: function uid() {
	      return Math.round(Math.random() * 1e16).toString(32);
	    }
	  }, {
	    key: 'getUid',
	    value: function getUid(el) {
	      if (el === null) return null;
	      return el.$uniqueId;
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      this.findActive();
	      (0, _jquery2.default)(window).on('scroll', this.findActive);
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      (0, _jquery2.default)(window).off('scroll', this.findActive);
	    }
	  }, {
	    key: 'isInViewport',
	    value: function isInViewport(clientRect, viewportRect) {
	      if (clientRect.top <= viewportRect.top && clientRect.top + clientRect.height > viewportRect.top) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: 'getTopOffset',
	    value: function getTopOffset() {
	      var _options = this.options,
	          topOffset = _options.topOffset,
	          topOffsetBy = _options.topOffsetBy;


	      if (typeof topOffset === 'number' && !isNaN(topOffset)) {
	        return topOffset;
	      }

	      if (topOffsetBy) {
	        var $elems = Array.from((0, _jquery2.default)(topOffsetBy));
	        return $elems.reduce(function (height, el) {
	          if (!(0, _jquery2.default)(el).is(':visible')) return height;
	          return height > (0, _jquery2.default)(el).height() ? height : (0, _jquery2.default)(el).height();
	        }, 0);
	      }

	      return 0;
	    }
	  }, {
	    key: 'findRealActive',
	    value: function findRealActive(viewportRect) {
	      var _this2 = this;

	      return Array.from(this.$elements).reduce(function (active, el) {
	        var clientRect = el.getBoundingClientRect();
	        var isClientInViewport = _this2.isInViewport(clientRect, viewportRect);
	        var isHighPriority = (0, _jquery2.default)(el).attr('data-viewport-high-priority');

	        if (active !== null) {
	          var activeRect = active.getBoundingClientRect();
	          var isActiveInViewport = _this2.isInViewport(activeRect, viewportRect);

	          if (!isClientInViewport && !isActiveInViewport) return null;

	          if (!isActiveInViewport && isClientInViewport) return el;
	          if (!isClientInViewport && isActiveInViewport) return active;

	          if (isClientInViewport && isActiveInViewport) {
	            if (isHighPriority) return el;
	            return clientRect.top > activeRect.top ? el : active;
	          }
	        }

	        return isClientInViewport ? el : null;
	      }, this.$activeElement);
	    }
	  }, {
	    key: 'findLast',
	    value: function findLast(viewportRect) {
	      return Array.from(this.$elements).reduce(function (active, el) {
	        var clientRect = el.getBoundingClientRect();

	        if (active !== null) {
	          var activeRect = active.getBoundingClientRect();
	          return clientRect.top > activeRect.top ? el : active;
	        }

	        return el;
	      }, this.$activeElement);
	    }
	  }, {
	    key: 'findActive',
	    value: function findActive() {
	      var TOP = this.getTopOffset();

	      var BOTTOM = this.options.bottomOffset ? (0, _jquery2.default)(window).height() + this.options.bottomOffset : (0, _jquery2.default)(window).height();

	      var prevActiveId = this.getUid(this.$activeElement);

	      var viewportRect = {
	        top: TOP,
	        bottom: BOTTOM
	      };

	      var isAtTheBottom = (0, _jquery2.default)(window).scrollTop() + (0, _jquery2.default)(window).height() === (0, _jquery2.default)(document).height();

	      this.$activeElement = isAtTheBottom ? this.findLast(viewportRect) : this.findRealActive(viewportRect);

	      if (prevActiveId !== this.getUid(this.$activeElement)) {
	        this.onChange(this.$activeElement);
	      }
	    }
	  }, {
	    key: 'onChange',
	    value: function onChange() {}
	  }]);

	  return ElementsViewportWatcher;
	}();

	function initHeaderNav() {
	  // Watch landing sections
	  var landingSections = ['#id-clients', '#id-portfolio', '#id-tools', '#id-map'];
	  var viewportWatcher = new ElementsViewportWatcher(landingSections.join(', '), { topOffsetBy: '.header, .header-sticky' });

	  viewportWatcher.onChange = function (active) {
	    (0, _jquery2.default)('.js-nav-link').removeClass('js-nav-link--active');
	    if (active !== null) {
	      (0, _jquery2.default)('a[href="#' + active.id + '"]').addClass('js-nav-link js-nav-link--active');
	    }
	  };

	  viewportWatcher.enable();

	  // Add smooth scroll to navigation
	  (0, _jquery2.default)('a[href^="#"]').on('click', function (event) {
	    event.preventDefault();
	    var $anchor = (0, _jquery2.default)(event.target).closest('a');
	    var selector = $anchor.attr('href');
	    var scrollTo = document.querySelector(selector);
	    var offset = Array.from((0, _jquery2.default)('.header, .header-sticky')).reduce(function (height, el) {
	      if (!(0, _jquery2.default)(el).is(':visible')) return height;
	      return height > (0, _jquery2.default)(el).height() ? height : (0, _jquery2.default)(el).height();
	    }, 0);

	    _smoothScroll2.default.animateScroll(scrollTo, null, { offset: offset });
	  });
	}

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = initMobileHeader;

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function initMobileHeader() {

	  function headerMobMenuHide() {
	    (0, _jquery2.default)('#header').removeClass('is-open');
	    (0, _jquery2.default)('#headerBurger').removeClass('is-active');
	    (0, _jquery2.default)('body, html').removeClass('oveflow');
	    (0, _jquery2.default)('#headerMenu').slideUp("fast", function () {
	      (0, _jquery2.default)(this).removeClass('header-menu--opened');
	    });
	  }

	  function headerMobMenuShow() {
	    (0, _jquery2.default)('#headerBurger').addClass('is-active');
	    (0, _jquery2.default)('#header').toggleClass('is-open');
	    (0, _jquery2.default)('body, html').addClass('oveflow');
	    (0, _jquery2.default)('#headerMenu').slideDown("fast", function () {
	      (0, _jquery2.default)(this).addClass('header-menu--opened');
	    });
	  }

	  function headerMobStickyShow() {
	    var header = (0, _jquery2.default)('.header');
	    var headerInner = (0, _jquery2.default)('.header__inner-wrap');
	    var headerInnerHeight = headerInner.outerHeight();

	    if ((0, _jquery2.default)(window).scrollTop() > header.offset().top) {
	      header.addClass('header--fixed');
	      header.css({
	        "height": headerInnerHeight
	      });
	    } else {
	      header.removeClass('header--fixed');
	      header.css({
	        "height": ''
	      });
	    }
	  }

	  (0, _jquery2.default)('#headerBurgerWrap').click(function (e) {
	    e.preventDefault();
	    if ((0, _jquery2.default)('#header').hasClass('is-open')) {
	      headerMobMenuHide();
	    } else {
	      headerMobMenuShow();
	    }
	  });

	  (0, _jquery2.default)('.header-menu__link').click(function () {
	    (0, _jquery2.default)('#headerBurger').toggleClass('is-active');
	    (0, _jquery2.default)('#header').removeClass('is-open');
	    (0, _jquery2.default)('#headerMenu').slideToggle("fast", function () {
	      (0, _jquery2.default)(this).toggleClass('header-menu--opened');
	    });
	    (0, _jquery2.default)('body, html').removeClass('oveflow');
	  });

	  (0, _jquery2.default)(window).resize(function () {
	    headerMobStickyShow();

	    if ((0, _jquery2.default)("#header").is(":hidden")) headerMobMenuHide();
	  });

	  (0, _jquery2.default)(window).ready(function () {
	    headerMobStickyShow();
	  });

	  (0, _jquery2.default)(window).scroll(function () {
	    headerMobStickyShow();
	  });
	}

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = initClients;

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _debounce = __webpack_require__(103);

	var _debounce2 = _interopRequireDefault(_debounce);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InfiniteScroller = function () {
	  function InfiniteScroller(selector, options) {
	    var _this = this;

	    _classCallCheck(this, InfiniteScroller);

	    this.options = Object.assign({ delta: 0.1 }, options);
	    this.currentDiff = 0;
	    this.isAnimating = false;

	    this.runningAnimations = {};

	    this.$node = (0, _jquery2.default)(selector);
	    this.$wrapper = this.$node.children().first();

	    this.$children = this.$wrapper.children();
	    this.$clonedChildren = this.$children.clone();

	    this.$wrapper.append(this.$clonedChildren);

	    this.debouncedResizeHandler = (0, _debounce2.default)(this.handleWindowResize.bind(this), 100);

	    this.waitForImages().then(function () {
	      _this.childrenWidth = _this.getChildrenWidth();
	      _this.resizeWrapper(_this.childrenWidth);
	      _this.startAnimation();
	      window.addEventListener('resize', function () {
	        _this.stopAnimation();
	        _this.debouncedResizeHandler();
	      });
	    });
	  }

	  _createClass(InfiniteScroller, [{
	    key: 'frame',
	    value: function frame(animationKey) {
	      var _this2 = this;

	      if (!this.runningAnimations[animationKey]) return;

	      if (this.childrenWidth !== this.getChildrenWidth()) {
	        this.handleWindowResize();
	        return;
	      }

	      if (this.currentDiff >= this.childrenWidth / 2) {
	        var diff = this.currentDiff - this.childrenWidth / 2;
	        this.currentDiff = parseFloat(diff.toFixed(2));
	      }

	      this.currentDiff += this.options.delta;

	      this.$wrapper.css({
	        transform: 'translate3d(-' + this.currentDiff + 'px, 0, 0)'
	      });

	      requestAnimationFrame(function () {
	        return _this2.frame(animationKey);
	      });
	    }
	  }, {
	    key: 'startAnimation',
	    value: function startAnimation() {
	      var _this3 = this;

	      var animationKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now().toString(32);

	      this.runningAnimations[animationKey] = true;
	      requestAnimationFrame(function () {
	        return _this3.frame(animationKey);
	      });
	    }
	  }, {
	    key: 'stopAnimation',
	    value: function stopAnimation(animationKey) {
	      if (animationKey) {
	        this.runningAnimations[animationKey] = false;
	      } else {
	        this.runningAnimations = {};
	      }
	    }
	  }, {
	    key: 'handleWindowResize',
	    value: function handleWindowResize() {
	      var _this4 = this;

	      requestAnimationFrame(function () {
	        _this4.childrenWidth = _this4.getChildrenWidth();
	        _this4.resizeWrapper(_this4.childrenWidth);
	        _this4.startAnimation();
	      });
	    }
	  }, {
	    key: 'resizeWrapper',
	    value: function resizeWrapper() {
	      var newWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getChildrenWidth();

	      this.$wrapper.css({
	        width: newWidth
	      });
	    }
	  }, {
	    key: 'getChildrenWidth',
	    value: function getChildrenWidth() {
	      var initial = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	      return Array.from(this.$wrapper.children()).reduce(function (width, el) {
	        return width + (0, _jquery2.default)(el).outerWidth(true);
	      }, initial);
	    }
	  }, {
	    key: 'waitForImages',
	    value: function waitForImages() {
	      var _this5 = this;

	      return new Promise(function (resolve) {
	        var $img = _this5.$wrapper.find('img');
	        var imgCount = $img.length;
	        var loaded = 0;

	        if (imgCount === 0) return resolve();

	        Array.from($img).forEach(function (el) {
	          if (el.complete) return loaded++;
	          (0, _jquery2.default)(el).on('load', function () {
	            loaded++;
	            if (loaded === imgCount) resolve();
	          });
	        });

	        if (loaded === imgCount) resolve();
	      });
	    }
	  }]);

	  return InfiniteScroller;
	}();

	function initClients() {
	  var clientsScroller = new InfiniteScroller('.clients__iscroll-wrap', { delta: 2 });
	}

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(104),
	    now = __webpack_require__(105),
	    toNumber = __webpack_require__(108);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

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

	module.exports = debounce;


/***/ },
/* 104 */
/***/ function(module, exports) {

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
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(106);

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

	module.exports = now;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(107);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 107 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(104),
	    isSymbol = __webpack_require__(109);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

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

	module.exports = toNumber;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(110),
	    isObjectLike = __webpack_require__(114);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

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
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(111),
	    getRawTag = __webpack_require__(112),
	    objectToString = __webpack_require__(113);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(106);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(111);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ },
/* 113 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 114 */
/***/ function(module, exports) {

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
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {

	  var $allImgs = (0, _jquery2.default)('img');
	  var $preloader = (0, _jquery2.default)('.preloader');
	  var $preloaderInner = $preloader.find('.preloader__inner');
	  var $svg = $preloader.find('svg');
	  var body = (0, _jquery2.default)(document.body);
	  var html = (0, _jquery2.default)('html');

	  var index = 0;
	  var tempIndex = 0;
	  var success = false;

	  function hidePreload() {
	    $preloader.css('opacity', 0);
	    $preloader.on('transitionend', function () {
	      $preloader.css('display', 'none');
	    });
	    $preloaderInner.css('display', 'none');
	    // body.css('overflow', 'auto')
	    // html.css('overflow', 'auto')
	    (0, _jquery2.default)('html, body').addClass('preload--initial');
	  }

	  $allImgs.each(function (e, elem) {
	    var img = new Image();
	    img.src = elem.getAttribute('src');

	    (0, _jquery2.default)(img).on('load error', function (e) {

	      index++;

	      if (index % ($allImgs.length / $svg.length) <= 1) {
	        var $curSvg = $svg.eq(tempIndex);

	        if (!$curSvg.parent().hasClass('preload-stop')) {
	          $curSvg.parent().addClass('preload-stop');
	        }

	        $curSvg.addClass('_loaded');

	        tempIndex++;
	      }

	      if (index == $allImgs.length) {
	        $svg.last().addClass('_loaded');
	        setTimeout(hidePreload, 160);
	        success = true;
	      }
	    });
	  });

	  setTimeout(function () {
	    !success && hidePreload();
	  }, 20000);
	};

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 116 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);
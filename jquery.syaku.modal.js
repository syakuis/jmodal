/**
 * jQuery Modal
 *
 * @depend jQuery http://jquery.com
 *
 * Copyright (c) Seok Kyun. Choi. 최석균
 * Licensed under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 *
 * registered date 2015-05-15
 * http://syaku.tistory.com
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
} (function($) {
	'use strict';

	var C_STYLE = "display:none; background: #fff;padding: 15px 30px;-webkit-border-radius: 8px;-moz-border-radius: 8px;-o-border-radius: 8px;-ms-border-radius: 8px;border-radius: 8px;-webkit-box-shadow: 0 0 10px #000;-moz-box-shadow: 0 0 10px #000;-o-box-shadow: 0 0 10px #000;-ms-box-shadow: 0 0 10px #000;box-shadow: 0 0 10px #000;";
	var B_STYLE = "display:none; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%; position: fixed";
	var CLOSE_STYLE = "position: absolute;top: -12.5px;right: -12.5px;display: block;width: 30px;height: 30px;text-indent: -9999px;background: url(./close.png) no-repeat 0 0;";

	// private
	var _jmodal = {
		'target': null,
		'options': {
			'backgroundColor': '#000', // 배경색
			'buttonClose': false, // 닫기 버튼 사용여부
			'opacity': 0.75, // 배경 투명도
			'zIndex': 100, // 모달 레이어번호
			'beforeOpen': null, // 열기 전 이벤트
			'afterOpen': null, // 열기 후 이벤트
			'beforeClose': null, // 닫기 전 이벤트
			'afterClose': null, // 닫기 후 이벤트
			'class': null, // 직접 클래스 추가.
			'width': null // 모달 고정된 크기
		},

		'modal': [],
		'getModel': function() {
			var index = this.modal.length - 1;
			if (0 > index) return null;
			return this.modal[index];
		},

		'config': function(options) {
			var O = $.extend(true, { }, _jmodal.options, options);
			O = $.extend({ }, _jmodal, { 'options': O });
			return O;
		},

		'background': function(object) {
			var options = object.options;

			var index = this.modal.length;

			var B = $('<div style="' + B_STYLE + '"></div>').addClass('syaku-backer').css({
				zIndex: options.zIndex + index,
				background: options.backgroundColor,
				opacity: options.opacity
			});
			
			$('body').append(B);

			return B;
		},

		'content': function(object) {
			var options = object.options;
			var target = object.target;
			var B = object.background;

			var index = this.modal.length;

			if (options.class == null) { 
				target.attr('style', C_STYLE);
			} else {
				target.addClass(options.class);
			}

			var style = {
				'position': 'fixed',
				'zIndex': options.zIndex + 1 + index
			};

			if (options.width != null) style.width = options.width;

			target.addClass('syaku-content').css(style);

			$('body').append(target);
		},

		'buttonClose': function(object) {
			var index = this.modal.length;

			return $('<a href="#" style="' + CLOSE_STYLE + '"></a>').click(function (event) {
				event.preventDefault();
				_jmodal.close();
			}).css({
				'zIndex': object.options.zIndex + 1 + index
			});
		},

		'center': function(object) {
			var target = object.target;

			target.css({
				top: "50%",
				left: "50%",
				marginTop: - (target.outerHeight() / 2),
				marginLeft: - (target.outerWidth() / 2),
			});
		},

		'close': function() {
			var object = this.getModel();
			if (object == null) return;

			if (object.options.beforeClose != null) {
				if (object.options.beforeClose() == false) return;
			}
		
			object.target.hide();
			object.background.remove();
			
			this.modal.pop();
			
			if (object.options.afterClose !== null) object.options.afterClose();
		}
	};

	// class
	function jmodal(object) {
		var $this = this;
		this.version = '1.0';

		// 최종 옵션
		this.options = object.options;
		this.target = object.target;

		this.open = function() {
			_jmodal.modal.push(object);

			if (object.options.beforeOpen != null) {
				if (object.options.beforeOpen() == false) return;
			}

			object.background = _jmodal.background(object);
			
			if (object.options.buttonClose == true) {
				object.target.append( _jmodal.buttonClose(object) );
			}

			_jmodal.content(object);
			_jmodal.center(object);

			object.background.show();
			object.target.show();

			if (object.options.drag == true) object.target.draggable();

			if (object.options.afterOpen != null) object.options.afterOpen();
		}

		this.close = function() {
			_jmodal.close();
		}
	};

	// api support
	$.jmodal = {
		// 기본 옵션 변경
		'config': function(options) {
			$.extend(true, _jmodal.options, options);
		},
		// 기본 옵션 
		'options': _jmodal.options
	}
	
	$.fn.jmodal = function(options) {
		var object = _jmodal.config(options);
		object.target = this;
		object.target.hide();

		var instance = new jmodal( object );

		return instance;
	};

	$(document).on('keydown.syaku-modal', function(event) {
		if (event.keyCode == 27) {
			_jmodal.close();
		}
	});


	
}));
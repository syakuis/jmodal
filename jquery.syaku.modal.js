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

	var C_STYLE = "background: #fff;padding: 15px 30px;-webkit-border-radius: 8px;-moz-border-radius: 8px;-o-border-radius: 8px;-ms-border-radius: 8px;border-radius: 8px;-webkit-box-shadow: 0 0 10px #000;-moz-box-shadow: 0 0 10px #000;-o-box-shadow: 0 0 10px #000;-ms-box-shadow: 0 0 10px #000;box-shadow: 0 0 10px #000;";
	var B_STYLE = "top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%; position: fixed";
	var CLOSE_STYLE = "position: absolute;top: -12.5px;right: -12.5px;display: block;width: 30px;height: 30px;text-indent: -9999px;background: url(./close.png) no-repeat 0 0;";
	var modal_index = 0;

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

		'config': function(options) {
			var O = $.extend(true, { }, _jmodal.options, options);
			O = $.extend({ }, _jmodal, { 'options': O });
			return O;
		},

		'background': function(object) {
			var options = object.options;

			var B = $('<div style="' + B_STYLE + '"></div>').addClass('syaku-backer').css({
				zIndex: options.zIndex + modal_index,
				background: options.backgroundColor,
				opacity: options.opacity
			});
			
			return B;
		},

		'content': function(object) {
			var options = object.options;
			var target = object.target;
			var B = object.background;

			if (options.class == null) { 
				target.attr('style', C_STYLE);
			} else {
				target.addClass(options.class);
			}

			var style = {
				'position': 'fixed',
				'zIndex': options.zIndex + 1 + modal_index
			};

			if (options.width != null) style['width'] = options.width;
			
			target.addClass('syaku-content').css(style);

			return target;
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
			if (this.modal.length == 0) return;
			
			var instance = this.modal[this.modal.length-1];
			if (typeof instance.object.options.beforeClose === 'function') instance.object.options.beforeClose(instance.object);
			instance.modal.hide();
			$('.syaku-backer',instance.modal).remove();
			this.modal.pop();
			if (typeof instance.object.options.afterClose === 'function') instance.object.options.afterClose(instance.object);
		}
	};

	// class
	function jmodal(object) {
		var $this = this;
		this.version = '1.0';

		// 최종 옵션
		this.object = object;
		this.options = object.options;
		//this.target = object.target;

		this.modal = null;

		this.create = function() {


			this.modal = $('<div class="syaku-modal" style="display:none;"></div>');

			$('body').append(this.modal);

			_jmodal.center(object);
		}

		this.open = function() {
			if (typeof object.options.beforeOpen === 'function') object.options.beforeOpen(object)

			modal_index++;
			
			if (object.options.buttonClose == true) {
				object.target.append( 

					$('<a href="#" style="' + CLOSE_STYLE + '"></a>').click(function (event) {
						event.preventDefault();
						$this.close();
					}).css({
						'zIndex': object.options.zIndex + 1 + modal_index
					})
				);
			}

			object.modal.push($this);
			this.modal.append(_jmodal.background(object)).append(_jmodal.content(object));
			this.modal.show();

			// 정확한 위치를 잡기 위해 한번더 센터.
			_jmodal.center(object);

			if (typeof object.options.afterOpen === 'function') object.options.afterOpen(object)
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
		instance.create();

		return instance;
	};

	$(document).on('keydown.syaku-modal', function(event) {
		if (event.keyCode == 27) {
			_jmodal.close();
		}
	});


	
}));
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

	var modal_index = 0;

	// private
	var _jmodal = {
		'target': null,
		'options': {
			'auto': false, // 자동 활성화.
			'padding': '15px', // 모달 여백 null = 사용하지 않음
			'radius': '8px', // 모달 테두리 라운드 null = 사용하지 않음
			'remove': false, // 직접 생성한 대상이 매번 새로 생성될때 제거하기 위함.
			'single': null, // 그룹으로 묶어 해당 모달을 오직 1개만 생성되게 함.
			'esc': true, // esc 닫기 사용여부
			'focus': null, // 열릴때 포커스 활성화
			'backgroundColor': '#000', // 배경색
			'buttonClose': false, // 닫기 버튼 사용여부
			'opacity': 0.75, // 배경 투명도
			'zIndex': 1030, // 모달 레이어번호 (부트스트랩 1030, 셀렉트2: 1050)
			'beforeOpen': null, // 열기 전 이벤트
			'afterOpen': null, // 열기 후 이벤트
			'beforeClose': null, // 닫기 전 이벤트
			'afterClose': null, // 닫기 후 이벤트
			'css': null, // 직접 클래스 추가.
			'width': null, // 모달 고정된 크기
			'height': null // 모달 고정된 크기
		},

		'modal': [],

		'config': function(options) {
			var O = $.extend(true, { }, _jmodal.options, options);
			O = $.extend({ }, _jmodal, { 'options': O });
			return O;
		},

		'background': function(object) {
			var options = object.options;

			var B = $('<div class="background"></div>').addClass('syaku-backer').css({
				'zIndex': options.zIndex + modal_index,
				'background': options.backgroundColor,
				'opacity': options.opacity
			});
			
			return B;
		},

		'content': function(object) {
			var options = object.options;
			var target = object.target;
			var B = object.background;
			var CSS = {};
			if ( object.options.padding != null ) target.css({'padding': object.options.padding});
			if ( object.options.radius != null ) {
				target.css({
					'-webkit-border-radius': object.options.radius, 
					'-moz-border-radius': object.options.radius, 
					'-o-border-radius': object.options.radius, 
					'-ms-border-radius': object.options.radius,
					'border-radius': object.options.radius
				});
			}
			if (options.css != null) {
				target.addClass(options.css);
			}

			target.addClass('content');

			var style = {
				'position': 'fixed',
				'zIndex': options.zIndex + 1 + modal_index
			};

			if (options.width != null) style['width'] = options.width;
			if (options.height != null) style['height'] = options.height;
			
			target.addClass('syaku-content').css(style);
			object.target.show();
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

		'close': function(esc) {
			if (this.modal.length == 0) return;
			
			var instance = this.modal[this.modal.length-1];
			if (esc == true) {
				if (instance.object.options.esc == false ) return;
			}
			
			if (typeof instance.object.options.beforeClose === 'function') instance.object.options.beforeClose(instance.object);

			if (instance.object.options.remove == false ) {
				instance.modal.hide();
				$('.syaku-backer',instance.modal).remove();
				$('.button-close',instance.modal).remove();
			} else {
				instance.modal.remove();
			}

			this.modal.pop();
			if (typeof instance.object.options.afterClose === 'function') instance.object.options.afterClose(instance.object);
		},

		'remove': function() {
			if (this.modal.length == 0) return;
			var instance = this.modal[this.modal.length-1];
			instance.modal.remove();
			this.modal.pop();
		}
	};

	// class
	function jmodal(object) {
		var $this = this;
		this.version = '1.0.2';

		// 최종 옵션
		this.object = object;
		this.options = object.options;
		this.target = object.target;
		this.modal = null;

		this.init = function() {
			this.modal = $('<div class="syaku-modal" style="display:none;"></div>');
			if (object.options.single != null) { 
				$('body .syaku-modal.' + object.options.single).each(function() {
					$(this).remove();
				});
				this.modal.addClass(object.options.single);
			}
			$('body').append(this.modal);
			_jmodal.center(object);
		}

		this.open = function() {
			if (this.modal == null) this.init();
			if ( $('.syaku-backer', this.modal).length > 0 ) return;
			
			if (typeof object.options.beforeOpen === 'function') object.options.beforeOpen(object);
			
			modal_index++;
			
			if (object.options.buttonClose == true) {
				object.target.append( 

					$('<a href="#" class="button-close"></a>').click(function (event) {
						event.preventDefault();
						$this.close();
					}).css({
						'zIndex': object.options.zIndex + 1 + modal_index
					})
				);
			}

			object.modal.push($this);
			this.modal.append(_jmodal.background($this)).append(_jmodal.content(object));
			this.modal.show();

			// 정확한 위치를 잡기 위해 한번더 센터.
			_jmodal.center(object);
			
			if (object.options.focus != null) $(object.options.focus,$this.modal).focus();
			
			if (typeof object.options.afterOpen === 'function') object.options.afterOpen(object)
		}

		this.close = function() {
			_jmodal.close();
		}

		if (object.options.auto == true) this.open();
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
			_jmodal.close(true);
		}
	});


	
}));
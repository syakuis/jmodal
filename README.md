## jmodal
jmodal 은 jQuery Modal 이며, jQuery 플러그인 입니다.

> Github: https://github.com/syakuis/jmodal  
데모: http://syakuis.github.io/demo/jmodal/demo.html

### 지원
> 아주 심플한 모달을 지원합니다.
모달을 열고 닫는 method 를 지원합니다.
여러개의 모달을 순차적으로 열고 닫을 수 있습니다.
확장성을 고려하여 개발되었습니다.

### 설치
```
bower install syaku-jmodal
```

```html
<link href="./dist/jquery.syaku.modal.min.css" rel="stylesheet">
<script src="./dist/jquery.syaku.modal.min.js" /></script>
```

### 실행
```javascript
var modal = $('<div>모달</div>').jmodal();
```

### 열기와 닫기
```javascript
modal.open();

modal.close();
```

### 기본 옵션
```javascript
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
```
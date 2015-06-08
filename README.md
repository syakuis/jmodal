## jmodal
jmodal 은 jQuery Modal 이며, jQuery 플러그인 입니다.

> 데모: http://syakuis.github.io/demo/jmodal/demo.html

### 지원
> 아주 심플한 모달을 지원합니다.
모달을 열고 닫는 method 를 지원합니다.
여러개의 모달을 순차적으로 열고 닫을 수 있습니다.
확장성을 고려하여 개발되었습니다.

### 설치
```
bower install syaku-jmodal
```

```
<script src="./jquery.syaku.modal.js" /></script>
```

### 실행
```
var modal = $('<div>모달</div>').jmodal();
```

### 열기와 닫기
```
modal.open();
```
```
modal.close();
```

### 기본 옵션
```
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
```
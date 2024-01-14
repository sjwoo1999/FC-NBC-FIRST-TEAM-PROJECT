1. mainToDetail에서 compare & pull request 버튼을 누르면, main 브랜치에 병합하기 위한 절차를 시작하는 것입니다. 이 절차를 통해, 변경 사항을 검토하고 승인받을 수 있습니다.

2. main.js에서 window.location.href = "detail_index.html"로 페이지 이동할 때, index를 매개변수로 던져주고 detail_main.js에서 매개변수를 받아서 해당 index에 해당하는 영화 정보를 찾아 detail_main.js에 나타날 수 있도록 한다.

3.

웹 개발을 하다 보면, 아무리 간단한 애플리케이션이라고 할지라도, 데이터를 어딘가에 저장해야 할 일이 생긴다.
보통 이럴 때 데이터베이스 서버나 클라우드 플랫폼에 저장하는 경우가 많을 것이다.
하지만 저장해야 하는 데이터가 중요하지 않거나 유실돼도 무방한 데이터라면 서버 단에 데이터를 저장하는 것이 낭비일 수 있다.
클라이언트 단, 즉 브라우저 상에 데이터를 저장할 수 있는 기술인 로컬/세션 스토리지에 대해서 알아보겠다.

1) 웹 스토리지

브라우저가 제공하는 스토리지 많은데 .. local / session

local - session

공통점 : key-value pair로 구성된 비교적 간단한 데이터
차이점 : 저장한 데이터가 어떤 범위에서 얼마나 오래 보존되느냐에 있다.

session Storage : 웹 페이지의 세션이 끝날 때 저장된 데이터가 지워지는 반면
local Storage : 웹 페이지의 세션이 끝나도 데이터가 지워지지 않는다.


session Storage : 브라우저에서 같은 웹 사이트를 열어 탭이나 창에 띄우면,
여러 개의 session storage의 데이터가 서로 격리되어 저장되며,
각 탭이 닫힐 때 저장해둔 데이터도 함께 소멸한다.

local Storage : 여러 탭이나 창 간에 서로 데이터가 공유되며,
탭이나 창을 닫아도 데이터는 브라우저에 그대로 남게 된다.

2) 웹 스토리지 기본 API

Web Storage : key-value로 되어있는 데이터를 저장할 수 있다.

hash-table의 자료구조를 생각하시면 이해가 쉬우실 것 같다.

localStorage.setItem('키', '값')

localStorage.getItem('키')

localStorage.removeItem('키')

localStorage.length

localStorage.clear()

3) 주의 사항 : 오직 문자열 데이터만!

웹 스토리지의 성질 .. 숫자형 데이터로 저장해도 가져올 땐 문자열로 가져오게 된다.

객체형 데이터를 저장할 때 큰 낭패를 볼 수도 있다..

localStorage.setItem('obj', {a: 1, b: 2})

localStorage.getItem('obj')
'[object Object]'

이러한 문제가 발생하는 이유?
웹 스토리지는 문자열 데이터 밖에 저장할 수밖에 없기 때문이다.
다른 데이터 타입의 값을 저장하려고 해도 웹 스토리가 자동으로 문자열로 변환해준다.

이러한 문제를 피하기 위해서 많이 사용하는 방식이,
json 파일 형태로 데이터를 읽고 쓰는 것이다.

localStorage.setItem('json', JSON.stringify({a: 1, b: 2}))

localStorage.getItem('json')
'{"a":1,"b":2}'

JSON.parse(localStorage.getItem('json'))
{a: 1, b: 2}
a: 1
b: 2
[ [Prototype] ] : Object

이처럼 localStorage에 쓸 데이터를 json 형태로 직렬화하고,
읽은 데이터를 json 형태로 역직렬화 해주면 원본형 데이터를 그대로 얻을 수 있다.

배열형의 데이터를 로컬 스토리지에 저장할 때도 동일한 방법으로 문제를 예방할 수 있다.

localStorage.setItem('nums', JSON.stringify([1, 2, 3])

JSON.parse(localStorage.getItem('nums'))
(3) [1, 2, 3]
0: 1
1: 2
2: 3
length: 3
[ [Prototype] ] : Array(0)

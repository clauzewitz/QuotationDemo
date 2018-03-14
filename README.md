# Installation
## Backend
아래의 명령어를 실행하여 설치한다.
```
cd backend
npm install
```

## Frontend
아래의 명령어를 실행하여 설치한다.
```
cd frontend
npm install
```

# Test
## Backend
아래의 명령어를 실행하여 확인한다.
```
cd backend
npm test
```

## Frontend
아래의 명령어를 실행하여 확인한다.(*빌드 시에 자동으로 테스트를 진행한다.*)
```
cd frontend
ng test --single-run
```

# build
## Frontend
1. MAC인 경우 아래의 명령어를 실행한다.
```
sh frontend_build.sh
```
2. Windows인 경우 아래의 명령어를 실행한다.
```
frontend_build.bat
```

# Running server
1. MAC인 경우 아래의 명령어를 실행한다.
```
sh serve.sh
```
2. Windows인 경우 아래의 명령어를 실행한다.
```
serve.bat
```
3. 브라우저에서 아래의 URL로 접속한다.
```
http://localhost:3100
```

# Logic
## Backend
### 매수/매도 로직
1. 1초에 하나씩 데이터가 입력된 후 현재까지 입력된 데이터 전체 대해서 **매수/매도**를 진행한다.
2. 데이터들의 체결 우선순위는 매수가와 매도가가 **동일**한 경우를 최우선 순위로 정한다.
3. 해당 데이터가 **매수**인 경우 우선적으로 매도가가 동일한 데이터를 찾은 후 체결하고 매수 수량이 남은 경우 **현재 데이터의 매수가보다 매도가가 낮은 데이터**를 찾아 체결하는 것을 반복한다.
4. 해당 데이터가 **매도**인 경우 우선적으로 매수가가 동일한 데이터를 찾은 후 체결하고 매도 수량이 남은 경우 **현재 데이터의 매도가보다 매수가가 높은 데이터**를 찾아 체결하는 것을 반복한다.
5. 모든 **매수/매도**가 체결 시에는 Frontend로 체결가를 전송한다.

## Frontend
### 현황 표시 로직
1. Backend에서 보내주는 데이터를 가공없이 그대로 표시한다.
2. 단, 데이터의 정렬은 항상 최신순으로 정렬한다.

# Using Library list
## Backend
1. NodeJS
2. express
3. websocket(ws)

## Frontend
1. Angular

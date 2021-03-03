# graph-todo-server

## Dependency
1. MongoDB Database & Database User
2. Google Oauth Service (CleintId & ClientSecret)

## How to use

0. config/credentials.template.js 파일의 이름을 config/credentials.js 으로 변경
1. 파일에 MongoDB 의 connectionUrl, dbuser, dbpassword 입력
2. Google Project 생성
3. API/Services -> Credentials 탭에서 Oauth 2.0 ClientId/ClientSecret 발급
4. 승인된 Redirection URI 에 'http://localhost:5000/auth/google/callback' 입력
5. 파일에 GoogleClientId, GoogleClientSecret 입력

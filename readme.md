회원가입 / 로그인 구현중..

유저가 이미 있으면,

- 쿠키에 담아 클라이언트에 보내준다
  - 클라이언트는 응답메시지와 document.cookie를 확인해서 login 여부를 판정한다
    - 쿠키에 user 정보가 제대로 잘 담겨있다면,
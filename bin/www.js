// 어플리케이션 모듈을 가져와서 서버 구동

// test code의 `request(app)` === `app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });`
// 이중으로 서버를 실행하는 때문에 index.js에서 app.listen ~ 을 지웠다
// npm start를 입력하면 서버를 실행하는 명령어가 존재하지 않기 때문에 오류가 발생한다
// 서버를 실행하는 명령어를 bin/www.js에 작성하고 start script를 수정한다

const app = require("../index");
const syncDb = require("./sync-db");
const port = 3000;

syncDb().then((_) => {
  console.log("Sync Database");
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});

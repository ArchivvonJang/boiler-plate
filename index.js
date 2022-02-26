//백앤드 시작점
const express = require('express') //express module을 가져온다
const app = express() //새로운 express앱을 생성하고
const port = 5000 //포트생성
const mongo_url = 'mongodb+srv://suyeon:1230@boilerplate.0jrnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

 //몽구스를 활용해 몽고DB 연결
const mongoose = require('mongoose');

mongoose
  .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected....')) //연결확인
  .catch(e => console.error(e));   

app.get('/', (req, res) => { // root 디렉토리에 오면 포트에 해당 문자열 실행
  res.send('Hello World! 안녕하세요!')
}) 

app.listen(port, () => {
  console.log(`Example app listening on port ${port} `) 
})
//Node.js 를 통해 실행중인 모든 서버를 종료 : taskkill /IM node.exe /F
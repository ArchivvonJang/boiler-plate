//백앤드 시작점
const express = require('express') //express module을 가져온다
const app = express() //새로운 express앱을 생성하고
const port = 5000 //포트생성

const bodyParser = require('body-parser');  //body parser가 클라이언트로부터 오는 정보를 서버에서 분석해서 가져올 수 있게 해준다.

const config = require('./config/key');

// User모델을 가져온다.
const { User } = require("./models/User");

//application/x-www-form-rulenced로 된 데이터를 분석해서 가져올 수 있게 해준다. 
app.use(bodyParser.urlencoded({extended : true})); 

//application/json 으로 된 것을 가져온다.
app.use(bodyParser.json());

//몽구스를 활용해 몽고DB 연결
const mongoose = require('mongoose');

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected....')) 
  .catch(e => console.error(e));   


//Test Route
app.get('/', (req, res) => { // root 디렉토리에 오면 포트에 해당 문자열 실행
  res.send('Hello World! 안녕하세요!!!!')
}) 

//Regsiter Route
app.post('/register', (req, res) => {

  //회원가입할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body)

  //save 전에 비밀번호 암호화

  user.save((err, userInfo) => {
    if(err) return res.json({ success : false, err})
    return res.status(200).json({
      success : true
    })
  }) 
})

//Login Route
app.post('/login', (req,res)=>{

  //1. 요청된 이메일을 데이터베이스에서 있는지 찾는다.

  //2. 데이터베이스에서요청한 eamil이 있다면 비밀번호가 같은지 확인

  //3. 비밀번호까지 같다면 Token 생성
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port} `) 
})

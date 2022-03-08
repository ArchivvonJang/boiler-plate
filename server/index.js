//백앤드 시작점
const express = require('express') //express module을 가져온다
const app = express() //새로운 express앱을 생성하고


const bodyParser = require('body-parser');  //body parser가 클라이언트로부터 오는 정보를 서버에서 분석해서 가져올 수 있게 해준다.
const cookieParser = require('cookie-parser'); //토큰을 쿠키에 저장하기 위해 불러온다. 
const config = require('./config/key');

const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

//application/x-www-form-rulenced로 된 데이터를 분석해서 가져올 수 있게 해준다. 
app.use(bodyParser.urlencoded({extended : true})); 

//application/json 으로 된 것을 가져온다.
app.use(bodyParser.json());
app.use(cookieParser());

//몽구스를 활용해 몽고DB 연결
const mongoose = require('mongoose');
const req = require('express/lib/request');

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected....')) 
  .catch(e => console.error(e));   


//Test Route
app.get('/', (req, res) => { // root 디렉토리에 오면 포트에 해당 문자열 실행
  res.send('Hello World! 안녕하세요!!!!')
}) 

app.get('/api/hello', (req,res)=>{
  res.send("안녕하세요~")
})


//Regsiter Route
app.post('/api/users/register', (req, res) => {

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
app.post('/api/users/login', (req,res)=>{

  //1. 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({email : req.body.email} , (err, user)=>{

    console.log('user', user)

    if(!user){
      return res.json({
        loginSuccess : false,
        message : "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

     //2. 요청한 eamil이 데이터베이스에 있다면 비밀번호가 같은지 확인
     user.comparePassword( req.body.password, (err, isMatch)=>{
        
       if(!isMatch) return res.json({loginSuccess : false, message : "비밀번호가 틀렸습니다."})

       //3. 비밀번호까지 같다면 Token 생성 - jsonWebToken 라이브러리 사용 https://www.npmjs.com/package/jsonwebtoken
       user.generateToken((err, user) => {
        if(err) return req.status(400).send(err)

        //Token을 저장한다. 어디에? Cookies or Local Storage, Session...등 등
         res.cookie('x_auth', user.token)
          .status(200) //성공시
          .json({
            loginSuccess : true,
            userId : user._id
          }) 
       })
     })
  })
})

//Auth Route
app.get('/api/users/auth', auth, (req,res =>{
//1.Cookie에 저장된 Token을 Server에서 가져와서 복호화(decode)를 한다. 
//2.복호화 후 구해진 User ID를 이용하여 데이터베이스 User Collection에서 사용자를 찾은 후, 
//   Cookie에서 받아온 Token이 사용자도 갖고 있는지 확인한다.

  //여기까지 미들웨어를 통과해왔다 ==> Authentication == true
  res.status(200),json({
    _id : req.user._id,
    isAdmin : req.user.role === 0 ? false : true,
    isAuth : true,
    email : req.user.email,
    name : req.user.name,
    lastname : req.user.lastname,
    role : req.user.role,
    image : req.user.image
  })
}))

//Logout Route
app.get('/api/users/logout', auth, (req, res)=>{

  User.findOneAndUpdate({_id : req.user._id}, { token: "" }, (err, user) => {
      if(err) return res.json({ success : false, err});
      return res.status(200).send({
        success : true
      })
    })
})




const port = 5000 //포트생성
//connect and port number check 
app.listen(port, () => {
  console.log(`Example app listening on port ${port} `) 
})

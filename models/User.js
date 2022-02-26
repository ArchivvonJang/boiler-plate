const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; //10자리인 salt를 만들어서 비밀번호를 암호화한다.
const jwt = require('jsonwebtoken');

// 스키마 생성
const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    email : {
        type : String,
        trim : true, //공백제거
        unique : 1
    },
    password : {
        type : String,
        minlength : 5
    },
    lastname : {
        type : String,
        maxlength : 50
    },
    role : {
        type : Number,
        default : 0 //일반유저, 1 : 관리자
    },
    image : String,
    token : {
        type : String
    },
    tokenExp : { //토큰 유효기간
        type : Number
    }
}) 

// 'save' 전에 function 실행
userSchema.pre('save', function( next ){

    var user = this; //위에서 생성한 스키마를 가져온다.

    //비밀번호를 변경했을 때만, 암호화하도록 설정한다. (그렇지 않으면 모든 변경이 일어날 때마다 비밀번호 암호화 처리가 이루어진다.)
    if(user.isModified('password')) {
        // 비밀번호를 암호화 시킨다. https://www.npmjs.com/package/bcrypt
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err) //error가 발생하면 index.js의 save부분으로 보내버린다.
            
            //salt를 제대로 생성했다면, 
            //            plain password , salt,           암호화된 비밀번호
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }else {
        //비밀번호 외 다른 변경을 할 때
        next()
    }

})

userSchema.methods.comparePassword = function(plainPassword, callback){

    //plainPassword 123456789 와 암호화된 비밀번호 $2b$10$phAhFQ9PSWPULRUwmNWbVOxvFtN7uyMt1Hht3rRB/7uK4zaXEnAV2 비교하려면
    //plainPassword도 암호화해서 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return callback(err);   //false
           callback(null, isMatch) //true
    })
}


userSchema.methods.generateToken = function(callback){

    var user = this;

    //jsonwebtoken을 이용해서 token을 생성한다.
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    //user._id + 'sercretToken' = token -> 'secretToken'를 이용해서 -> user._id를 찾는다.

    user.token = token
    user.save(function(err,user){
        if(err) return callback(err);
        callback(null, user)
    })
}

userSchema.statics.findByToken = function(token, callback){
    
    var user = this;

    //토큰을 복호화 decode 한다.
    // verify a token symmetric                    decoded userid
    jwt.verify(token, 'secretToken', function(err, decoded){    
        //유저 아이디를 이용해서 유저를 찾은 후, 클라이언트에서 가져온 Token과 DB에 보관된 Token이 일치하는지 확인
        user.findOne({"_id" : jwt.decoded ,"token" : token}, function(err, user){
            if(err) return callback(err);
            callback(null, user); //에러가 없다면 유저 정보를 전달한다.
        })
    })
}

const User = mongoose.model('User', userSchema)// 이 스키마들을 모델로 감싸준다.

module.exports = { User } //다른 곳에서도 쓸 수 있게 처리해준다.
const mongoose = require('mongoose');

// 스키마 생성
const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    email : {
        type : String,
        trim : trim, //공백제거
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
        default : 0
    },
    image : String,
    token : {
        type : String
    },
    tokenExp : { //토큰 유효기간
        type : Number
    }
}) 

const User = mongoose.model('User', userSchema)// 이 스키마들을 모델로 감싸준다.

module.exports = { User } //다른 곳에서도 쓸 수 있게 처리해준다.
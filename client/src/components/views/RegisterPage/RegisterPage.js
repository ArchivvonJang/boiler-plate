import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from '../../../_actions/user_action' 
import Auth from './hoc/auth';
import {withRouter} from 'react-router-dom';

function RegisterPage(props) {

     //redux dispatch 추가
     const dispatch = useDispatch();
    
     //state 추가
     const [Email, setEmail] = useState("")
     const [Password, setPassword] = useState("")
     const [Name, setName] = useState("")
     const [ConfirmPassword, setConfirmPassword] = useState("")
 
     const onEmailHandler = (event) => {
         setEmail(event.currentTarget.value)
     }
     const onNameHandler = (event) => {
         setName(event.currentTarget.value)
     }
     const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
     const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    

     const onSubmitHandler = (event) => {
         event.preventDefault(); //page 버튼클릭시 발생하는 refresh를 방지해준다.

         //비밀번호와 비밀번호 확인 check
         if(Password !== ConfirmPassword){
             return alert('비밀번호와 비밀번호 확인은 같아야합니다.');
         }
 
         let body = {
             email : Email,
             name : Name,
             passowrd : Password
         }
         
         //redux로 state 넘기기 : page -> user_action -> type.js -> user_reduce
 
         dispatch(registerUser(body))
         .then(response => {
             //회원가입 성공시 랜딩페이지로 이동
             if(response.payload.loginSuccess){
                 props.history.push('/login')
             }else{
                 alert('Failed to sign up')
             }
         })
 

        }
        
    return( 
        <div style={{display:'flex', justifyContent: 'center', alignItems:'center', width: '100%', height: '100vh'
        }}>
            <form style={{ display:'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />


                <br/>
                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    )

}

//export default withRouter(RegisterPage)
export default Auth(RegisterPage, false);
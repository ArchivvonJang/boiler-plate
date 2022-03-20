import React, { useState } from "react";
//import Axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from '../../../_actions/user_action' 

function LoginPage(props){
    //redux dispatch 추가
    const dispatch = useDispatch();
    
    //state 추가
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault(); //page 버튼클릭시 발생하는 refresh를 방지해준다.

        //console.log('Email', Email);
        //console.log('Password', Password);

        let body = {
            email : Email,
            passowrd : Password
        }


        /* Axios.post('/api/user/login', body)
            .then(response=>{
            })  여기서 진행되는 request를 user_action.js에서 */

        //Redux dispatch를 이용해서 Action을 취한다.
        //<Action> -> <Reducer> -> <Store> -> Suscribe -> <Rearct Component> -> Dispatch(action) -> <Action>
                //Action name == loginUser
        dispatch(loginUser(body))
        .then(response => {
            //로그인 성공시 랜딩페이지로 이동
            if(response.payload.loginSuccess){
                props.first.history.push('/')
            }else{
                alert('Error')
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
                
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <br/>
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
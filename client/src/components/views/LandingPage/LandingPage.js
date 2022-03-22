import React, { useEffect } from "react";
import axios from 'axios';
//import { response } from "express";
import Auth from './hoc/auth';
import {withRouter} from 'react-router-dom';

function LandingPage(props){
    //LandingPage에 들어오자마자 실행 서버에 /api/hello get으로 보낸 후 받은 응답을 화면에 보여줌
    useEffect(()=>{
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    },[])

    //logout button function
    const onClickHandler = () =>{
        axios.get('/api/users/logout')
        .then(response =>{
            
            //console.log(response.data)

            if(response.data.success){
                props.history.push('/login')
            }else{
                alert('로그아웃이 실패하였습니다.')
            }

        })
    }

    return(
        <div style={{display:'flex', justifyContent: 'center', alignItems:'center', width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>
            <br/>
            <button onClick={onClickHandler}>
                Logout
            </button>
        </div>
    )
}

export default Auth(LandingPage, false);
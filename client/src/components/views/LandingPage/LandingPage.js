import React, { useEffect } from "react";
import axios from 'axios';
import { response } from "express";

function LandingPage(){
    //LandingPage에 들어오자마자 실행 서버에 /api/hello get으로 보낸 후 받은 응답을 화면에 보여줌
    useEffect(()=>{
        axios.get('http://localhost:5000/api/hello')
        .then(response => console.log(response.data))
    },[])




    return(
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
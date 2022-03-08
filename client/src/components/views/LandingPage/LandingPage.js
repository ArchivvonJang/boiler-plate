import React, { useEffect } from "react";
import axios from 'axios';


function LandingPage(){
    //LandingPage에 들어오자마자 실행 서버에 /api/hello get으로 보낸 후 받은 응답을 화면에 보여줌
    useEffect(()=>{
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    },[])




    return(
        <div style={{display:'flex', justifyContent: 'center', alignItems:'center', width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>
        </div>
    )
}

export default LandingPage
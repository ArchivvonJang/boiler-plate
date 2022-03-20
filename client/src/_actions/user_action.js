import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';

//email, password를 dataToSubmit 파라미터를 통해 받는다.
export function loginUser(dataToSubmit){

    const request = axios.post('/api/users/login', dataToSubmit)
    .then(response => 
        response.data //서버에서 받은 데이터를 request에 저장한 다음, reducer로 return 
    )

    return{
        type : LOGIN_USER,
        payload : request
    }
}

export function registerUser(dataToSubmit){

    const request = axios.post('/api/users/register', dataToSubmit)
    .then(response => 
        response.data 
    )

    return{
        type : REGISTER_USER,
        payload : request
    }
}
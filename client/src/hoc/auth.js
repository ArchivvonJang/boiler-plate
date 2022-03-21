import { Axios } from 'axios';
import React from 'react';
import {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action'

                        //LandingPage, 하단 참고, true면 admin만 가능하도록, 기본값은 null
export default function (SpecificComponent, option, adminRoute = null){

    // ---- option ----
    // null  -> 아무나 출입이 가능한 페이지
    // true ->  로그인한 유저만 출입이 가능한 페이지
    // false -> 로그인한 유저는 출입 불가능한 페이지


    function AuthenticationCheck(props){

        const dispatch = useDispatch();

        useEffect(() => {
        
            dispatch(auth()).then(response => {
                console.log(response);
            })

            Axios.get('/api/users/auth')


        },[])
    }
    return AuthenticationCheck
}
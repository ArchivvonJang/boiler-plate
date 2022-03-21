import {
    LOGIN_USER
    ,REGISTER_USER
    ,AUTH_USER
} from '../_actions/types';


//reducer : 이전과 현재 state를 nextState로 넘겨준다
// eslint-disable-next-line import/no-anonymous-default-export
export default function(state={}, action){
    //다른 type이 올 때마다 다른 처리를 해주기 위해 switch
    switch (action.type) {
        case LOGIN_USER:
            return{...state, loginSuccess : action.payload}//spreadoperator 
            //break;
    
        case REGISTER_USER:
            return{...state, register : action.payload}
            //break;

        case AUTH_USER:
            return{...state, userData : action.payload} //userData - authroute에서 얻어낸 유저 정보가 reducer의 payload에 들어있기 때문.
            //break;

        default:
            return state;
    }
}
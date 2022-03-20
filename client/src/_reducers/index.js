import { combineReducers } from "redux";
import user from './user_reducer';


const rootReducer = combineReducers({
    user
})

export default rootReducer; 
//export default 로 기본 내보내기 하고있기 때문에 다른 파일에서 가져올 때는 꼭 rootReducer 라는 이름이 아니라 다른 이름으로 바꿔서 가져올 수 있다.
//'default' 키워드가 없이 내보냈다면 가져올 때는 import { rootReducer } from './_reducers' 처럼 중괄호로 감싸서 export 할 때의 이름을 그대로 가져와야 한다.
//참고로 하나의 파일에서 내보내기를 할때 export default 는 한번만 쓸 수 있고, export 로 정해진 이름으로 내보낼 때는 횟수 제한 없이 내보낼 수 있다.
// 로그인에 성공한 대상만 통과시키는 도구
import { useAtomValue} from "jotai";
import { loginCompleteState, loginState } from "../../utils/jotai";
import {Navigate} from "react-router-dom";

export default function Private({children}){
    const loginComplete = useAtomValue(loginCompleteState);
    const isLogin = useAtomValue(loginState);
    if (loginComplete === false){
        return <h1>로딩 중...</h1>
    }
    
    return isLogin === true? children: <Navigate to={"/account/AccountLogin"}/>
}
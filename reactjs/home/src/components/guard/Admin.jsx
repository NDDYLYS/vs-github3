// 로그인에 성공한 대상만 통과시키는 도구
import { useAtomValue} from "jotai";
import { adminState, loginState } from "../../utils/jotai";
import {Navigate} from "react-router-dom";

export default function Admin({children}){
    const isAdmin = useAtomValue(adminState);
    const isLogin = useAtomValue(loginState);
    
    return isLogin === true && isAdmin === true ? children: <Navigate to={"/"}/>
}
import { useAtom } from "jotai";
import Jumbotron from "../templates/Jumbotron";
import { loginIdState } from "../../utils/jotai";
import { Link, Outlet } from "react-router-dom";


export default function AccountInfomation() {
    //state
    const [loginId, setLoginId] = useAtom(loginIdState);

    //render
    return (<>
        <Jumbotron subject={`${loginId} 님의 정보`} detail="내 활동 내역을 확인하세요" />

        <div className="row mt-4">
            <div className="col">
                <Link className="btn btn-secondary me-2" to="/account/info">내정보</Link>
                <Link className="btn btn-secondary me-2" to="/account/info/pay">결제내역</Link>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col">
                <Outlet/>
            </div>
        </div>

    </>)
}
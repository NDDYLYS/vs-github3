import { Link } from "react-router-dom";
import Jumbotron from "../templates/Jumbotron";

export default function AccountJoinFinish() {

    //render
    return (<>
        <Jumbotron subject="account-joinFinish" detail="회원가입 완료"></Jumbotron>

        <div className="row mt-4">
            <div className="col fs-2">
                <Link to="/account/Login">Login</Link>하기
            </div>
        </div>
    </>)
}
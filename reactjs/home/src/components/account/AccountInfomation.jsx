import { Link } from "react-router-dom";
import Jumbotron from "../templates/jumbotron";


export default function AccountInfomation() {
    return (
        <>
            <Jumbotron subject="AccountInfomation" detail="AccountInfomation AccountInfomation AccountInfomation"></Jumbotron>

            <div className="row mt-4">
                <div className="col">
                    <Link className="btn btn-lg btn-primary" to="#">내정보</Link>
                    <Link className="btn btn-lg btn-primary" to="/account/info/pay">결제내역</Link>
                </div>
            </div>

        </>
    );
}
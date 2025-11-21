import { Link } from "react-router-dom";
import Jumbotron from "../templates/Jumbotron";
import { useCallback, useState } from "react";
import axios from "axios";

export default function AccountLogin() {

    const [account, setAccount] = useState({
        accountId: "",
        accountPw: ""
    });

    const changeStrValue = useCallback(e => {
        const { name, value } = e.target;
        setAccount(prev => ({ ...prev, [name]: value }));
    });

    const [result, setResult] = useState(null);

    const login = useCallback(async ()=>{
        const {data} = await axios.post("/account/login", account);
        console.log("data", data);
        setResult(data);
    }, [account]);

    //render
    return (
        <>

            <Jumbotron subject="account-login" detail="로그인"></Jumbotron>

            <div className="row mt-4">
                <label className="col-sm-1 offset-sm-4 col-form-label">
                    아이디
                </label>
                <div className="col-sm-3">
                    <input type="text" className="form-control" name="accountId" onClick={changeStrValue}/>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-1 offset-sm-4 col-form-label">
                    비밀번호
                </label>
                <div className="col-sm-3">
                    <input type="password" className="form-control" name="accountPw" onClick={changeStrValue} />
                </div>
            </div>

            { result === false && (
            <div className="row mt-4">
                <div className="col text-center text-danger">
                    정보가 올바르지 않습니다.
                </div>
            </div>
            )}

            <div className="row mt-5">
                <div className="col text-center">
                    <button type="button" className="btn btn-lg btn-success" onClick={login}>
                        <span>로그인</span>
                    </button>
                </div>
            </div>
        </>)
}
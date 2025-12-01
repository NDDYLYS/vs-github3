import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { loginIdState, loginLevelState, accessTokenState, refreshTokenState } from "../../utils/jotai";
import Jumbotron from "../templates/Jumbotron";


export default function AccountLogin() {

    const navigate = useNavigate();

    const [loginId, setLoginId] = useAtom(loginIdState)
    const [loginLevel, setLoginLevel] = useAtom(loginLevelState);
    const [accessToken, setAccessToken] = useAtom(accessTokenState);
    const [refreshToken, setRefreshToken] = useAtom(refreshTokenState);

    const [account, setAccount] = useState({
        accountId: "",
        accountPw: ""
    });

    const changeStrValue = useCallback(e => {
        const { name, value } = e.target;
        setAccount(prev => ({ ...prev, [name]: value }));
    });

    const [result, setResult] = useState(null);

    const login = useCallback(async () => {
        try {
            const { data } = await axios.post("/account/login", account);
            setResult(true);

            setLoginId(data.loginId);
            setLoginLevel(data.loginLevel);
            axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;

            // 새로고침에 대응
            // jotai state 간단하지만 보안상 문제 존재

            // 서버에서 서버전용 쿠키 설정

            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);

            navigate("/");
        }
        catch (err) {
            setResult(false);
        }
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
                    <input type="text" className="form-control" name="accountId" onChange={changeStrValue} />
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-1 offset-sm-4 col-form-label">
                    비밀번호
                </label>
                <div className="col-sm-3">
                    <input type="password" className="form-control" name="accountPw" onChange={changeStrValue} />
                </div>
            </div>

            {result === false && (
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
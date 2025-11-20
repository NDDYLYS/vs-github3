import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Jumbotron from "../templates/Jumbotron";
import axios from "axios";
import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa6";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";

export default function AccountJoin() {

    const [account, setAccount] = useState({
        accountId: "",
        accountPw: "",
        accountPw2: "",
        accountNickname: "",
        accountEmail: "",
        accountBirth: "",
        accountContact: "",
        accountPost: "",
        accountAddress1: "",
        accountAddress2: ""
    });

    const [accountClass, setAccountClass] = useState({
        accountId: "",
        accountPw: "",
        accountPw2: "",
        accountNickname: "",
        accountEmail: "",
        accountBirth: "",
        accountContact: "",
        accountPost: "",
        accountAddress1: "",
        accountAddress2: ""
    });

    const [accountIdFeedback, setAccountIdFeedback] = useState("");
    const [accountNicknameFeedback, setAccountNicknameFeedback] = useState("");

    const [showPassword, setShowPassword] = useState(true);

    const changeStrValue = useCallback(e => {
        const { name, value } = e.target;
        setAccount(prev => ({ ...prev, [name]: value }));
    }, [account]);

    const checkAccountId = useCallback(async (e) => {
        // 형식 > 중복 > 결과
        const regex = /^[a-z][a-z0-9]{4,19}$/;
        const valid = regex.test(account.accountId);
        if (valid) {
            const { data } = await axios.get(`/account/accountId/${account.accountId}`);
            if (data === true) {
                setAccountClass(prev => ({ ...prev, accountId: "is-valid" }));
            }
            else {
                setAccountClass(prev => ({ ...prev, accountId: "is-invalid" }));
                setAccountIdFeedback("아이디가 중복되었습니다.");
            }
        } else {
            setAccountClass(prev => ({ ...prev, accountId: "is-invalid" }));
            setAccountIdFeedback("아이디가 부적절합니다.");
        }
    }, [account]);

    const checkAccountNickname = useCallback(async (e) => {
        // 형식 > 중복 > 결과
        const regex = /^[가-힣0-9]{2,10}$/;
        const valid = regex.test(account.accountNickname);
        if (valid) {
            const { data } = await axios.get(`/account/accountNickname/${account.accountNickname}`);
            if (data === true) {
                setAccountClass(prev => ({ ...prev, accountNickname: "is-valid" }));
            }
            else {
                setAccountClass(prev => ({ ...prev, accountNickname: "is-invalid" }));
                setAccountNicknameFeedback("닉네임이 중복되었습니다.");
            }
        } else {
            setAccountClass(prev => ({ ...prev, accountNickname: "is-invalid" }));
            setAccountNicknameFeedback("닉네임이 부적절합니다.");
        }
    }, [account]);

    const [accountPwFeedback, setAccountPwFeedback] = useState("");

    const checkAccountPw = useCallback((e) => {

        const regex = /^(?=.*?[A-Z]+)(?=.*?[a-z]+)(?=.*?[0-9]+)(?=.*?[!@#$]+)[A-Za-z0-9!@#$]{8,16}$/;
        const valid = regex.test(account.accountPw);
        // if (valid === true){
        //     setAccountClass(prev=>({...prev, accountPw : "is-valid"}));
        // }
        // else {
        //     setAccountClass(prev=>({...prev, accountPw : "is-invalid"}));
        // }

        if (account.accountPw.length === 0) {
            setAccountClass(prev => ({ ...prev, accountPw2: "is-invalid" }));
            setAccountPwFeedback("비밀번호를 입력하세요.");
        }
        else {
            const valid2 = account.accountPw === account.accountPw2;
            setAccountClass(prev => ({ ...prev, accountPw2: valid2 ? "is-valid" : "is-invalid" }))
            if (valid2 === false)
                setAccountPwFeedback("비밀번호가 일치하지 않습니다.");
        }

    }, [account, accountClass]);

    const [sending, setSending] = useState(null);

    const sendCertEmail = useCallback(async () => {
        if (account.accountEmail.length === 0)
            return;

        setSending(true);
        const response = await axios.post("/cert/send", { certEmail: account.accountEmail });
        setSending(false);
    }, [account]);


    //render
    return (<>
        <Jumbotron subject="account-join" detail="회원가입을 구현한다" />

        <div className="row mt-4">
            <div className="col-sm-3 col-form-label">
                아이디 *
            </div>
            <div className="col-sm-9">
                <input type="text" name="accountId" value={account.accountId} onChange={changeStrValue}
                    className={`form-control ${accountClass.accountId}`} onBlur={checkAccountId} />
                <div className="valid-feedback">적당한 아이디입니다.</div>
                <div className="invalid-feedback">{accountIdFeedback}</div>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3 col-form-label">
                비밀번호 *
                {showPassword === true ? <FaEye className="ms-2" onClick={() => { setShowPassword(false) }} />
                    : <FaEyeSlash className="ms-2" onClick={() => { setShowPassword(true) }} />}
            </div>
            <div className="col-sm-9">
                <input type={showPassword === true ? "password" : "text"} name="accountPw" value={account.accountPw}
                    onChange={changeStrValue} className={`form-control ${accountClass.accountPw}`}
                    onBlur={checkAccountPw} />
                <div className="valid-feedback">적당한 비밀번호입니다.</div>
                <div className="invalid-feedback">부적절한 비밀번호입니다.(대소문자, 숫자, 특수문자 1글자 이상씩 8~16글자)</div>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3 col-form-label">
                비밀번호 확인 *
                {showPassword === true ? <FaEye className="ms-2" onClick={() => { setShowPassword(false) }} />
                    : <FaEyeSlash className="ms-2" onClick={() => { setShowPassword(true) }} />}
            </div>
            <div className="col-sm-9">
                <input type={showPassword === true ? "password" : "text"} name="accountPw2" value={account.accountPw2}
                    onChange={changeStrValue} className={`form-control ${accountClass.accountPw2}`}
                    onBlur={checkAccountPw} />
                <div className="valid-feedback">비밀번호가 일치합니다.</div>
                <div className="invalid-feedback">{setAccountPwFeedback}</div>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3 col-form-label">
                이메일 *
            </div>
            <div className="col-sm-9 d-flex flex-wrap text-nowrap">
                <input type="email" name="accountEmail" value={account.accountEmail}
                    onChange={changeStrValue} className="form-control w-auto flex-grow-1" />
                <button type="button" className="btn btn-primary ms-2" onClick={sendCertEmail}
                    disabled={sending === true}>
                    {sending === true ? <FaSpinner className="fa-spin custom-spinner" /> : <FaPaperPlane />}
                    <span className="ms-2 d-none d-sm-inline">
                        {sending === true ? "인증번호 발송 중" : "인증번호 발송"}
                    </span>
                </button>
                <div className="valid-feedback">이메일 인증이 완료되었습니다.</div>
                <div className="invalid-feedback">이메일 인증 오류가 발생했습니다.</div>
            </div>

            {sending === false && (
                <div className="col-sm-9 offset-sm-3 d-flex text-nowrap">
                    <input type="text" inputMode="numeric" className="form-control w-auto"
                        placeholder="인증번호 입력"></input>
                    <button type="button" className="btn btn-primary ms-2">
                        <FaKey />
                        <span className="ms-2 d-none d-sm-inline">인증번호 확인</span>
                    </button>
                    <div className="invalid-feedback">인증번호는 6자리 or 인증번호 불일치+</div>
                </div>
            )}

        </div>

        <div className="row mt-4">
            <div className="col-sm-3 col-form-label">
                닉네임 *
            </div>
            <div className="col-sm-9">
                <input type="email" name="accountNickname" value={account.accountNickname}
                    onChange={changeStrValue} onBlur={checkAccountNickname}
                    className={`form-control ${accountClass.accountNickname}`} />
                <div className="valid-feedback">적당한 닉네임입니다.</div>
                <div className="invalid-feedback">{accountNicknameFeedback}</div>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3 col-form-label">
                생년월일
            </div>
            <div className="col-sm-9">
                <input type="date" name="accountBirth" value={account.accountBirth}
                    onChange={changeStrValue} className="form-control" />
                <div className="invalid-feedback">부적절한 생일입니다.</div>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3 col-form-label">
                연락처
            </div>
            <div className="col-sm-9">
                <input type="tel" name="accountContact" value={account.accountContact}
                    onChange={changeStrValue} className="form-control" />
                <div className="invalid-feedback">010으로 시작하는 11자리 전화번호(- 없음)</div>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col">
                <button type="button" className="btn btn-primary btn-lg w-100">회원가입</button>
            </div>
        </div>
    </>)
}
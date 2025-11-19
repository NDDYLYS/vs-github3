import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Jumbotron from "../templates/Jumbotron";

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

    const changeStrValue = useCallback(e => {
        const { name, value } = e.target;
        setAccount(prev => ({ ...prev, [name]: value }));
    }, [account]);

    const checkAccountId = useCallback(() => {
        // 형식 > 중복 > 결과
        const regex = /^[a-z][a-z0-9]{4,19}$/;
        const valid = regex.test(account.accountId);
        if (valid) {

        } else {
            setAccountClass(prev => ({ ...prev, accountId: "is-invalid" }));
        }
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
                <div className="invalid-feedback">부적절한 아이디입니다.</div>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3 col-form-label">
                비밀번호 *
            </div>
            <div className="col-sm-9">
                <input type="password" name="accountPw" value={account.accountPw} onChange={changeStrValue} className="form-control" />
                <div className="valid-feedback">적당한 비밀번호입니다.</div>
                <div className="invalid-feedback">부적절한 비밀번호입니다.(대소문자, 숫자, 특수문자 1글자 이상씩 8~16글자)</div>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3 col-form-label">
                비밀번호 확인 *
            </div>
            <div className="col-sm-9">
                <input type="text" name="accountPw2" value={account.accountPw2} onChange={changeStrValue} className="form-control" />
                <div className="valid-feedback">비밀번호가 일치합니다.</div>
                <div className="invalid-feedback">비밀번호가 일치하지 않습니다.</div>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3 col-form-label">
                이메일 *
            </div>
            <div className="col-sm-9">
                <input type="email" name="accountEmail" value={account.accountEmail} onChange={changeStrValue} className="form-control" />
                <div className="valid-feedback">이메일 인증이 완료되었습니다.</div>
                <div className="invalid-feedback">이메일 인증 오류가 발생했습니다.</div>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3 col-form-label">
                닉네임 *
            </div>
            <div className="col-sm-9">
                <input type="email" name="accountNickname" value={account.accountNickname} onChange={changeStrValue} className="form-control" />
                <div className="valid-feedback">적당한 닉네임입니다.</div>
                <div className="invalid-feedback">부적절한 닉네임입니다.</div>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3 col-form-label">
                생년월일
            </div>
            <div className="col-sm-9">
                <input type="date" name="accountBirth" value={account.accountBirth} onChange={changeStrValue} className="form-control" />
                <div className="invalid-feedback">부적절한 생일입니다.</div>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-sm-3 col-form-label">
                연락처
            </div>
            <div className="col-sm-9">
                <input type="tel" name="accountContact" value={account.accountContact} onChange={changeStrValue} className="form-control" />
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
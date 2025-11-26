import { Link } from "react-router-dom";
import Jumbotron from "../templates/Jumbotron";
import { useCallback, useState } from "react";
import axios from "axios";

export default function AdminManager() {

    const [input, setInput] = useState({
        accountId: "",
        accountNickname: "",
        accountEmail: "",
        accountContact: "",
        accountBirth: "",
        minAccountPoint: "", maxAccountPoint: "",
        beginAccountJoin: "", endAccountJoin: "",
        accountAddress: "",
        accountLevelList: [],
    });

    const [accountList, setAccountList] = useState([]);

    const changeStrValue = useCallback(e => {
        const { name, value } = e.target;

        setInput(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const changeAccountLevelList = useCallback(e => {
        const value = e.target.value;

        if (input.accountLevelList.includes(value)) {
            setInput(prev => ({
                ...prev,
                accountLevelList: prev.accountLevelList.filter(level => level !== value)
            }));
        }
        else {
            setInput(prev => ({
                ...prev,
                accountLevelList: [...prev.accountLevelList, value]
            }));
        }
    }, [input]);

    const sendData = useCallback(async () => {
        const { data } = await axios.post("/account/search", input);
        setAccountList(data);
    }, [input]);

    //render
    return (

        <>

            <h1>AdminManager</h1>
            <hr />

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">아이디</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control"
                        onChange={changeStrValue} value={input.accountId} name="accountId" />
                </div>
            </div>
            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">닉네임</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control"
                        onChange={changeStrValue} value={input.accountNickname} name="accountNickname" />
                </div>
            </div>
            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">이메일</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control"
                        onChange={changeStrValue} value={input.accountEmail} name="accountEmail" />
                </div>
            </div>
            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">연락처</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control"
                        onChange={changeStrValue} value={input.accountContact} name="accountContact" />
                </div>
            </div>
            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">생일</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control"
                        onChange={changeStrValue} value={input.accountBirth} name="accountBirth" />
                </div>
            </div>
            <div className="row mt-4">
                <label className="col-sm-2 col-form-label">포인트</label>
                <div className="col-sm-5">
                    <input type="text" className="form-control"
                        onChange={changeStrValue} value={input.minAccountPoint} name="minAccountPoint" />
                </div>
                <div className="col-sm-5">
                    <input type="text" className="form-control"
                        onChange={changeStrValue} value={input.maxAccountPoint} name="maxAccountPoint" />
                </div>
            </div>
            <div className="row mt-4">
                <label className="col-sm-2 col-form-label">가입일</label>
                <div className="col-sm-5">
                    <input type="text" className="form-control"
                        onChange={changeStrValue} value={input.beginAccountJoin} name="beginAccountJoin" />
                </div>
                <div className="col-sm-5">
                    <input type="text" className="form-control"
                        onChange={changeStrValue} value={input.endAccountJoin} name="endAccountJoin" />
                </div>
            </div>
            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">주소</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control"
                        onChange={changeStrValue} value={input.accountBirth} name="accountBirth" />
                </div>
            </div>

            <div className="form-check">
                <label className="form-check-label">
                    <input className="form-check-input" type="checkbox" value="일반회원"
                        checked={input.accountLevelList.includes("일반회원")} onChange={changeAccountLevelList} />
                    <span>일반회원</span>
                </label>
            </div>
            <div className="form-check">
                <label className="form-check-label">
                    <input className="form-check-input" type="checkbox" value="우수회원"
                        checked={input.accountLevelList.includes("우수회원")} onChange={changeAccountLevelList} />
                    <span>우수회원</span>
                </label>
            </div>
            <div className="form-check">
                <label className="form-check-label">
                    <input className="form-check-input" type="checkbox" value="관리자"
                        checked={input.accountLevelList.includes("관리자")} onChange={changeAccountLevelList} />
                    <span>관리자</span>
                </label>
            </div>

            <div className="row mt-4">
                <div className="col text-end">
                    <button type="button" className="btn btn-success btn-lg" onClick={sendData}>
                        <span className="ms-2">검색</span>
                    </button>
                </div>
            </div>

            {accountList.map(account => (
                <div className="row mt-4" key={account.accountId}>
                    <div className="col">
                        <div className="shadow p-4 rounded">
                            <h2>{account.accountId} 님의 정보</h2>
                            <ul className="list-group list-group-flush mt-4">
                                <li className="list-group-item d-flex align-items-center"><span className="badge text-bg-primary me-4">닉네임</span> {account.accountNickname}</li>
                                <li className="list-group-item d-flex align-items-center"><span className="badge text-bg-primary me-4">이메일</span> {account.accountEmail}</li>
                                {account.accountContact !== null && (<li className="list-group-item d-flex align-items-center"><span className="badge text-bg-primary me-4">연락처</span> {account.accountContact}</li>)}
                                {account.accountBirth !== null && (<li className="list-group-item d-flex align-items-center"><span className="badge text-bg-primary me-4">생년월일</span> {account.accountBirth}</li>)}
                                <li className="list-group-item d-flex align-items-center"><span className="badge text-bg-primary me-4">포인트</span> {account.accountPoint} point</li>
                                {account.accountAddress1 !== null && (<li className="list-group-item d-flex align-items-center"><span className="badge text-bg-primary me-4">주소</span> {account.accountAddress1} {account.accountAddress2}</li>)}
                                <li className="list-group-item d-flex align-items-center"><span className="badge text-bg-primary me-4">가입일</span> {account.accountJoin}</li>
                                <li className="list-group-item d-flex align-items-center"><span className="badge text-bg-primary me-4">등급</span>{account.accountLevel}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ))}

        </>)
}
import { useCallback, useState } from "react";
import Jumbotron from "../templates/Jumbotron";
import { FaAsterisk, FaEye, FaEyeSlash, FaKey, FaMagnifyingGlass, FaPaperPlane, FaSpinner, FaUser, FaXmark } from "react-icons/fa6";
import axios from "axios";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import { format, subDays, addDays, subWeeks, addWeeks } from "date-fns";
// 언어 설정
import { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko); // 옵션으로 선택 가능
import { replace } from "lodash";
import { useDaumPostcodePopup } from "react-daum-postcode";

//회원 가입 화면
export default function AccountJoin() {

    //state
    const [account, setAccount] = useState({
        accountId: "", accountPw: "", accountNickname: "",
        accountEmail: "", accountBirth: "", accountContact: "",
        accountPost: "", accountAddress1: "", accountAddress2: "",
        accountPw2: ""
    });
    const [accountClass, setAccountClass] = useState({
        accountId: "", accountPw: "", accountNickname: "",
        accountEmail: "", accountBirth: "", accountContact: "",
        accountPost: "", accountAddress1: "", accountAddress2: "",
        accountPw2: ""
    });

    //아이디가 문제될 경우 출력할 피드백
    const [accountIdFeedback, setAccountIdFeedback] = useState("");

    //callback
    const changeStrValue = useCallback(e => {
        const { name, value } = e.target;

        //이메일 입력 발생 시 관련 상태를 초기화
        if (name === "accountEmail") {
            resetAccountEmail();
        }

        setAccount({ ...account, [name]: value });
        //setAccount(prev=>({...prev, [name]:value}));
    }, [account]);

    const changeDateValue = useCallback(date => {
        const replacement = format(date, "yyyy-MM-dd");
        setAccount(prev => ({ ...prev, accountBirth: replacement }));
    }, [account]);

    const checkAccountId = useCallback(async (e) => {
        //형식검사 → 아이디 중복검사 → 결과 설정
        const regex = /^[a-z][a-z0-9]{4,19}$/;
        //const valid = regex.test(e.target.value);
        const valid = regex.test(account.accountId);
        if (valid === true) {//형식 통과
            //const response = await axios.get(`/account/accountId/${account.accountId}`);
            const { data } = await axios.get(`/account/accountId/${account.accountId}`);
            if (data === true) {//사용 가능
                setAccountClass(prev => ({ ...prev, accountId: "is-valid" }));
            }
            else {//이미 사용중
                setAccountClass(prev => ({ ...prev, accountId: "is-invalid" }));
                setAccountIdFeedback("이미 사용중인 아이디입니다");
            }
        }
        else {//형식 오류
            setAccountClass(prev => ({ ...prev, accountId: "is-invalid" }));
            setAccountIdFeedback("아이디는 영문 소문자로 시작하며 숫자를 포함한 5-20자로 작성하세요");
        }
    }, [account, accountClass]);

    //비밀번호
    const [accountPwFeedback, setAccountPwFeedback] = useState("");
    const checkAccountPw = useCallback((e) => {
        const regex = /^(?=.*?[A-Z]+)(?=.*?[a-z]+)(?=.*?[0-9]+)(?=.*?[!@#$]+)[A-Za-z0-9!@#$]{8,16}$/;
        const valid = regex.test(account.accountPw);
        // if(valid === true) {//비밀번호 형식 일치
        //     setAccountClass(prev=>({...prev ,  accountPw : "is-valid" }));
        // }
        // else {//비밀번호 형식 불일치
        //     setAccountClass(prev=>({...prev ,  accountPw : "is-invalid" }));
        // }
        setAccountClass(prev => ({ ...prev, accountPw: valid ? "is-valid" : "is-invalid" }));

        if (account.accountPw.length === 0) {//비밀번호 미입력
            setAccountClass(prev => ({ ...prev, accountPw2: "is-invalid" }));
            setAccountPwFeedback("비밀번호를 먼저 입력하세요");
        }
        else {//비밀번호가 한 글자라도 입력된 경우
            const valid2 = account.accountPw === account.accountPw2;
            setAccountClass(prev => ({ ...prev, accountPw2: valid2 ? "is-valid" : "is-invalid" }));
            setAccountPwFeedback("비밀번호가 일치하지 않습니다");
        }
    }, [account, accountClass]);

    //닉네임이 문제가 될 경우의 피드백
    const [accountNicknameFeedback, setAccountNicknameFeedback] = useState("");

    const checkAccountNickname = useCallback(async (e) => {
        //형식검사 → 닉네임 중복검사 → 결과 설정
        const regex = /^[가-힣0-9]{2,10}$/;
        const valid = regex.test(account.accountNickname);//e.target.value
        if (valid === true) {//형식 일치
            const { data } = await axios.get(`/account/accountNickname/${account.accountNickname}`);
            if (data === true) {//사용 가능
                setAccountClass(prev => ({ ...prev, accountNickname: "is-valid" }));
            }
            else {//이미 사용중
                setAccountClass(prev => ({ ...prev, accountNickname: "is-invalid" }));
                setAccountNicknameFeedback("이미 사용중인 닉네임입니다");
            }
        }
        else {//형식 오류
            setAccountClass(prev => ({ ...prev, accountNickname: "is-invalid" }));
            setAccountNicknameFeedback("한글 또는 숫자 2~10글자로 작성하세요");
        }
    }, [account, accountClass]);

    //비밀번호 표시
    const [showPassword, setShowPassword] = useState(false);

    //이메일
    const [sending, setSending] = useState(null);//null(보낸적없음), true(발송중), false(발송완료)
    const [accountEmailFeedback, setAccountEmailFeedback] = useState("");
    const sendCertEmail = useCallback(async () => {//이메일 인증
        resetAccountEmail();//이메일 관련 상태를 모두 초기화

        // const regex = /^[a-z0-9]+@[a-z0-9.]+$/;
        // const valid = regex.test(account.accountEmail);
        // if (valid === false) {
        //     await Swal.fire({
        //         title: "이메일 형식이 부적합합니다.",
        //         text: "이메일 형식이 부적합합니다.",
        //         icon: "error",
        //         showCancelButton: false,//취소 버튼 추가(확인창으로 변경)
        //         confirmButtonColor: "#0984e3",
        //         confirmButtonText: "확인",
        //         allowOutsideClick: false,//외부 클릭 금지
        //     });
        // }

        //1. 서버에 이메일 전송을 요청(ajax)
        setSending(true);
        const response = await axios.post("/cert/send", { certEmail: account.accountEmail });
        setSending(false);
        //2. 이메일이 성공적으로 전송되면 인증번호 입력창을 표시하도록 상태를 변경
    }, [account]);

    //인증번호
    const [certNumber, setCertNumber] = useState("");
    const [certNumberClass, setCertNumberClass] = useState("");
    const [certNumberFeedback, setCertNumberFeedback] = useState("");
    const changeCertNumber = useCallback(e => {
        const replacement = e.target.value.replace(/[^0-9]+/g, "");//숫자가 아닌 항목을 제거한 뒤
        setCertNumber(replacement);//설정
    }, []);

    const sendCertCheck = useCallback(async (e) => {
        try {
            const { data } = await axios.post("/cert/check", {
                certEmail: account.accountEmail, certNumber: certNumber
            });
            //data 안에는 result(확인결과)와 message(상태메세지)가 있다
            if (data.result === true) {//인증이 성공했다면
                setCertNumberClass("is-valid");//성공 표시
                setAccountClass(prev => ({ ...prev, accountEmail: "is-valid" }));//이메일 검사 완료 표시
                setSending(null);//화면 숨김
            }
            else {//인증이 실패했다면
                setCertNumberClass("is-invalid");//실패 표시
                setCertNumberFeedback(data.message);
            }
        }
        catch (err) {
            setCertNumberClass("is-invalid");//실패 표시
            setCertNumberFeedback("인증번호 형식이 부적합합니다");
        }
    }, [account.accountEmail, certNumber]);

    //이메일 상태 초기화
    const resetAccountEmail = useCallback(() => {
        setAccountClass(prev => ({ ...prev, accountEmail: "" }));//입력창 클래스 초기화
        setCertNumber("");//인증번호 입력값 초기화
        setCertNumberClass("");//인증번호 입력창 클래스 초기화
        setCertNumberFeedback("");//인증번호 입력창 피드백 초기화
    }, []);

    const checkAccountEmail = useCallback(e => {
        const regex = /^[a-z0-9]+@[a-z0-9.]+$/;
        const valid = regex.test(account.accountEmail);
        if (valid === true) {//유효한 형식이라면
            if (certNumberClass !== "is-valid") {//인증되지 않은 상황이라면
                setAccountClass(prev => ({ ...prev, accountEmail: "is-invalid" }));
                setAccountEmailFeedback("이메일 인증이 필요합니다");
            }
        }
        else {//유효하지 않은 형식이라면
            setAccountClass(prev => ({ ...prev, accountEmail: "is-invalid" }));
            setAccountEmailFeedback("부적합한 이메일 형식입니다");
        }
    }, [account, accountClass, certNumber, certNumberClass]);

    const checkAccountContact = useCallback(e => {
        const regex = /^010[1-9][0-9]{7}$/;
        const valid = account.accountContact.length === 0 || regex.test(account.accountContact);
        setAccountClass(prev => ({ ...prev, accountContact: valid ? "is-valid" : "is-invalid" }));
    }, [account, accountClass]);

    // 주소 : react-daum-postcode를 사용한다
    const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
    const searchAddress = useCallback(() => {
        open({
            onComplete: (data) => {
                let addr = "";
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                setAccount(prev=>({
                    ...prev,
                    accountPost:data.zonecode,
                    accountAddress1:addr,
                    accountAddress2:"",
                }));
            }
        });
    }, []);

    //render
    return (<>
        <Jumbotron subject="회원 가입" detail="가입에 필요한 정보를 입력하세요"></Jumbotron>

        {/* 아이디 */}
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                아이디 <FaAsterisk className="text-danger" />
            </label>
            <div className="col-sm-9">
                <input type="text" className={`form-control ${accountClass.accountId}`}
                    name="accountId" value={account.accountId} onChange={changeStrValue}
                    onBlur={checkAccountId} />
                <div className="valid-feedback">사용 가능한 아이디입니다!</div>
                <div className="invalid-feedback">{accountIdFeedback}</div>
            </div>
        </div>

        {/* 비밀번호 */}
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                비밀번호
                <FaAsterisk className="text-danger" />
                {showPassword === true ? (
                    <FaEye className="ms-4" onClick={e => setShowPassword(false)} />
                ) : (
                    <FaEyeSlash className="ms-4" onClick={e => setShowPassword(true)} />
                )}
            </label>
            <div className="col-sm-9">
                <input type={showPassword === true ? "text" : "password"} className={`form-control ${accountClass.accountPw}`}
                    name="accountPw" value={account.accountPw} onChange={changeStrValue}
                    onBlur={checkAccountPw} />
                <div className="valid-feedback">사용 가능한 비밀번호 형식입니다</div>
                <div className="invalid-feedback">대문자,소문자,숫자,특수문자를 반드시 1개 포함하여 8~16자로 작성하세요</div>
            </div>
        </div>

        {/* 비밀번호 확인 */}
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                비밀번호 확인
                <FaAsterisk className="text-danger" />
                {showPassword === true ? (
                    <FaEye className="ms-4" onClick={e => setShowPassword(false)} />
                ) : (
                    <FaEyeSlash className="ms-4" onClick={e => setShowPassword(true)} />
                )}
            </label>
            <div className="col-sm-9">
                <input type={showPassword === true ? "text" : "password"} className={`form-control ${accountClass.accountPw2}`}
                    name="accountPw2" value={account.accountPw2} onChange={changeStrValue}
                    onBlur={checkAccountPw} />
                <div className="valid-feedback">비밀번호가 일치합니다</div>
                <div className="invalid-feedback">{accountPwFeedback}</div>
            </div>
        </div>

        {/* 닉네임 */}
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                닉네임 <FaAsterisk className="text-danger" />
            </label>
            <div className="col-sm-9">
                <input type="text" className={`form-control ${accountClass.accountNickname}`}
                    name="accountNickname" value={account.accountNickname}
                    onChange={changeStrValue} onBlur={checkAccountNickname} />
                <div className="valid-feedback">사용 가능한 닉네임입니다!</div>
                <div className="invalid-feedback">{accountNicknameFeedback}</div>
            </div>
        </div>

        {/* 이메일 */}
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                이메일 <FaAsterisk className="text-danger" />
            </label>
            <div className="col-sm-9 d-flex flex-wrap text-nowrap">
                <input type="text" inputMode="email"
                    className={`form-control w-auto flex-grow-1 ${accountClass.accountEmail}`}
                    name="accountEmail" value={account.accountEmail} onChange={changeStrValue}
                    onBlur={checkAccountEmail} />

                {/* sending의 여부에 따라 버튼의 상태를 변경 */}
                <button type="button" className="btn btn-primary ms-2" onClick={sendCertEmail}
                    disabled={sending === true}>
                    {sending === true ? <FaSpinner className="fa-spin custom-spinner" /> : <FaPaperPlane />}
                    <span className="ms-2 d-none d-sm-inline">
                        {sending === true ? "인증번호 발송중" : "인증번호 보내기"}
                    </span>
                </button>

                <div className="valid-feedback">이메일 인증이 완료되었습니다</div>
                <div className="invalid-feedback">{accountEmailFeedback}</div>
            </div>

            {/* 인증번호 입력 화면 */}
            {sending === false && (
                <div className="col-sm-9 offset-sm-3 d-flex flex-wrap text-nowrap mt-2">
                    <input type="text" inputMode="numeric"
                        className={`form-control w-auto ${certNumberClass}`}
                        placeholder="인증번호 입력"
                        value={certNumber} onChange={changeCertNumber} />
                    <button type="button" className="btn btn-success ms-2" onClick={sendCertCheck}>
                        <FaKey />
                        <span className="ms-2 d-none d-sm-inline">인증번호 확인</span>
                    </button>
                    <div className="invalid-feedback">{certNumberFeedback}</div>
                </div>
            )}

        </div>

        {/* 생년월일 */}
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                생년월일
            </label>
            <div className="col-sm-9">
                {/* <input type="text" className="form-control"
                    name="accountBirth" value={account.accountBirth} onChange={changeStrValue} /> */}
                <Datepicker name="accountBirth" className="form-control" selected={account.accountBirth}
                    onChange={changeDateValue} dateFormat={"yyyy-MM-dd"}
                    locale={"ko"} maxDate={new Date()}
                    monthsShown={1}
                //showYearDropdown 
                //showMonthDropdown
                />
                <div className="invalid-feedback">올바른 날짜 형식이 아닙니다</div>
            </div>
        </div>

        {/* 연락처 */}
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                연락처
            </label>
            <div className="col-sm-9">
                <input type="text" inputMode="tel" className={`form-control ${accountClass.accountContact}`}
                    name="accountContact" value={account.accountContact} onChange={changeStrValue}
                    onBlur={checkAccountContact} />
                <div className="invalid-feedback">010으로 시작하는 11자리 휴대전화번호를 입력하세요 (대시 사용 불가)</div>
            </div>
        </div>

        {/* 주소(우편번호, 기본주소, 상세주소) */}
        <div className="row mt-4">
            <label className="col-sm-3">주소</label>
            <div className="col-sm-9 d-flex align-items-center">
                <input type="text" name="accountPost" className="form-control w-auto"
                    placeholder="우편번호" value={account.accountPost} size={6}
                    onChange={changeStrValue} />
                <button type="button" className="btn btn-primary ms-2 w-auto" onClick={searchAddress}>
                    <FaMagnifyingGlass />
                    <span className="ms-2 d-none d-sm-inline">검색</span>
                </button>
                <button type="button" className="btn btn-danger ms-2 w-auto">
                    <FaXmark />
                    <span className="ms-2 d-none d-sm-inline">지우기</span>
                </button>
            </div>
            <div className="col-sm-9 offset-sm-3 mt-2">
                <input type="text" name="accountAddress2" className="form-control"
                    placeholder="기본주소" value={account.accountAddress1}
                    onChange={changeStrValue} />
            </div>
            <div className="col-sm-9 offset-sm-3 mt-2">
                <input type="text" name="accountAddress2" className="form-control"
                    placeholder="상세주소" value={account.accountAddress2}
                    onChange={changeStrValue} />
            </div>
        </div>

        {/* 가입버튼 */}
        <div className="row mt-5">
            <div className="col text-end">
                <button type="button" className="btn btn-lg btn-success">
                    <FaUser className="me-2" />
                    <span>회원 가입하기</span>
                </button>
            </div>
        </div>
    </>)
}
import { useCallback, useEffect, useRef, useState } from "react";
import Jumbotron from "../templates/Jumbotron";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { FaPaperPlane } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useAtom, useAtomValue } from "jotai";
import { accessTokenState, loginCompleteState, loginIdState, loginLevelState, loginState, refreshTokenState } from "../../utils/jotai";
import "./WebsocketBasicEx.css";

// npm i sockjs-client @stomp/stompjs 설치 필요 
export default function WebsocketMemberEx() {
    //jotai state
    const [loginId, setLoginId] = useAtom(loginIdState);//나의 아이디
    const [loginLevel, setLoginLevel] = useAtom(loginLevelState);//나의 등급
    const [accessToken, setAccessToken] = useAtom(accessTokenState);//나의 액세스 토큰
    const [refreshToken, setRefreshToken] = useAtom(refreshTokenState);//나의 리프레시 토큰
    const isLogin = useAtomValue(loginState);//현재 로그인 상태
    const loginComplete = useAtomValue(loginCompleteState);//로그인 완료 여부

    //state
    const [client, setClient] = useState(null); //서버와의 연결 정보
    const [input, setInput] = useState("");//사용자가 입력한 값
    const [history, setHistory] = useState([]);//메세지 기록

    //effect
    //- [1] 시작하자마자 서버와의 연결을 시도
    //- [2] 화면을 나가면 연결 종료
    useEffect(()=>{
        //로그인 처리가 완료되지 않았다면 연결을 하지 않도록 조건 설정
        console.log("loginComplete:"+loginComplete);
        if(loginComplete === false) return;

        //[1]
        const client = connectToServer();
        setClient(client);

        //[2]
        return ()=>{
            disconnectFromServer(client);
            setClient(null);
        };
    }, [loginComplete]);

    //callback
    const messageWrapper = useRef();



    //서버 연결 함수
    //[1] 연결(socket) 생성
    //[2] 연결을 토대로 제어도구인 client 생성
    // - 구독 등에 대한 설정을 미리 지정
    const connectToServer = useCallback(()=>{
        //[1]
        const socket = new SockJS("http://192.168.20.30:8080/ws");
        //[2] 
        const client = new Client({
            // socket 정보를 설정
            webSocketFactory: ()=>socket,
            // 연결되면 할 작업을 지정 (구독)
            onConnect: ()=>{
                client.subscribe("/public/member", (message)=>{
                    const json = JSON.parse(message.body);
                    setHistory(prev=>[...prev, json]);
                });

                //(+추가) 회원일 경우만 개인메세지 채널을 구독
                if(isLogin) {
                    client.subscribe(`/private/token/${loginId}`, (message)=>{
                        const json = JSON.parse(message.body);//해석
                        setAccessToken(json.accessToken);//accessToken 갱신
                        setRefreshToken(json.refreshToken);//refreshToken 갱신
                    });
                    client.subscribe(`/private/warning/${loginId}`, (message)=>{});
                }
            },
            // (옵션) 디버그 설정
            debug: (str)=>console.log(str),
            
        });

        //(+추가) client에 `회원인 경우`만 connectHeaders를 추가
        if(isLogin) {
            client.connectHeaders = {
                accessToken : `Bearer ${accessToken}`, 
                refreshToken : `Bearer ${refreshToken}`
            };
        }

        //클라이언트 활성화
        client.activate();

        return client;
    }, [isLogin, loginId, accessToken, refreshToken]);
    const disconnectFromServer = useCallback((client)=>{
        if(client) {//client가 긍정적인 값이라면(=있으면)
            client.deactivate();//클라이언트 비활성화
        }
    }, []);

    //메세지 전송
    const sendMessage = useCallback(()=>{
        if(client === null) return;//setClient()가 실행되어야 null이 아님
        if(client.connected === false) return;//연결중이어야 true가 되는 값
        if(client.active === false) return;//activate()를 실행해야 true가 되는 값
        if(input.trim().length === 0) return;//불필요한 공백 제거 후 값이 없으면 차단
        if(loginComplete === true && isLogin === false) return;//로그인 완료 + 비회원이면 차단

        //메세지 전송을 위한 데이터 생성
        const json = { content : input };

        //STOMP 규격에 맞는 메세지 생성
        const stompMessage = {
            destination: "/app/member",//목적지 (서버가 설정한 어딘가)
            headers:{
                accessToken : `Bearer ${accessToken}`, 
                refreshToken : `Bearer ${refreshToken}`
            },
            body: JSON.stringify(json),//전송할 내용(직렬화, JSON.stringify 함수)
        };

        //전송(publish)
        client.publish(stompMessage);
        setInput("");//입력창 지우기
    }, [client, input, isLogin, loginComplete, accessToken, refreshToken]);

    //시간 변경 함수 (모던 JS 표준 코드)
    const formatTime = useCallback((str)=>{
        //str은 yyyy-MM-dd'T'HH:mm:ss 형태 (ISO 표준)
        const d = new Date(str);//date로 변환

        // const fmt = new Intl.DateTimeFormat(언어, 옵션);
        const fmt = new Intl.DateTimeFormat('ko-KR', {
            hour: 'numeric',//시간 두자리
            minute: '2-digit',//분 두자리
            hour12:true,//12시간방식
        });

        return fmt.format(d);
    }, []);

    //특정 메세지의 시간이 출력되어야 하는지 판정하는 함수
    // - 언제 안나와요? : 다음 메세지가 같은 사용자가 보낸 경우 + 같은 시간인 경우
    const isTimeVisible = useCallback((cur, next)=>{
        if(!next) return true;//마지막 메세지면 시간 나와야돼!
        if(cur.loginId !== next.loginId) return true;//작성자가 다르면 나와야돼!
        if(formatTime(cur.time) !== formatTime(next.time)) return true;//시간이 다르면 나와야돼!
        return false;//아니면 나오지 않아야돼!
    }, []);

    //특정 메세지의 아이디와 등급이 출력되어야 하는지 판정하는 함수
    const isSenderVisible = useCallback((cur, prev)=>{
        if(!prev) return true;//첫 메세지면 무조건 출력!
        if(cur.loginId !== prev.loginId) return true;//작성자가 다르면 나와야돼!
        return false;//아니면 안나와도돼!
    }, []);

    //render
    return (<>
        <Jumbotron subject="회원 전용 채팅 예제" detail="비회원은 보기만, 회원은 채팅전송이 가능"/>

        {/* 현재 나의 상태 */}
        <div className="row mt-4">
            <div className="col fs-3">
                현재 상태 : {isLogin ? "회원" : "비회원"}
                {isLogin && (<>
                    (아이디 : {loginId} , 등급 : {loginLevel})
                </>)}
            </div>
        </div>

        {/* 입력창과 전송버튼 */}
        <div className="row mt-4">
            <div className="col d-flex align-items-center">
                <input type="text" className="form-control w-auto flex-grow-1"
                        placeholder="메세지 입력..."
                        value={input} onChange={e=>setInput(e.target.value)} 
                        onKeyUp={e=>{
                            if(e.key === "Enter") sendMessage();
                        }}/>
                <button type="button" className="btn btn-success ms-2" onClick={sendMessage}>
                    <FaPaperPlane className="me-2"/>
                    <span>전송하기</span>
                </button>
            </div>
        </div>

        {/* 메세지 히스토리 출력 */}
        <div className="row mt-4">
            <div className="col message-wrapper">
                {history.map((m,index)=>{//여기는 함수
                    if(m.type === "chat") {//일반 채팅일 경우 보여줄 화면
                        return (
                        <div className={`message-block ${loginId === m.loginId ? 'my' : ''}`} key={index} >
                            {/* 발신자 */}
                            {isSenderVisible(m, history[index-1]) === true && (
                            <h5 className="text-primary">{m.loginId} ({m.loginLevel})</h5>
                            )}

                            {/* 메세지 내용 */}
                            {m.content}

                            {/* 시간 추가 */}
                            {isTimeVisible(m, history[index+1]) === true && (
                            <div className="time">{formatTime(m.time)}</div>
                            )}
                        </div>    
                        );
                    }
                    if(m.type === "warning") {
                        return (
                        <div className="warning-block" key={index}>{m.content}</div>
                        );
                    }
                    //추가되는 화면들...
                })}   
            </div>
        </div>
    </>)
}
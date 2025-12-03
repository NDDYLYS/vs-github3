import { useAtom } from "jotai";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { accessTokenState, loginIdState, loginLevelState, refreshTokenState } from "../../utils/jotai";
import { useCallback, useEffect, useRef, useState } from "react";
import Jumbotron from "../templates/Jumbotron";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa6";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function CheatRoom() {
    //방번호를 수신해야 한다 (/websocket/group/7)
    const {roomNo} = useParams();

    const navigate = useNavigate();

    //통합 state
    const [loginId, setLoginId] = useAtom(loginIdState);
    const [loginLevel, setLoginLevel] = useAtom(loginLevelState);
    const [accessToken, setAccessToken] = useAtom(accessTokenState);//나의 액세스 토큰
    const [refreshToken, setRefreshToken] = useAtom(refreshTokenState);//나의 리프레시 토큰

    //state
    //입장 검사가 완료되었는지 체크(null - 진행중 / true - 참여자격있음 / false - 참여자격 없음)
    const [checkComplete, setCheckComplete] = useState(null);

    const [client, setClient] = useState(null); //서버와의 연결 정보
    const [input, setInput] = useState("");//사용자가 입력한 값
    const [history, setHistory] = useState([]);//메세지 기록

    //effect
    useEffect(()=>{
        checkParty();
    }, []);
    //- [1] 입장권한체크가 완료된 경우 서버와의 연결을 시도
    //- [2] 화면을 나가면 연결 종료
    useEffect(()=>{
        if(checkComplete === true) {//입장권한체크가 완료된 경우만 수행
            //웹소켓 관련된 처리 수행
            //[1]
            const client = connectToServer();
            setClient(client);
        }

        //[2]
        return ()=>{
            disconnectFromServer(client);
            setClient(null);
        };
    }, [checkComplete]);

    //callback
    //(중요) 이 방에 참여중인 사람인지 조회
    const checkParty = useCallback(async ()=>{
        const {data} = await axios.post("/room/check", {roomNo : roomNo});
        //data는 {result : true} 형태
        if(data.result === false) {//참여자가 아니라면
            //강제로 다른페이지로 이동
            //react 스럽지 못한 코드 (컴포넌트는 최초에 화면을 반환해야 된다)
            //이 코드를 쓰고 싶다면 화면이 완성된 이후에 작업을 해야한다(ex : 버튼 클릭 등)
            //navigate("/error/403");
            setCheckComplete(false);
        }
        else {//참여자라면
            setCheckComplete(true);
        }
    }, []);

    //연결 함수
    const connectToServer = useCallback(()=>{
        //[1]
        const socket = new SockJS("http://192.168.20.30:8080/ws");
        //[2] 
        const client = new Client({
            // socket 정보를 설정
            webSocketFactory: ()=>socket,

            // header 설정
            connectHeaders : {
                accessToken : `Bearer ${accessToken}`, 
                refreshToken : `Bearer ${refreshToken}`
            },

            // 연결되면 할 작업을 지정 (구독)
            onConnect: ()=>{
                //(1) 일반 메세지 수신 채널 구독
                client.subscribe(`/public/group/${roomNo}`, (message)=>{
                    const json = JSON.parse(message.body);
                    setHistory(prev=>[...prev, json]);
                });

                //(2) 개인메세지 채널을 구독 (token, warning, ...)
                client.subscribe(`/private/group/${roomNo}/token/${loginId}`, (message)=>{
                    const json = JSON.parse(message.body);//해석
                    setAccessToken(json.accessToken);//accessToken 갱신
                    setRefreshToken(json.refreshToken);//refreshToken 갱신
                });
                client.subscribe(`/private/group/${roomNo}/warning/${loginId}`, (message)=>{
                    const json = JSON.parse(message.body);
                    setHistory(prev=>[...prev, json]);
                });
            },
            // (옵션) 디버그 설정
            debug: (str)=>console.log(str),
        });

        //클라이언트 활성화
        client.activate();

        return client;
    }, [loginId, accessToken, refreshToken]);
    const disconnectFromServer = useCallback((client)=>{
        if(client) {//client가 긍정적인 값이라면(=있으면)
            client.deactivate();//클라이언트 비활성화
        }
    }, []);

    //메세지 전송
    const sendMessage = useCallback(()=>{
        //전송을 하면 안되는 상황부터 체크
        if(client === null) return;//setClient()가 실행되어야 null이 아님
        if(client.connected === false) return;//연결중이어야 true가 되는 값
        if(client.active === false) return;//activate()를 실행해야 true가 되는 값
        if(input.trim().length === 0) return;//불필요한 공백 제거 후 값이 없으면 차단

        //메세지 전송을 위한 데이터 생성
        const json = { content : input };

        //STOMP 규격에 맞는 메세지 생성
        const stompMessage = {
            destination: `/app/group/${roomNo}`,//목적지 (서버가 설정한 어딘가)
            headers:{
                accessToken : `Bearer ${accessToken}`, 
                refreshToken : `Bearer ${refreshToken}`
            },
            body: JSON.stringify(json),//전송할 내용(직렬화, JSON.stringify 함수)
        };

        //전송(publish)
        client.publish(stompMessage);
        //입력창 지우기
        setInput("");
    }, [client, input, accessToken, refreshToken]);

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

    //메세지 내역의 변화가 생길 때마다 스크롤의 위치를 상단으로 이동
    const messageWrapper = useRef();
    useEffect(()=>{
        if(messageWrapper.current) {//연결이 되어 있다면
            //css에 flex-direction이 column인 경우와 column-reverse인 경우가 반대로 작동
            //- column인 경우는 맨 위가 0이고 아래로 갈수록 scrollTop이 증가함
            //- column-reverse인 경우는 맨 아래가 0이고 위로 갈수록 scrollTop이 감소함
            //- 현재 상황은 column-reverse이다
            
            //messageWrapper.current.scrollTop = 0;//맨 아래로 고정(column-reverse)
            const {scrollHeight, clientHeight} = messageWrapper.current;
            const height = scrollHeight - clientHeight;
            messageWrapper.current.scrollTop = -height;//맨 위로 고정(column-reverse)
            //참고 : column이면 0이 맨 위 , 맨 아래는 height이다
        }
    }, [history]);

    //render
    if(checkComplete === null) {
        return <h2>검사중...</h2>
    }

    return checkComplete === true ? (<>
        <Jumbotron subject="채팅방제목" detail="?번 채팅방"/>

        {/* 현재 나의 상태 */}
        <div className="row mt-4">
            <div className="col fs-3">
                아이디 : {loginId} , 등급 : {loginLevel}
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
            <div className="col message-wrapper" ref={messageWrapper}>
                {history.map((m,index)=>{//여기는 함수
                    if(m.type === "chat") {//일반 채팅일 경우 보여줄 화면
                        return (
                        <div className={`message-block ${loginId === m.loginId ? 'my' : ''}`} key={index}>
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
    </>) : <Navigate to="/error/403"/>;
}
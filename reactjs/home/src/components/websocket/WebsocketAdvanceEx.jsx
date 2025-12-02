import { useState, useCallback, useEffect, use } from "react";
import Jumbotron from "../templates/Jumbotron";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import "./WebsocketBasicEx.css";
import { v4 as uuidv4 } from "uuid";

// npm i sockjs-client @stomp/stompjs 설치 필요 
export default function WebsocketAdvanceEx() {
    //state
    const [client, setClient] = useState(null); //서버와의 연결 정보
    const [input, setInput] = useState("");//사용자가 입력한 값
    const [history, setHistory] = useState([]);//메세지 기록
    const [uuid] = useState(uuidv4);//사용자 구분을 위해 임시로 만든 값 (나중에 accessToken으로 변경됨)

    //effect
    //- [1] 시작하자마자 서버와의 연결을 시도
    //- [2] 화면을 나가면 연결 종료
    useEffect(() => {
        //[1]
        const client = connectToServer();
        setClient(client);

        //[2]
        return () => {
            disconnectFromServer(client);
            setClient(null);
        };
    }, []);

    //callback

    //서버 연결 함수
    //[1] 연결(socket) 생성
    //[2] 연결을 토대로 제어도구인 client 생성
    // - 구독 등에 대한 설정을 미리 지정
    const connectToServer = useCallback(() => {
        //[1]
        const socket = new SockJS("http://192.168.20.30:8080/ws");
        //[2] 
        const client = new Client({
            // socket 정보를 설정
            webSocketFactory: () => socket,
            // (+추가) 이 사용자의 정보를 전달 (ex : accessToken, UUID, ...)
            connectHeaders: {
                uuid: uuid,//웹소켓 서버에 uuid라는 이름의 헤더로 uuid state값을 보내겠다
            },
            // 연결되면 할 작업을 지정 (구독)
            // client.subscribe(채널, 함수);
            onConnect: () => {
                //채널 /public/basic을 구독해서 오는 메세지에 대해 수행할 작업을 함수로 알려주겠다
                client.subscribe("/public/advance", (message) => {
                    //메세지 본문은 message.body에 존재하며 JSON 문자열 형태
                    //이를 역직렬화(Deserialize) 하여 객체로 되돌리는 작업이 필요 (JSON.parse 함수 사용)
                    const json = JSON.parse(message.body);
                    setHistory(prev => [...prev, json]);
                    // setHistory(prev=>prev.concat(json));
                    // toast(json.content);
                });
                //개인메세지를 수신할 수 있는 채널을 구독
                client.subscribe(`/private/advance/${uuid}`, (message) => {
                    const json = JSON.parse(message.body);
                    setHistory(prev => [...prev, json]);
                    //console.log("개인채널로 전송된 메세지");
                    //console.log(json);
                });
            },
            // (옵션) 디버그 설정
            debug: (str) => console.log(str),
        });

        //클라이언트 활성화
        client.activate();

        return client;
    }, []);
    const disconnectFromServer = useCallback((client) => {
        if (client) {//client가 긍정적인 값이라면(=있으면)
            client.deactivate();//클라이언트 비활성화
        }
    }, []);

    //메세지 전송
    const sendMessage = useCallback(() => {
        //전송을 하면 안되는 상황부터 체크
        if (client === null) return;//setClient()가 실행되어야 null이 아님
        if (client.connected === false) return;//연결중이어야 true가 되는 값
        if (client.active === false) return;//activate()를 실행해야 true가 되는 값
        if (input.trim().length === 0) return;//불필요한 공백 제거 후 값이 없으면 차단

        //메세지 전송을 위한 데이터 생성
        const json = { content: input };

        //STOMP 규격에 맞는 메세지 생성
        const stompMessage = {
            destination: "/app/advance",//목적지 (서버가 설정한 어딘가)
            headers: { uuid: uuid },//메세지 헤더
            body: JSON.stringify(json),//전송할 내용(직렬화, JSON.stringify 함수)
        };

        //전송(publish)
        client.publish(stompMessage);
        setInput("");//입력창 지우기
    }, [client, input]);

    //시간 변경 함수 (모던 JS 표준 코드)
    const formatTime = useCallback((str) => {
        //str은 yyyy-MM-dd'T'HH:mm:ss 형태 (ISO 표준)
        const d = new Date(str);//date로 변환

        // const fmt = new Intl.DateTimeFormat(언어, 옵션);
        const fmt = new Intl.DateTimeFormat('ko-KR', {
            hour: 'numeric',//시간 두자리
            minute: '2-digit',//분 두자리
            hour12: true,//12시간방식
        });

        return fmt.format(d);
    }, []);

    //render
    return (<>
        <Jumbotron subject="웹소켓 응용 예제" detail="서버가 사용자가 보낸 메세지를 변조하여 전송" />

        {/* UUID 출력(테스트용) */}
        <div className="row mt-4">
            <div className="col fs-3">사용자 고유번호 : {uuid}</div>
        </div>

        {/* 입력창과 전송버튼 */}
        <div className="row mt-4">
            <div className="col d-flex align-items-center">
                <input type="text" className="form-control w-auto flex-grow-1"
                    placeholder="메세지 입력..."
                    value={input} onChange={e => setInput(e.target.value)}
                    onKeyUp={e => {
                        if (e.key === "Enter") sendMessage();
                    }} />
                <button type="button" className="btn btn-success ms-2" onClick={sendMessage}>
                    <span>전송하기</span>
                </button>
            </div>
        </div>

        {/* 메세지 히스토리 출력 */}
        <div className="row mt-4">
            <div className="col message-wrapper">
                {history.map((m, index) => {//여기는 함수
                    if (m.type === "chat") {//일반 채팅일 경우 보여줄 화면
                        return (
                            <div className={`message-block ${uuid === m.sender ? "my" : ""}`} key={index}>
                                {/* 메세지 내용 */}
                                {m.content}

                                {/* 시간 추가 */}
                                <div className="time">{formatTime(m.time)}</div>
                            </div>
                        );
                    }
                    if (m.type === "warning") {
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
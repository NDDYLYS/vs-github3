import { useState, useCallback, useEffect, use } from "react";
import Jumbotron from "../templates/Jumbotron";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import "./WebsocketBasicEx.css";

// npm i sockjs-client @stomp/stompjs 설치 필요 
export default function WebsocketAdvanceEx() {

    const [client, setClient] = useState(null);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const client = conectToServer();
        setClient(client);

        return () => {
            disconnectFromServer(client);
            setClient(null);
        }
    }, []);


    // 연결 생성 > client 생성 > 구독 설정
    const conectToServer = useCallback(() => {
        //1
        const socket = new SockJS("http://localhost:8080/ws");
        //2
        const client = new Client({
            webSocketFactory: () => socket, // 소켓 정보 설정
            onConnect: () => { // 연결 성공 시
                client.subscribe("/public/advance", (message) => { // 구독 설정
                    const json = JSON.parse(message.body);
                    setHistory((prev) => [...prev, json]);
                });
            },
            debug: (str) => {
                console.log(str);
            }
        });

        client.activate();

        return client

    }, []);

    const disconnectFromServer = useCallback((client) => {
        if (client)
            client.deactivate();
    }, []);

    const sendMessage = useCallback(() => {
        if (client === null)
            return;
        if (client.connected === false)
            return;
        if (client.activate === false)
            return;

        if (input.trim().length === 0)
            return;
        const json = { content: input }

        const stompMessage = {
            destination: "/app/advance",
            body: JSON.stringify(json),
        };

        client.publish(stompMessage);
        setInput("");

    }, [client, input]);

    return (

        <>
            <Jumbotron subject="웹소켓 advance" detail="웹소켓을 이용한 채팅 테스트 페이지입니다." />

            <div className="row mt-4">
                <div className="col d-flex align-items-center">
                    <input text="text" className="form-control w-auto flex-grow-1"
                        value={input} onChange={e => setInput(e.target.value)}
                        onKeyUp={e => {
                            if (e.key === 'Enter') {
                                sendMessage();
                            }
                        }} />
                    <button className="btn btn-primary ms-2" onClick={sendMessage}>전송</button>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col message-wrapper">
                    {history.map((m, index) => (
                        <div className="message-block" key={index}>
                            {m.content}
                        </div> 
                    ))}
                </div>
            </div>

        </>

    )
}